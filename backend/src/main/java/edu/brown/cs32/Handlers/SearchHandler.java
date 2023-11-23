package edu.brown.cs32.Handlers;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import edu.brown.cs32.CSV.Searcher;
import java.util.List;

import edu.brown.cs32.Server.CSVDataWrapper;
import spark.Request;
import spark.Response;
import spark.Route;

public class SearchHandler implements Route {
    private final CSVDataWrapper wrappedData;

    public SearchHandler(CSVDataWrapper wrappedData) {
        this.wrappedData = wrappedData;
    }

    @Override
    public Object handle(Request request, Response response) {
        String value = request.queryParams("value");
        String column = request.queryParams("column");
        String userInput = "value = " + value + ", column = " + column;
        try {
            if (value == null || column == null) {
                return new SearchFailureResponse("Invalid input parameters. Please make " +
                        "sure you enter a value, and a column. If your data does not have headers, you may " +
                        "enter No_Headers for column", userInput).serialize();
            }

            List<List<String>> csvData = this.wrappedData.getData();

            if (csvData != null) {
                processCSVData(csvData);
                Searcher searcher = new Searcher(csvData);
                List<List<String>> searchResults = searcher.search(value, column);

                if (searchResults != null) {
                    // Return search results as an array of arrays
                    return new SearchSuccessResponse(searchResults, userInput).serialize();
                } else {
                    return new SearchFailureResponse("Search results are null", userInput).serialize();
                }
            } else {
                return new SearchFailureResponse("CSV data is not loaded", userInput).serialize();
            }
        }
        catch (Exception e) {
            return new SearchFailureResponse("Error occurred: " + e, userInput).serialize();
        }
    }

    private void processCSVData(List<List<String>> csvData) {
        for (List<String> row : csvData) {
            row.replaceAll(s -> {
                return s.replaceAll("\"", "");
            });
        }
    }

    public record SearchSuccessResponse(String response_type, List<List<String>> data, String userInput) {
        public SearchSuccessResponse(List<List<String>> data, String userInput) {
            this("success", data, userInput);
        }

        String serialize() {
            Moshi moshi = new Moshi.Builder().build();
            JsonAdapter<SearchSuccessResponse> adapter = moshi.adapter(SearchSuccessResponse.class);
            return adapter.toJson(this);
        }
    }

    public record SearchFailureResponse(String response_type, String message, String userInput) {
        public SearchFailureResponse(String message, String userInput) {
            this("error_bad_request", message, userInput);
        }

        String serialize() {
            Moshi moshi = new Moshi.Builder().build();
            JsonAdapter<SearchFailureResponse> adapter = moshi.adapter(SearchFailureResponse.class);
            return adapter.toJson(this);
        }
    }
}
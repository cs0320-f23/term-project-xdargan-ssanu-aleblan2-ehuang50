package edu.brown.cs32.Handlers;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import edu.brown.cs32.Server.CSVDataWrapper;
import spark.Request;
import spark.Response;
import spark.Route;

/**
 * The ViewHandler class implements a Spark Route for handling requests to view CSV data.
 * It retrieves CSV data from a LoadHandler and processes it, returning a JSON response.
 * In our local host, it will print out the JSON response of 2D array.
 */
public class ViewHandler implements Route {
    private final CSVDataWrapper wrappedData;

    /**
     * Constructs a new ViewHandler using the specified LoadHandler.
     *
     * @param wrappedData the data responsible for providing CSV data.
     */
    public ViewHandler(CSVDataWrapper wrappedData) {
        this.wrappedData = wrappedData;
        List<List<String>> parsedRows = new ArrayList<>();
        Collections.copy(parsedRows, wrappedData.getData());;
    }

    /**
     * Handles HTTP requests to view CSV data. Retrieves CSV data, processes it, and returns a JSON response.
     *
     * @param request  The Spark Request object representing the HTTP request.
     * @param response The Spark Response object representing the HTTP response.
     * @return A JSON response containing CSV data or an error message.
     */
    @Override
    public Object handle(Request request, Response response) {
        try {
            if (!this.wrappedData.getData().isEmpty()) {
                // Process the CSV data to remove double quotes from numeric values
                processCSVData(this.wrappedData.getData());
                return new ViewCSVResponse("success", this.wrappedData.getData()).serialize();
            } else {
                return new ViewCSVResponse("error_datasource", "CSV has not yet" +
                    " been loaded").serialize();
            }
        } catch (Exception e) {
            return new ViewCSVResponse("error_datasource", "An error occurred" +
            " while processing the request: " + e).serialize();
        }
    }

    /**
     * Processes CSV data to remove double quotes from numeric values.
     *
     * @param csvData The List of Lists representing the CSV data to be processed.
     */

    private void processCSVData(List<List<String>> csvData) {
        for (List<String> row : csvData) {
            row.replaceAll(s -> {
                // Remove double quotes if present and update the value in the list
                return s.replaceAll("\"", "");
            });
        }
    }


    /**
     * Represents a response object for JSON serialization.
     */
    public static class ViewCSVResponse {
        private final String response_type;
        private final Object data;

        /**
         * Constructs a ViewCSVResponse with the specified response type and data for success.
         *
         * @param response_type The type of response (in this case, "success").
         * @param data The data to include in the response.
         */

        public ViewCSVResponse(String response_type, Object data) {
            this.response_type = response_type;
            this.data = data;
        }

        /**
         * Serializes the ViewCSVResponse to a JSON string using Moshi.
         *
         * @return A JSON representation of the ViewCSVResponse.
         */
        public String serialize() {
            try {
                Moshi moshi = new Moshi.Builder().build();
                JsonAdapter<ViewCSVResponse> adapter = moshi.adapter(ViewCSVResponse.class);
                return adapter.toJson(this);
            } catch (Exception e) {
                return "{\"result\":\"error_bad_json\", \"message\":\"Error occurred during" +
                    " serialization\"}";
            }
        }
    }
}

package edu.brown.cs32.Handlers;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import edu.brown.cs32.CSV.CSVObject;
import edu.brown.cs32.CSV.Parser;
import edu.brown.cs32.Server.CSVDataWrapper;
import spark.Request;
import spark.Response;
import spark.Route;

import java.io.*;
import java.io.FileReader;
import java.util.List;

/**
 * The LoadHandler class implements a spark route to handles loading CSV data and provides JSON
 * responses for successful and failed loading attempts.
 */
public class LoadHandler implements Route {
    /**
     * The file path for the CSV file to be loaded.
     */
    public String filePath;
    /**
     * A flag indicating whether the CSV data has been loaded successfully yet.
     */
    public Boolean isLoaded = false;
    private final CSVDataWrapper data;

    /**
     * Initializes data instance variable, the shared state between load, view, and search endpoints
     * @param data a CSVDataWrapper instance representing a shared state between endpoints
     */
    public LoadHandler(CSVDataWrapper data){
        this.data = data;
    }

    /**
     * Handles an HTTP request to load a CSV file.
     *
     * @param request  The HTTP request.
     * @param response The HTTP response.
     * @return A JSON response indicating success or failure of CSV loading.
     */
    @Override
    public Object handle(Request request, Response response) {
        String filePathParam = request.queryParams("filepath");
        this.filePath = filePathParam;
        System.out.println(filePathParam);
        try {
            this.data.setData(new Parser<>(new FileReader(filePathParam), new CSVObject()).parse());
            System.out.println("this is done parsing");
            return new LoadSuccessResponse(this.filePath).serialize();
        } catch (Exception e) {
            // Handle any exceptions that occur during CSV loading
            response.status(500); // Internal Server Error
            this.isLoaded = false;
            return new LoadFailureResponse(this.filePath).serialize();
        }
    }

    /**
     * A record representing a successful CSV loading response.
     */
    public record LoadSuccessResponse(String response_type, String filePath) {
        public LoadSuccessResponse(String filePath) {
            this("success", filePath);
        }
        /**
         * Serializes the response as JSON.
         *
         * @return The JSON representation of the response.
         */
        String serialize() {
            Moshi moshi = new Moshi.Builder().build();
            JsonAdapter<LoadHandler.LoadSuccessResponse> adapter =
                    moshi.adapter(LoadHandler.LoadSuccessResponse.class);
            return adapter.toJson(this);
        }
    }

    /**
     * A record representing a failed CSV loading response.
     */
    public record LoadFailureResponse(String response_type, String filePath) {
        public LoadFailureResponse(String filePath) {
            this(
                    "error: unable to locate datasource", filePath);
        }
        /**
         * Serializes the response as JSON.
         *
         * @return The JSON representation of the response.
         */
        String serialize() {
            Moshi moshi = new Moshi.Builder().build();
            return moshi.adapter(LoadHandler.LoadFailureResponse.class).toJson(this);
        }
    }
}

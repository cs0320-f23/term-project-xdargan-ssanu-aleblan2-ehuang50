package edu.brown.cs32.Server;

import static spark.Spark.after;

import edu.brown.cs32.API.CensusAPISource;
import edu.brown.cs32.API.CensusDatasource;
import edu.brown.cs32.Handlers.*;
import edu.brown.cs32.Server.CSVDataWrapper;
import spark.Spark;

import java.util.ArrayList;
import java.util.List;

public class Server {
    static final int port = 3232;

    public Server() {
        // Create an empty list for your shared CSV data state
        List<List<String>> data = new ArrayList<>();
        CSVDataWrapper wrappedData = new CSVDataWrapper(data); // shared CSV data state between view, load, and search
        // Set up the SparkJava server
        Spark.port(port);

        // Enable CORS for your server
        after((request, response) -> {
            response.header("Access-Control-Allow-Origin", "*");
            response.header("Access-Control-Allow-Methods", "*");
        });

        System.out.println("Server started at http://localhost:" + port + "/initialized");

        // Define your routes and associate them with handlers
        Spark.get("geoparser", new GeoHandler());
        Spark.get("geosearch", new GeoSearchHandler());
        Spark.get("loadcsv", new LoadHandler(wrappedData));
        Spark.get("viewcsv", new ViewHandler(wrappedData));
        Spark.get("searchcsv", new SearchHandler(wrappedData));
        Spark.get("broadband", new BroadbandHandler(new CensusAPISource()));
        Spark.get("initialized", new InitializedHandler());

        // Initialize and await server startup
        Spark.init();
        Spark.awaitInitialization();
    }
    public static void main(String[] args) {
        new Server();
    }
}

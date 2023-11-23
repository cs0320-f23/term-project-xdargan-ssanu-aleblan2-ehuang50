package edu.brown.cs32;
import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import edu.brown.cs32.API.CensusAPISource;
import edu.brown.cs32.Server.CSVDataWrapper;
import edu.brown.cs32.Handlers.*;
import edu.brown.cs32.Server.FeaturesRecord;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeSuite;
import spark.Spark;
import spark.utils.IOUtils;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import static spark.Spark.*;
import edu.brown.cs32.Handlers.BroadbandHandler;
import org.junit.jupiter.api.Test;

public class GeoSearchHandlerTest {
    int fullSize = 17686144;
    public JsonAdapter<FeaturesRecord> adapter;
    String filePath = "/Users/sohum/Desktop/CS320/maps-aleblan2-ssanu/frontend/src/geodata/fullDownload.json";
    @BeforeSuite
    public void setup() throws IOException {
        Spark.port(3232);
        List<List<String>> data = new ArrayList<>();
        CSVDataWrapper wrappedData = new CSVDataWrapper(data); // shared CSV data state between view, load, and search
        // Set up the SparkJava server
        // Eliminate logger spam in console for test suite
        Logger.getLogger("").setLevel(Level.WARNING); // empty name = root
        Spark.get("geoparser", new GeoHandler());
        Spark.get("geosearch", new GeoSearchHandler());        Spark.init();
        Spark.awaitInitialization();
        Moshi moshi = new Moshi.Builder().build();
        this.adapter = moshi.adapter(FeaturesRecord.class);
    }
    @AfterTest
    public void tearDown() {
        // Gracefully stop Spark listening on both endpoints
        Spark.unmap("/geosearch");
        Spark.awaitStop(); // don't proceed until the server is stopped
    }

    /**
     * Helper to start a connection to a specific API endpoint/params
     *
     * @param apiCall the call string, including endpoint
     * @return the connection for the given URL, just after connecting
     * @throws IOException if the connection fails for some reason
     */
    private static HttpURLConnection tryRequest(String apiCall) throws IOException {
        // Configure the connection (but don't actually send a request yet)
        URL requestURL = new URL("http://localhost:3232" + "/" + apiCall);
        HttpURLConnection clientConnection = (HttpURLConnection) requestURL.openConnection();
        // The request body contains a Json object
        clientConnection.setRequestProperty("Content-Type", "application/json");
        // We're expecting a Json object in the response body
        clientConnection.setRequestProperty("Accept", "application/json");
        clientConnection.connect();
        return clientConnection;
    }

    /**
     * This tests if our request is successful under a normal case.
     *
     */
    @Test
    public void testGeoSearchRequestSuccess() throws IOException {
        HttpURLConnection loadConnection = tryRequest("geosearch?searchparam=bad");
        // Get an OK response (the *connection* worked, the *API* provides an error response)
        assert(loadConnection.getResponseCode() == 200);
        loadConnection.disconnect();
    }

    /**
     * This test method checks if all elements of the response map are returned as expected
     *
     */
    @Test
    public void testValidResponse() throws IOException {

        HttpURLConnection connection = tryRequest("geosearch?searchparam=Puget");
        String body = IOUtils.toString(connection.getInputStream());
        assert(body.contains("Puget"));
        assert(body.contains("Home"));
        assert(body.length() < this.fullSize);

        HttpURLConnection connection2 = tryRequest("geosearch?searchparam=good");
        String body2 = IOUtils.toString(connection.getInputStream());
        assert(body2.contains("good"));
        assert(body2.length() < this.fullSize);
    }

    @Test
    public void testValidEmptyResponse() throws IOException {

        HttpURLConnection connection = tryRequest("geosearch?target=noooooooooodata");
        String body = IOUtils.toString(connection.getInputStream());
        assert(body.contains("features"));
        assert(!body.contains("city"));
        assert(body.length() < this.fullSize);
    }

    /** This method tests when the expected query parameters are not given */
    @Test
    public void testInvalidRequest() throws IOException {
        // testing when the target parameter is null
        HttpURLConnection connection = tryRequest("geosearch");
        String body = IOUtils.toString(connection.getInputStream());
        assert(body.contains("Error: must provide target search term for area descriptions"));

    }

}

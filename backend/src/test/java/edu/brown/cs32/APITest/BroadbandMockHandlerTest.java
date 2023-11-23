package edu.brown.cs32.APITest;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;
import edu.brown.cs32.API.CensusDatasource;
import edu.brown.cs32.API.MockedCensusAPI;
import edu.brown.cs32.Handlers.BroadbandHandler;
import edu.brown.cs32.Records.CensusData;
import okio.Buffer;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import spark.Spark;

import java.io.IOException;
import java.lang.reflect.Type;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

import static org.junit.jupiter.api.Assertions.assertEquals;

/**
 * This class contains JUnit tests for the `BroadbandHandler` class, which handles API requests related to broadband data.
 * It uses a mocked data source to simulate API responses for testing purposes.
 */
public class BroadbandMockHandlerTest {
    private final List<String> censusData;

    /**
     * This constructor creates a NAME, percentage and adds it to the list to be compared to the actual
     * call to the API given Illinois and Cook_County as an input (though anything can be entered).
     */
    private BroadbandMockHandlerTest() {
        this.censusData = new ArrayList<>();
        this.censusData.add("Cook_County,Illinois");
        this.censusData.add("72.3");
    }

    @BeforeAll
    public static void setupOnce() {
        // Pick an arbitrary free port
        Spark.port(3232);
        // Eliminate logger spam in console for test suite
        Logger.getLogger("").setLevel(Level.WARNING);
    }

    private final Type mapStringObject = Types.newParameterizedType(Map.class, String.class, Object.class);
    private JsonAdapter<Map<String, Object>> adapter;
    private JsonAdapter<CensusData> censusDataAdapter;

    @BeforeEach
    public void setup() {
        // Re-initialize parser, state, etc. for every test method

        CensusDatasource mockedSource = new MockedCensusAPI(new CensusData(censusData));
        Spark.get("/broadband", new BroadbandHandler(mockedSource));
        Spark.awaitInitialization();

        // New Moshi adapter for responses (and requests, too; see a few lines below)
        Moshi moshi = new Moshi.Builder().build();
        this.adapter = moshi.adapter(this.mapStringObject);
        this.censusDataAdapter = moshi.adapter(CensusData.class);
    }

    @AfterEach
    public void tearDown() {
        // Gracefully stop Spark listening on both endpoints
        Spark.unmap("/broadband");
        Spark.awaitStop();
    }

    /**
     * Helper to start a connection to a specific API endpoint/params
     *
     * @param apiCall the call string, including endpoint
     *                (Note: this would be better if it had more structure!)
     * @return the connection for the given URL, just after connecting
     * @throws IOException if the connection fails for some reason
     */
    private HttpURLConnection tryRequest(String apiCall) throws IOException {
        // Configure the connection (but don't actually send a request yet)
        URL requestURL = new URL("http://localhost:" + Spark.port() + "/" + apiCall);
        HttpURLConnection clientConnection = (HttpURLConnection) requestURL.openConnection();
        // The request body contains a Json object
        clientConnection.setRequestProperty("Content-Type", "application/json");
        // We're expecting a Json object in the response body
        clientConnection.setRequestProperty("Accept", "application/json");

        clientConnection.connect();
        return clientConnection;
    }

    @Test
    public void testWeatherRequestSuccess() throws IOException {
        // Loads datasource
        // Set up the request, make the request
        HttpURLConnection loadConnection = tryRequest("broadband?state=Illinois&county=Cook_County");
        // Get an OK response
        assertEquals(200, loadConnection.getResponseCode());
        // Get the expected response: a success
        Map<String, Object> body = this.adapter.fromJson(new Buffer().readFrom(loadConnection.getInputStream()));
        showDetailsIfError(body);
        assertEquals("success", body.get("type"));

        // We know what the response is because we mocked
        assertEquals(
                this.censusDataAdapter.toJson(new CensusData(this.censusData)),
                body.get("Server Response:"));
        loadConnection.disconnect();
    }

    private void showDetailsIfError(Map<String, Object> body) {
        if (body.containsKey("type") && "error".equals(body.get("type"))) {
            System.out.println(body);
        }
    }
}
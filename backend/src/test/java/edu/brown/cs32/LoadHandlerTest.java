//package edu.brown.cs32;
//
//import com.squareup.moshi.JsonAdapter;
//import com.squareup.moshi.Moshi;
//import com.squareup.moshi.Types;
//import edu.brown.cs32.Handlers.LoadHandler;
//import java.net.HttpURLConnection;
//import java.net.URL;
//import java.util.Map;
//import org.junit.jupiter.api.AfterEach;
//import org.junit.jupiter.api.Assertions;
//import org.junit.jupiter.api.BeforeAll;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import spark.Spark;
//import java.util.logging.Level;
//import java.lang.reflect.Type;
//import java.util.logging.Logger;
//import java.io.IOException;
//
//import spark.utils.IOUtils;
//
//
//public class LoadHandlerTest {
//    private static final int PORT = 3232;
//
//    @BeforeAll
//    public static void setupOnce() {
//        Spark.port(PORT);
//        Logger.getLogger("'").setLevel(Level.WARNING);
//    }
//
//    private final Type mapStringObject =
//        Types.newParameterizedType(Map.class, String.class, Object.class);
//    private JsonAdapter<Map<String, Object>> adapter;
//
//    @BeforeEach
//    public void setUp() {
//        Spark.get("loadcsv", new LoadHandler());
//        Spark.awaitInitialization();
//
//        Moshi moshi = new Moshi.Builder().build();
//        adapter = moshi.adapter(mapStringObject);
//    }
//
//    @AfterEach
//    public void tearDown() {
//        Spark.unmap("loadcsv");
//        Spark.awaitStop();
//    }
//
//    @Test
//    public void testLoadCSVSuccess() throws IOException {
//        // Replace with your test CSV file path
//        String testFilePath = "path/to/your/test.csv";
//
//        // Send an HTTP GET request to your Spark application
//        HttpURLConnection connection = sendGetRequest("/loadcsv?filepath=" + testFilePath);
//
//        // Check the HTTP response code
//        Assertions.assertEquals(200, connection.getResponseCode());
//
//        // Read the response as JSON
//        String jsonResponse = IOUtils.toString(connection.getInputStream());
//
//        // Parse the JSON response
//        Map<String, Object> responseMap = adapter.fromJson(jsonResponse);
//
//        // Add your assertions for successful CSV loading here
//        Assertions.assertNotNull(responseMap);
//        Assertions.assertEquals("success", responseMap.get("response_type"));
//        Assertions.assertEquals(testFilePath, responseMap.get("filePath"));
//    }
//
//    @Test
//    public void testLoadCSVFailure() throws IOException {
//        // Replace with a non-existent file path to simulate a failure
//        String invalidFilePath = "invalid/file/path.csv";
//
//        // Send an HTTP GET request to your Spark application
//        HttpURLConnection connection = sendGetRequest("/loadcsv?filepath=" + invalidFilePath);
//
//        // Check the HTTP response code
//        Assertions.assertEquals(500, connection.getResponseCode());
//
//        // Read the response as JSON
//        String jsonResponse = IOUtils.toString(connection.getErrorStream());
//
//        // Parse the JSON error response
//        Map<String, Object> responseMap = adapter.fromJson(jsonResponse);
//
//        // Add your assertions for failed CSV loading here
//        Assertions.assertNotNull(responseMap);
//        Assertions.assertEquals("error: unable to locate datasource", responseMap.get("response_type"));
//        Assertions.assertEquals(invalidFilePath, responseMap.get("filePath"));
//    }
//
//    // Helper method to send an HTTP GET request
//    private HttpURLConnection sendGetRequest(String endpoint) throws IOException {
//        URL url = new URL("http://localhost:" + PORT + endpoint);
//        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
//        connection.setRequestMethod("GET");
//        connection.connect();
//        return connection;
//    }
//}
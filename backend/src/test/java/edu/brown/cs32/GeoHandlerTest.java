package edu.brown.cs32;
import edu.brown.cs32.API.CensusAPISource;
import edu.brown.cs32.Server.CSVDataWrapper;
import edu.brown.cs32.Handlers.*;
import spark.Spark;
import spark.utils.IOUtils;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import static spark.Spark.*;
import edu.brown.cs32.Handlers.BroadbandHandler;
import org.junit.jupiter.api.Test;

public class GeoHandlerTest {
    public class TestMapsHandler {
        private final int fullSize = 17686144;
        String filePath = "/Users/sohum/Desktop/CS320/maps-aleblan2-ssanu/frontend/src/geodata/fullDownload.json";

        /**
         * Set up the Spark server and initialize necessary components before running tests.
         */
//        @BeforeTest
        public void setUp() {
            int port = 3232;
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
        }

        /**
         * Test for the presence of "features" and "coordinates" in the full data response.
         */
        @Test
        public void testFullData() throws Exception {
            assertResponseBodyContains("http://localhost:3232/geoparser?minLong=all&maxLong=all&minLat=all&maxLat=all", "features", "coordinates");
        }

        /**
         * Test for the presence of "features" and "coordinates" in a specific coordinate range response.
         * Also, check if the response size is less than the full size.
         */
        @Test
        public void testCoordinates() throws Exception {
            assertResponseBodyContains("http://localhost:3232/geoparser?minlat=-80&minlong=39&maxlat=-88&&maxlong=2", "features", "coordinates");
            assertResponseBodySizeLessThan("http://localhost:3232/geoparser?minlat=-80&minlong=39&maxlat=-88&&maxlong=2", this.fullSize);
        }

        /**
         * Test for the presence of "features" and "FeatureCollection" in a response with random coordinates.
         * Also, check if the response size is less than or equal to the full size.
         */
        @Test
        public void testRandomCoordinates() throws Exception {
            double[] randVals = new double[4];
            for (int i = 0; i < randVals.length; i++) {
                randVals[i] = Math.random() * 200;
            }
            String urlString = String.format("http://localhost:3232/geoparser?minlat=%f&minlong=%f&maxlat=%f&maxlong=%f",
                    randVals[0], randVals[1], randVals[2], randVals[3]);
            assertResponseBodyContains(urlString, "features", "FeatureCollection");
            assertResponseBodySizeLessThanOrEqualTo(urlString, this.fullSize);
        }

        /**
         * Check if the response body contains the specified substrings.
         *
         * @param url        The URL to make the HTTP request.
         * @param substrings The substrings to check for in the response body.
         * @throws Exception If an error occurs during the HTTP request.
         */
        private void assertResponseBodyContains(String url, String... substrings) throws Exception {
            String body = getResponseBody(url);
            for (String substring : substrings) {
                assert(body.contains(substring));
            }
        }

        /**
         * Check if the response body size is less than the specified size.
         *
         * @param url  The URL to make the HTTP request.
         * @param size The size to compare the response body length against.
         * @throws Exception If an error occurs during the HTTP request.
         */
        private void assertResponseBodySizeLessThan(String url, int size) throws Exception {
            String body = getResponseBody(url);
            assert(body.length() < size);
        }

        /**
         * Check if the response body size is less than or equal to the specified size.
         *
         * @param url  The URL to make the HTTP request.
         * @param size The size to compare the response body length against.
         * @throws Exception If an error occurs during the HTTP request.
         */
        private void assertResponseBodySizeLessThanOrEqualTo(String url, int size) throws Exception {
            String body = getResponseBody(url);
            assert(body.length() <= size);
        }

        /**
         * Make an HTTP request and return the response body as a string.
         *
         * @param url The URL to make the HTTP request.
         * @return The response body as a string.
         * @throws Exception If an error occurs during the HTTP request.
         */
        private String getResponseBody(String url) throws Exception {
            URL apiUrl = new URL(url);
            HttpURLConnection connection = (HttpURLConnection) apiUrl.openConnection();
            connection.setRequestMethod("GET");
            return IOUtils.toString(connection.getInputStream());
        }
    }

}

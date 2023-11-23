package edu.brown.cs32.Handlers;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;
import edu.brown.cs32.API.CensusDatasource;
import edu.brown.cs32.DatasourceException;
import edu.brown.cs32.Records.CensusData;
import edu.brown.cs32.Records.CountyState;
import spark.Request;
import spark.Response;
import spark.Route;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Map;

/**
 * This class handles HTTP requests related to broadband data using a CensusDatasource.
 * It implements the Spark `Route` interface to define how incoming HTTP requests are processed.
 */
public class BroadbandHandler implements Route {
    private final CensusDatasource census;

    /**
     * Constructs a `BroadbandHandler` with a CensusDatasource.
     *
     * @param census The CensusDatasource used to retrieve broadband data.
     */
    public BroadbandHandler(CensusDatasource census) {
        this.census = census;
    }

    /**
     * Handle an HTTP request to retrieve broadband data for a specific location.
     *
     * @param request  The HTTP request object.
     * @param response The HTTP response object.
     * @return The response to be sent back to the client.
     */
    @Override
    public Object handle(Request request, Response response) {
        // Get the location that the request is for
        String state = request.queryParams("state");
        String county = request.queryParams("county");

        // Prepare to send a reply
        Moshi moshi = new Moshi.Builder().build();
        Type mapStringObject = Types.newParameterizedType(Map.class, String.class, Object.class);
        JsonAdapter<Map<String, Object>> adapter = moshi.adapter(mapStringObject);
        JsonAdapter<CensusData> censusDataAdapter = moshi.adapter(CensusData.class);
        Map<String, Object> responseMap = new HashMap<>();

        // Generate the reply
        try {
            CountyState countyState = new CountyState(state, county);
            CensusData data = this.census.getCensusData(countyState);
            responseMap.put("Server Response: ", censusDataAdapter.toJson(data));
            responseMap.put("Date: ", java.time.LocalDate.now().toString());
            responseMap.put("Time: ", java.time.LocalTime.now().toString());
            return adapter.toJson(responseMap);

        } catch (DatasourceException e) {
            responseMap.put("Type", "Error");
            responseMap.put("Error Type", "Datasource");
            responseMap.put("Details", e.getMessage());
            return adapter.toJson(responseMap);
        }
    }
}
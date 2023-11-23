package edu.brown.cs32.API;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;
import edu.brown.cs32.DatasourceException;
import edu.brown.cs32.Records.CensusData;
import edu.brown.cs32.Records.CountyState;
import okio.Buffer;

import java.io.IOException;
import java.lang.reflect.Type;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.List;

/**
 * This class provides an implementation of the CensusDatasource interface by interacting
 * with the Census API to retrieve Census data.
 */
public class CensusAPISource implements CensusDatasource {
    private String stateCode;
    private String countyCode;

    /**
     * Resolve the state and county to their corresponding codes using the Census API.
     *
     * @param state  The state for which to find the code.
     * @param county The county for which to find the code.
     * @throws DatasourceException If an error occurs during the resolution.
     */
    public void resolveStateCounty(String state, String county) throws DatasourceException {
        assert(state.length() < 14);
        assert(county.length() < 15);
        try {
            URL requestURL = new URL("https://api.census.gov/data/2010/dec/sf1?get=NAME&for=county:*");
            HttpURLConnection clientConnection = connect(requestURL);
            Moshi moshi = new Moshi.Builder().build();
            Type type = Types.newParameterizedType(List.class, List.class, String.class);
            JsonAdapter<List<List<String>>> adapter = moshi.adapter(type);

            List<List<String>> stateCodes = adapter.fromJson(new Buffer().readFrom(clientConnection.getInputStream()));

            if (stateCodes == null) throw new DatasourceException("Malformed response from Census");

            this.stateCode = "";
            this.countyCode = "";
            
            for (List<String> data: stateCodes) {
                if (data.get(0).toLowerCase().contains(state.toLowerCase()) &&
                        data.get(0).toLowerCase().contains(county.toLowerCase())) {
                    this.stateCode = data.get(1);
                    this.countyCode = data.get(2);
                }
            }
            if (this.stateCode.isEmpty() || this.countyCode.isEmpty()) {
                throw new DatasourceException("Invalid state or county given input: " + state);
            }
            clientConnection.disconnect();
        } catch (IOException e) {
            throw new DatasourceException(e.getMessage());
        }
    }

    /**
     * Connect to a URL and return an HTTP connection.
     *
     * @param requestURL The URL to connect to.
     * @return The HTTP connection.
     * @throws DatasourceException If an error occurs during the connection.
     * @throws IOException        If an I/O error occurs.
     */
    private static HttpURLConnection connect(URL requestURL) throws DatasourceException, IOException {
        URLConnection urlConnection = requestURL.openConnection();
        if (!(urlConnection instanceof HttpURLConnection))
            throw new DatasourceException("unexpected: result of connection wasn't HTTP");
        HttpURLConnection clientConnection = (HttpURLConnection) urlConnection;
        clientConnection.connect(); // GET
        if (clientConnection.getResponseCode() != 200)
            throw new DatasourceException("unexpected: API connection not success status " + clientConnection.getResponseMessage());
        return clientConnection;
    }

    /**
     * Get Census data for a given CountyState.
     *
     * @param countyState The CountyState for which Census data is requested.
     * @return The Census data for the specified CountyState.
     * @throws DatasourceException If an error occurs during data retrieval.
     */
    @Override
    public CensusData getCensusData(CountyState countyState) throws DatasourceException {
        return getPercentage(countyState.state(), countyState.county());
    }

    /**
     * Get Census data percentage for a specific state and county.
     *
     * @param state  The state for which to retrieve data.
     * @param county The county for which to retrieve data.
     * @return The Census data percentage for the specified state and county.
     * @throws DatasourceException If an error occurs during data retrieval.
     */
    private CensusData getPercentage(String state, String county) throws DatasourceException {
        assert(state.length() < 14);
        assert(county.length() < 15);
        try {
            this.resolveStateCounty(state, county);
            URL requestURL = new URL("https://api.census.gov/data/2021/acs/acs1/subject" +
                    "/variables?get=NAME,S2802_C03_022E&for=county:" + this.countyCode + "&in=state:"
                    + this.stateCode);
            HttpURLConnection clientConnection = connect(requestURL);
            Moshi moshi = new Moshi.Builder().build();
            Type type = Types.newParameterizedType(List.class, List.class, String.class);
            JsonAdapter<List<List<String>>> adapter = moshi.adapter(type);

            List<List<String>> row = adapter.fromJson(new Buffer().readFrom(clientConnection.getInputStream()));


            if(row == null) throw new DatasourceException("Malformed response from given State and County");

            clientConnection.disconnect();

            List<String> returnedRow = new ArrayList<>();

            returnedRow.add(row.get(1).get(0));
            returnedRow.add(row.get(1).get(1));

            return new CensusData(returnedRow);
        } catch(IOException e) {
            throw new DatasourceException(e.getMessage());
        }
    }
    public String getStateCode() {
        return this.stateCode;
    }
    public String getCountyCode() {
        return this.countyCode;
    }
}

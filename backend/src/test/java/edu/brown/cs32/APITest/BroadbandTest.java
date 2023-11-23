package edu.brown.cs32.APITest;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;
import edu.brown.cs32.API.CensusAPISource;
import edu.brown.cs32.DatasourceException;
import edu.brown.cs32.Records.CensusData;
import edu.brown.cs32.Records.CountyState;
import okio.Buffer;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.lang.reflect.Type;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

public class BroadbandTest {
    private CensusAPISource censusAPISource;

    @BeforeEach
    public void setup() {
        censusAPISource = new CensusAPISource();
    }

    @AfterEach
    public void tearDown() {
    }

    /**
     * This method tests the _real_ API datasource. It's good to have one such
     * test, but we strongly suggest mocking all others when possible. That way,
     * you aren't spamming the NWS with API requests whenever your tests run.
     *
     * @throws DatasourceException If there's an issue with the data source.
     * @throws IOException        If there's an I/O error during testing.
     */
    @Test
    public void testBasicSearch() throws DatasourceException, IOException {
        // Arrange
        CensusAPISource source = new CensusAPISource();
        CountyState countyState = new CountyState("Illinois", "Cook County");
        CensusData res = source.getCensusData(countyState);
        assertNotNull(res);

        // Additional Testing Steps
        URL requestURL = new URL("https://api.census.gov/data/2021/acs/acs1/subject" +
                "/variables?get=NAME,S2802_C03_022E&for=county:031&in=state:17");
        URLConnection urlConnection = requestURL.openConnection();
        HttpURLConnection clientConnection = (HttpURLConnection) urlConnection;
        Moshi moshi = new Moshi.Builder().build();
        Type type = Types.newParameterizedType(List.class, List.class, String.class);
        JsonAdapter<List<List<String>>> adapter = moshi.adapter(type);
        List<List<String>> row = adapter.fromJson(new Buffer().readFrom(clientConnection.getInputStream()));
        clientConnection.disconnect();

        // Asserts that the expected response for the given URL is correct
        assertEquals("[Cook County, Illinois, 84.8, 17, 031]", row.get(1).toString());
    }

    /**
     * Test the getCensusData method of the CensusAPISource class.
     *
     * @throws DatasourceException If there's an issue with the data source.
     */
    @Test
    public void testGetCensusData() throws DatasourceException {
        CountyState countyState = new CountyState("New York", "Kings County");
        CensusData result = this.censusAPISource.getCensusData(countyState);

        assertNotNull(result);
    }

    /**
     * Test the resolveStateCounty method of the CensusAPISource class.
     *
     * @throws DatasourceException If there's an issue with the data source.
     */
    @Test
    public void testResolveStateCounty() throws DatasourceException {
        this.censusAPISource.resolveStateCounty("New York", "Kings County");

        assertEquals("36", this.censusAPISource.getStateCode());
        assertEquals("047", this.censusAPISource.getCountyCode());
    }

    /**
     * Test the resolveStateCounty method of the CensusAPISource class with invalid input.
     *
     * @throws DatasourceException If there's an issue with the data source.
     */
    @Test
    public void testInvalidStateCounty() throws DatasourceException {
        // Act & Assert (This method is expected to throw an exception)
        this.censusAPISource.resolveStateCounty("Invalid State", "Invalid County");
    }
}
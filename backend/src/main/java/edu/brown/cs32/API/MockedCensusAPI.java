package edu.brown.cs32.API;

import edu.brown.cs32.DatasourceException;
import edu.brown.cs32.Records.CensusData;
import edu.brown.cs32.Records.CountyState;

/**
 * This class provides a mocked implementation of the CensusDatasource interface
 * for testing purposes.
 */
public class MockedCensusAPI implements CensusDatasource {
    private final CensusData mockedData;

    /**
     * Constructs a MockedCensusAPI instance with the specified mocked data.
     *
     * @param mockedData The CensusData instance to be returned when getCensusData is called.
     */
    public MockedCensusAPI(CensusData mockedData) {
        this.mockedData = mockedData;
    }

    /**
     * Get mocked Census data for a given CountyState.
     *
     * @param countyState The CountyState for which mocked Census data is requested.
     * @return The mocked Census data.
     * @throws DatasourceException If an error occurs while retrieving the mocked data.
     */
    @Override
    public CensusData getCensusData(CountyState countyState) throws DatasourceException {
        return mockedData;
    }
}
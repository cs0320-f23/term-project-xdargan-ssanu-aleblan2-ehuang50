package edu.brown.cs32.API;

import edu.brown.cs32.DatasourceException;
import edu.brown.cs32.Records.CensusData;
import edu.brown.cs32.Records.CountyState;

public interface CensusDatasource {

    /**
     * Get Census data for a given CountyState.
     *
     * @param countyState The CountyState for which Census data is requested.
     * @return The Census data for the specified CountyState.
     * @throws DatasourceException If an error occurs while retrieving the data.
     */
    CensusData getCensusData(CountyState countyState) throws DatasourceException;
}
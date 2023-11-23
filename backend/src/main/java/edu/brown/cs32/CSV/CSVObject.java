package edu.brown.cs32.CSV;

import java.util.List;

/**
 * This is the CSVObject class. It implements the CreatorFromRow interface and injects it with the
 * type String. It converts an inputted List of Strings into a singular String.
 */
public class CSVObject implements CreatorFromRow<List<String>> {

  @Override
  public List<String> create(List<String> row) throws FactoryFailureException {
    return row;
  }
}

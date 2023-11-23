package edu.brown.cs32.CSV;

import java.util.List;

/**
 * The DefaultCreator class is an implementation of the CreatorFromRow interface that returns the
 * input list of strings as is, without any changes. It is used for our searches and any
 * CreatorFromRow implementations that want to return a list of list of strings as is our default.
 */
public class DefaultCreator implements CreatorFromRow<List<String>> {

  /**
   * Creates an object of type list of string from a row represented as a list of string without
   * changes.
   *
   * @param row The input row represented as a list of strings
   * @return The created object, which is the same as the input row.
   */
  @Override
  public List<String> create(List<String> row) {
    return row;
  }
}

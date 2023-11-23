package edu.brown.cs32.CSV;

import java.util.List;

/**
 * This interface defines a method that allows your CSV parser to convert each row into an object of
 * some arbitrary passed type.
 *
 * <p>Your parser class constructor should take a second parameter of this generic interface type.
 */
public interface CreatorFromRow<T> {

  /**
   * Creates an object from a row.
   *
   * @param row The input row represented as a list of strings
   * @return T, an object of type T
   * @throws FactoryFailureException if error with converting
   */
  T create(List<String> row) throws FactoryFailureException;
}


package edu.brown.cs32.CSV;
import java.util.ArrayList;
import java.util.List;

/**
 * This is an error provided to catch any error that may occur when you create an object from a row.
 */
public class FactoryFailureException extends Exception {
  final List<String> row;

  /**
   * Constructs a new FactoryFailureException with the specified error message and the row of data
   * that caused the exception.
   *
   * @param message The error message describing the reason for the exception.
   * @param row The row of data that resulted in the exception.
   */
  public FactoryFailureException(String message, List<String> row) {
    super(message);
    this.row = new ArrayList<>(row);
  }
}
package edu.brown.cs32.CSV;
import java.util.ArrayList;
import java.util.List;

/**
 * The Searcher class. This is where we use our parsed data and various specifications in order to
 * find the rows containing the information we want.
 */
public class Searcher {
  private final List<List<String>> data;

  /**
   * Constructs a Searcher with a specified data parser.
   *
   * @param data The parser used to obtain the parsed data.
   */
  public Searcher(List<List<String>> data) {
    this.data = data;
  }

  /**
   * The method that searches a dataset for a value, potentially using column headers or indices.
   *
   * @param value  the value to be searched for
   * @param column a string with the header you are using, if you are
   * @return a list of list of strings that represents the rows your search was looking for
   */
  public List<List<String>> search(String value, String column) {
    return performSearch(value, column);
  }

  /**
   * Searches the parsedData for a value based on the entered criteria.
   *
   * @param value  The value to search for.
   * @param column The header or "No Headers" string specifying the column to search (if using
   *               headers).
   * @return A List of Lists of strings representing rows containing the search value.
   * @throws IllegalArgumentException if the column index is out of bounds
   */
  private List<List<String>> performSearch(String value, String column) {
    List<List<String>> results = new ArrayList<>();
    List<String> headerRow;
    if (!column.equalsIgnoreCase("no headers")) {
      headerRow = this.data.get(0);
      int headerIndex = getColumnIndex(headerRow, column);
      assert(headerIndex >= 0);
      for (List<String> row : this.data) {
        List<String> rowData = getRowData(row);
        if (headerIndex >= 0 && headerIndex < rowData.size()) {
          String cellValue = rowData.get(headerIndex);
          if (cellValue.equals(value)) {
            results.add(row);
          }
        }
      }
    } else {
      // Search all columns in the row
      for (List<String> row : this.data) {
        List<String> rowData = getRowData(row);
        for (String cellValue : rowData) {
          if (cellValue.equals(value)) {
            results.add(row);
            break;
          }
        }
      }
    }
    return results;
  }

  /**
   * Retrieves the row data from the given row.
   *
   * @param row The input row containing data.
   * @return A List of strings representing the row data.
   */
  private List<String> getRowData(List<String> row) {
    return row;
  }

  /**
   * Helper method to get the index of a column in the header row.
   *
   * @param headerRow The header row containing column names.
   * @param column    The column name to find the index of.
   * @return The index of the column in the header row, or -1 if not found.
   */
  private int getColumnIndex(List<String> headerRow, String column) {
    for (int i = 0; i < headerRow.size(); i++) {
      // Compare in a case-insensitive and whitespace-insensitive manner
      if (headerRow.get(i).trim().replaceAll("\\s+","")
              .equalsIgnoreCase(column.trim().replaceAll("\\s+",""))) {
        return i;
      }
    }
    // If the column is not found, return -1 or throw an exception as appropriate.
    return -1;
  }
}
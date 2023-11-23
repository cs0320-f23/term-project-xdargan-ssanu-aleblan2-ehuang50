package edu.brown.cs32.CSV;

import edu.brown.cs32.CSV.CreatorFromRow;
import edu.brown.cs32.CSV.FactoryFailureException;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.Reader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Pattern;

/**
 * The Parser class. This class is responsible for parsing Reader data and converting it into a list
 * of objects of type T using a specified CreatorFromRow instance.
 */
public class Parser<T> {
  private final Reader reader;
  private final CreatorFromRow<T> creator;
  // Instance of the interface, used to convert rows of CSV data into T objects

  /**
   * Constructs a new Parser instance with the specified reader and CreatorFromRow instance.
   *
   * @param reader The reader used to read the data.
   * @param creator An instance of CreatorFromRow used to convert rows of data into T objects.
   */
  public Parser(Reader reader, CreatorFromRow<T> creator) {
    this.reader = reader;
    this.creator = creator;
  }

  /**
   * Parses the CSV data from the provided reader and returns a list of objects of type T.
   *
   * @return A List of objects of type T created from the parsed data.
   * @throws IOException If an error occurs while reading the data.
   * @throws FactoryFailureException If an error occurs while creating objects from rows.
   */
  public List<T> parse() throws IOException, FactoryFailureException {
    Pattern regexSplitCsvRow = Pattern.compile(",(?=([^\\\"]*\\\"[^\\\"]*\\\")*(?![^\\\"]*\\\"))");
    List<T> rows = new ArrayList<>();
    try {
      BufferedReader br = new BufferedReader(this.reader);
      // BufferedReader helps with User #2's specifications of any Reader form

      String line = br.readLine();

      // iterates through, splits lines into an array of strings
      while (line != null) {
        String[] stringList = regexSplitCsvRow.split(line);
        List<String> row = new ArrayList<>(Arrays.asList(stringList));
        rows.add(this.creator.create(row));
        line = br.readLine();
      }
    }
    catch (IOException e) {
      throw new IOException("Error reading CSV data", e);
    }
    return rows;
  }
}

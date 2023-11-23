//package edu.brown.cs32;
//
//
//import edu.brown.cs32.Handlers.LoadHandler;
//import edu.brown.cs32.Handlers.SearchHandler;
//import java.io.IOException;
//import java.net.URL;
//import org.junit.jupiter.api.AfterAll;
//import org.junit.jupiter.api.Assertions;
//import org.junit.jupiter.api.BeforeAll;
//import java.net.HttpURLConnection;
//import spark.Spark;
//import java.io.BufferedReader;
//import com.squareup.moshi.Moshi;
//import org.junit.jupiter.api.Test;
//import java.io.InputStreamReader;
//import com.squareup.moshi.JsonAdapter;
//import okio.Buffer;
//import org.junit.jupiter.api.AfterEach;
//import org.junit.jupiter.api.BeforeAll;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import spark.Spark;
//
//import java.io.IOException;
//import java.lang.reflect.Type;
//import java.net.HttpURLConnection;
//import java.net.URL;
//import java.util.Map;
//import java.util.logging.Level;
//import java.util.logging.Logger;
//
//
//public class SearchHandlerTest {
//
//  @BeforeAll
//  public static void setUp() {
//      Spark.port(0);
//      // Eliminate logger spam in console for test suite
//      Logger.getLogger("").setLevel(Level.WARNING); // empty name = root
//    }
//  }
//
//  /** Searching for a value that does not exist */
//  @Test
//  public void nonExistentValue() throws IOException {
//    // http://localhost:3232/searchcsv?searchValue=Brown&useColumn=false&useHeaders=City/Town&columnIndex=3
//    // {"response_type":"success","searchResults":[],"userInput":"searchValue = Brown, useColumn = false, useHeaders = City/Town, columnIndex = 3"}
//  }
//
//  /** Searching entire dataset for an integer value that does exist. */
//    @Test
//    public void existentValue() throws IOException {
//      // http://localhost:3232/searchcsv?searchValue=5.2&useColumn=false&useHeaders=City/Town&columnIndex=3
//      // {"response_type":"success","searchResults":[],"userInput":"searchValue = 5.2, useColumn = false, useHeaders = City/Town, columnIndex = 3"}
//    }
//
//  /** Searching entire dataset for a string value that does exist */
//  @Test
//  public void stringValueExists() throws IOException {
//    // http://localhost:3232/searchcsv?searchValue=Barrington&useColumn=false&useHeaders=City/Town&columnIndex=3
//    // {"response_type":"success","searchResults":[["Barrington","130,455.00","154,441.00","69,917.00"]],"userInput":"searchValue = Barrington, useColumn = false, useHeaders = City/Town, columnIndex = 3"}
//  }
//
//  /** Searching entire dataset for a decimal value that does exist. */
//  @Test
//  public void decimalValueExists() throws IOException {
//    // http://localhost:3232/searchcsv?searchValue=55,787.00&useColumn=false&useHeaders=City/Town&columnIndex=3
//    // {"response_type":"success","searchResults":[["Providence","55,787.00","65,461.00","31,757.00"]],"userInput":"searchValue = 55,787.00, useColumn = false, useHeaders = City/Town, columnIndex = 3"}
//  }
//
//  /** Searching for a string value, using column header it belongs to */
//  @Test
//  public void stringValueWithHeader() throws IOException {
//    // http://localhost:3232/searchcsv?searchValue=Providence&useColumn=true&useHeaders=City/Town&columnIndex=3
//    // {"response_type":"success","searchResults":[["Providence","55,787.00","65,461.00","31,757.00"]],"userInput":"searchValue = Providence, useColumn = true, useHeaders = City/Town, columnIndex = 3"}
//  }
//
//
//  /** Searching for a string value with two words, using column header it belongs to */
//
//  /** Searching for a string value, using column header that exists, but it doesn't belong to */
//// http://localhost:3232/searchcsv?searchValue=Bristol&useColumn=true&useHeaders=Median%20Household%20Income%20&columnIndex=0
//  // {"response_type":"success","searchResults":[],"userInput":"searchValue = Bristol, useColumn = true, useHeaders = Median Household Income , columnIndex = 0"}
//  /** Searching for a string value with quotations, using entire dataset. */
//
//  /** Searching for a value using correct index number */
//  // http://localhost:3232/searchcsv?searchValue=Bristol&useColumn=true&useHeaders=No_Headers&columnIndex=0
//  // {"response_type":"success","searchResults":[["Bristol","80,727.00","115,740.00","42,658.00"]],"userInput":"searchValue = Bristol, useColumn = true, useHeaders = No_Headers, columnIndex = 0"}
//
//  /** Searching for a value using correct index number on a dataset with no headers */
//
//
//  /** Searching for an empty string as my search term */
//  // http://localhost:3232/searchcsv?searchValue=&useColumn=true&useHeaders=No_Headers&columnIndex=0
//  // {"response_type":"success","searchResults":[],"userInput":"searchValue = , useColumn = true, useHeaders = No_Headers, columnIndex = 0"}
//
//  /** Using commas in a search term to expose a flaw within our parsing data */
//
//  /** Searching for an existing value using incorrect index number */
//  @Test
//  public void wrongIndexNumber() throws IOException {
//    // http://localhost:3232/searchcsv?searchValue=Bristol&useColumn=true&useHeaders=No_Headers&columnIndex=3
//    // {"response_type":"success","searchResults":[],"userInput":"searchValue = Bristol, useColumn = true, useHeaders = No_Headers, columnIndex = 3"}
//  }
//
//  /** Searching for a value using index number longer than column amounts */
//  @Test
//  public void tooLongIndex() throws IOException {
//  // http://localhost:3232/searchcsv?searchValue=Bristol&useColumn=true&useHeaders=No_Headers&columnIndex=5
//  // {"response_type":"error_bad_request","message":"Error occurred: java.lang.IndexOutOfBoundsException: Column index out of bounds. Column index input must be between zero and 3","userInput":"searchValue = Bristol, useColumn = true, useHeaders = No_Headers, columnIndex = 5"}
//  }
//
//  /** Searching using a header that does not exist */
//  @Test
//  public void nonexistentHeader() throws IOException {
//    // http://localhost:3232/searchcsv?searchValue=Bristol&useColumn=true&useHeaders=HeaderName&columnIndex=1
//    // {"response_type":"error_bad_request","message":"Error occurred: java.lang.IllegalArgumentException:
//    // Column not found: HeaderName. Please input a header from the following: [City/Town, Median Household
//    // Income , Median Family Income, Per Capita Income]","userInput":"searchValue = Bristol, useColumn
//    // = true, useHeaders = HeaderName, columnIndex = 1"}
//  }
//
//  /** Searching using a header that exists, but in lowercase */
//    @Test
//    public void lowercaseHeader() throws IOException {
//      // http://localhost:3232/searchcsv?searchValue=Bristol&useColumn=true&useHeaders=city/town&columnIndex=3
//      // {"response_type":"error_bad_request","message":"Error occurred: java.lang.IllegalArgumentException: Column not found: city/town. Please input a header from the following: [City/Town, Median Household Income , Median Family Income, Per Capita Income]","userInput":"searchValue = Bristol, useColumn = true, useHeaders = city/town, columnIndex = 3"}
//    }
//  /** Searching using a header on a dataset that doesn't use headers */
//
//}
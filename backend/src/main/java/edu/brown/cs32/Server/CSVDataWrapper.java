package edu.brown.cs32.Server;

import java.util.List;

/**
 * A state container that's passed in to LoadHandler, ViewHandler, and SearchHandler to maintain the
 * state of the parsed data between endpoints.
 */
public class CSVDataWrapper {

    private List<List<String>> data;

    public CSVDataWrapper(List<List<String>> data) {
        this.data = data;
    }

    /**
     * A getter method for the parsed data called by Handler methods to change the state
     */
    public List<List<String>> getData() {
        return this.data;
    }

    /**
     * A setter method for the parsed data called by Handler methods to change the state
     * @param data the List<List<String> to be set
     */
    public void setData(List<List<String>> data) {
        this.data = data;
    }
}
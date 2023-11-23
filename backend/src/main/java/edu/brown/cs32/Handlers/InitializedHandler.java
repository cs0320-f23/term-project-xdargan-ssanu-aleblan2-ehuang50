package edu.brown.cs32.Handlers;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import spark.Request;
import spark.Response;
import spark.Route;

/**
 * This class handles HTTP requests when the server is initialized.
 * It implements the Spark `Route` interface to define how incoming HTTP requests are processed.
 */
public class InitializedHandler implements Route {
    /**
     * Handle an HTTP request when the server is initialized.
     *
     * @param request  The HTTP request object.
     * @param response The HTTP response object.
     * @return The response to be sent back to the client.
     * @throws Exception if an error occurs during request handling.
     */
    @Override
    public Object handle(Request request, Response response) throws Exception {
        return new LoadResponse().serialize();
    }

    /**
     * A record representing a response when the server is initialized.
     */
    public record LoadResponse(String Instructions) {
        public LoadResponse() {
            this("Awaiting further instructions: Please input endpoints loadcsv, viewcsv, " +
                    "searchcsv, or broadband");
        }

        /**
         * Serialize the response to JSON format.
         *
         * @return The JSON representation of this response.
         */
        String serialize() {
            Moshi moshi = new Moshi.Builder().build();
            JsonAdapter<InitializedHandler.LoadResponse> adapter =
                    moshi.adapter(InitializedHandler.LoadResponse.class);
            return adapter.toJson(this);
        }
    }
}
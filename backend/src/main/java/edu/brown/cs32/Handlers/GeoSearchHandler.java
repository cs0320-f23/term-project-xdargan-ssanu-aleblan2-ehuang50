package edu.brown.cs32.Handlers;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import java.io.File;
import java.nio.file.Files;
import java.util.*;

import edu.brown.cs32.Server.FeaturesRecord;
import spark.Request;
import spark.Response;
import spark.Route;


public class GeoSearchHandler implements Route {

    Queue<String> searchdata = new LinkedList<>();
    String filePath = "/Users/sohum/Desktop/CS320/maps-aleblan2-ssanu/frontend/src/geodata/fullDownload.json";

    @Override
    public Object handle(Request request, Response response) throws Exception {
        try {
            String target = request.queryParams("searchparam");

            if ((target == null)) { // if query parameters are not provided
                return new LoadHandler.LoadFailureResponse("Error: Provide Correct Target",
                        "fullDownload.geojson").serialize();
            }
            searchdata.add(target);
            if (searchdata.size() > 10) { searchdata.remove(); }

            Moshi moshi = new Moshi.Builder().build();
            JsonAdapter<FeaturesRecord.FeatureCollection> adapter = moshi.adapter(FeaturesRecord.FeatureCollection.class);
            String geoString =
                    new String(Files.readAllBytes((new File(filePath).toPath())));
            FeaturesRecord.FeatureCollection featureCollection = adapter.fromJson(geoString);
            assert featureCollection != null;
            List<FeaturesRecord.Feature> sortedfeatured = search(featureCollection.features(), target);

            FeaturesRecord.FeatureCollection final_record = new FeaturesRecord.FeatureCollection("FeatureCollection", sortedfeatured);

            return adapter.toJson(final_record);

        } catch (Exception e){
            return new LoadHandler.LoadFailureResponse("Error: Provide Correct Target",
                    "fullDownload.geojson").serialize();
        }
    }

    public List<FeaturesRecord.Feature> search(List<FeaturesRecord.Feature> feats, String target) {

        List<FeaturesRecord.Feature> filteredFeats = new ArrayList<>();

        for (FeaturesRecord.Feature feature : feats) {
            if (feature.geometry() != null) {
                for (String description : feature.properties().area_description_data().values()) {
                    if (description.toLowerCase().contains(target.toLowerCase())) {
                        filteredFeats.add(feature);
                    }
                }
            }
        }
        return filteredFeats;
    }

}
package edu.brown.cs32.Handlers;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import edu.brown.cs32.Server.FeaturesRecord;
import edu.brown.cs32.Server.FeaturesRecord.FeatureCollection;
import spark.Request;
import spark.Response;
import spark.Route;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.*;

import javax.xml.catalog.CatalogFeatures.Feature;

public class GeoHandler implements Route {

    String filePath = "/Users/sohum/Desktop/CS320/maps-aleblan2-ssanu/frontend/src/geodata/fullDownload.json";

    @Override
    public Object handle(Request request, Response response) throws Exception {
        try {

            String minLongStr = request.queryParams("minLong");
            String maxLongStr = request.queryParams("maxLong");
            String minLatStr = request.queryParams("minLat");
            String maxLatStr = request.queryParams("maxLat");
            Moshi moshi = new Moshi.Builder().build();
            JsonAdapter<FeatureCollection> adapter = moshi.adapter(FeatureCollection.class);
            String geoString =
                    new String(Files.readAllBytes((new File(filePath).toPath())));
            FeatureCollection featureCollection = adapter.fromJson(geoString);


            if (Objects.equals(minLongStr, "all") && Objects.equals(maxLongStr, "all") && Objects.equals(minLatStr, "all") && Objects.equals(maxLatStr, "all")) {
                return adapter.toJson(featureCollection);
            } else {
                Double minLong = Double.parseDouble(minLongStr);
                Double maxLong = Double.parseDouble(maxLongStr);
                Double minLat = Double.parseDouble(minLatStr);
                Double maxLat = Double.parseDouble(maxLatStr);

                assert featureCollection != null;
                List<FeaturesRecord.Feature> final_list = this.filter(featureCollection.features(), minLong, maxLong, minLat, maxLat);

                FeaturesRecord.FeatureCollection final_record = new FeaturesRecord.FeatureCollection("FeatureCollection", final_list);

                return adapter.toJson(final_record);

            }
        } catch (Exception e) {
            return new LoadHandler.LoadFailureResponse(this.filePath).serialize();
        }
    }

     public String jsonToFeat(String filePath) {
        // Create a Moshi instance
        Moshi moshi = new Moshi.Builder().build();

        JsonAdapter<FeatureCollection> adapter = moshi.adapter(FeatureCollection.class);

        try {
//            String geoString = Files.readString(Path.of(filePath), StandardCharsets.UTF_8);
            String geoString =
                    new String(Files.readAllBytes((new File(filePath).toPath())));
            FeatureCollection featureCollection = adapter.fromJson(geoString);

            return adapter.toJson(featureCollection);

        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    
    public List<FeaturesRecord.Feature> filter(List<FeaturesRecord.Feature> feats, double minLong, double maxLong, double minLat, double maxLat) {

        List<FeaturesRecord.Feature> filteredFeats = new ArrayList<>();

        for (FeaturesRecord.Feature feature: feats) {
            if (feature.geometry() != null) {
                boolean addbool = true;
                for (List<Double> coords : feature.geometry().coordinates().get(0).get(0)) {
                    if (coords.get(0) > maxLat
                            || coords.get(1) > maxLong
                            || coords.get(0) < minLat
                            || coords.get(1) < minLong) {
                        addbool = false;
                        break;
                    }
                }
                if (addbool) filteredFeats.add(feature);
            }
        }

        return filteredFeats;
    }

}

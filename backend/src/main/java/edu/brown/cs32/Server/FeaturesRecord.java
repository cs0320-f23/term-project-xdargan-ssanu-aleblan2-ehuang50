package edu.brown.cs32.Server;

import java.util.List;
import java.util.Map;
import java.util.Set;
import com.squareup.moshi.Json;

public class FeaturesRecord {

    public record FeatureCollection(
        @Json(name = "type") String type, 
        @Json(name = "features") List<Feature> features) {
    }

    public record Feature(
        @Json(name = "type") String type,
        @Json(name = "geometry") Geometry geometry, 
        @Json(name = "properties") Properties properties) {}

    public record Geometry(
        @Json(name = "coordinates") List<List<List<List<Double>>>> coordinates,
        @Json(name = "type") String type) {
    }

    public record Properties(
        @Json(name = "city") String city,
        @Json(name = "state") String state,
        @Json(name = "name") String name,
        @Json(name = "holc_id") String holc_id,
        @Json(name = "holc_grade") String holc_grade,
        @Json(name = "neighborhood_id") int neighborhood_id,
        @Json(name = "area_description_data") Map<String, String> area_description_data) {}

}

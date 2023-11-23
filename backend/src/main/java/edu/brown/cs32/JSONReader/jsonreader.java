package edu.brown.cs32.JSONReader;
import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.JsonDataException;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;

import java.io.IOException;
import java.lang.reflect.Type;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

public class jsonreader {

    public static <T> T JsonLoad(String filePath, Class<T> clas1) throws IOException {
        String json = Files.readString(Path.of(filePath));
        Moshi moshi = new Moshi.Builder().build();
        JsonAdapter<T> adapter = moshi.adapter(clas1);
        try {
            return adapter.fromJson(json);
        } catch (JsonDataException e) {
            throw new IOException("Error parsing JSON file: " + e.getMessage(), e);
        }
    }

    public static <T> List<T> JsonListLoad(String filePath, Class<T> clas2) throws IOException {
        String json = Files.readString(Path.of(filePath));
        Moshi moshi = new Moshi.Builder().build();
        Type type = Types.newParameterizedType(List.class, clas2);
        JsonAdapter<List<T>> adapter = moshi.adapter(type);
        try {
            return adapter.fromJson(json);
        } catch (JsonDataException e) {
            throw new IOException("Error parsing JSON file: " + e.getMessage(), e);
        }
    }
}

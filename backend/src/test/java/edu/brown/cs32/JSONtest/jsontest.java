package edu.brown.cs32.JSONtest;

import org.junit.jupiter.api.Test;

import edu.brown.cs32.JSONReader.jsonreader;

import java.io.IOException;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;


public class jsontest {

    @Test
    public void LoadJsonfromFile() throws IOException {
        dogobject dog = jsonreader.JsonLoad("/Users/sohum/Desktop/CS320/repl-ssanu-xjquan/Backend/src/test/java/edu/brown/cs32/JSONtest/TESTData.json", dogobject.class);

        assertNotNull(dog);
        assertEquals("Labrador Retriever", dog.getDogBreed());
        assertEquals("Buddy", dog.getDogName());
        assertEquals("Yellow", dog.getDogColor());
        assertEquals(5, dog.getDogAge());
        assertEquals(65, dog.getDogWeight());
    }

    @Test
    public void JsonfromFile() throws IOException {
        String filePath = "/Users/sohum/Desktop/CS320/repl-ssanu-xjquan/Backend/src/test/java/edu/brown/cs32/JSONtest/testjsonm.json"; // Update the path to your file
        List<dogobject> dogs = jsonreader.JsonListLoad(filePath, dogobject.class);

        assertNotNull(dogs);
        assertEquals(3, dogs.size());

        // Check details of the first dog
        dogobject firstDog = dogs.get(0);
        assertEquals("Labrador Retriever", firstDog.getDogBreed());
        assertEquals("Buddy", firstDog.getDogName());
        assertEquals("Yellow", firstDog.getDogColor());
        assertEquals(5, firstDog.getDogAge());
        assertEquals(65, firstDog.getDogWeight());

        // Check details of the second dog
        dogobject secondDog = dogs.get(1);
        assertEquals("Poodle", secondDog.getDogBreed());
        assertEquals("Fluffy", secondDog.getDogName());
        assertEquals("White", secondDog.getDogColor());
        assertEquals(3, secondDog.getDogAge());
        assertEquals(45, secondDog.getDogWeight());

        // Check details of the third dog
        dogobject thirdDog = dogs.get(2);
        assertEquals("Pug", thirdDog.getDogBreed());
        assertEquals("Buster", thirdDog.getDogName());
        assertEquals("Brown", thirdDog.getDogColor());
        assertEquals(2, thirdDog.getDogAge());
        assertEquals(30, thirdDog.getDogWeight());
    }
}
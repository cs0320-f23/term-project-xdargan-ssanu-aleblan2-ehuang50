/**
 * Unit Testing
 */
// Import functions
import React, { useState } from "react";

const setTitle = useState([]);
const setArtist = useState([]);
const setSongs = useState([]);
const setallData = useState([]);
const onAddSong = useState([]);
const onSongsUpdate = useState([]);
const onDataUpdate = useState([]);

// Mock External Functions
const getTrackInfo = jest.fn();
const getAudioFeatures = jest.fn();

// Mock Track Info
const trackInfoMock = { name: 'Mock Song', album: { images: [{ url: 'mock_image_url' }] } };
const audioFeaturesMock = { feature1: 0.5, feature2: 0.7 };

// Testing handleAddSong
console.log('Testing handleAddSong');

// Clearing Recommendations
console.log('Test 1: Clearing Recommendations');
let recs = ['some', 'data'];
handleAddSong({ preventDefault: () => {} }, recs, /* other required params */);
console.log('Expect setrecs to be called with []:', setrecs.mock.calls);

// Adding a Song with Valid Data
console.log('Test 2: Adding a Song with Valid Data');
getTrackInfo.mockResolvedValue(trackInfoMock);
await handleAddSong({ preventDefault: () => {} }, [], 'title', 'artist');
console.log('Expect onAddSong, setTitle, setArtist to be called');

// Error Handling in getTrackInfo
console.log('Test 3: Error Handling in getTrackInfo');
getTrackInfo.mockRejectedValue(new Error('Error'));
await handleAddSong({ preventDefault: () => {} }, [], 'title', 'artist');
console.log('Expect error handling logic for getTrackInfo');

// Testing addSong
console.log('Testing addSong');

// Update Songs List
console.log('Test 1: Update Songs List');
const newSong = { id: '1', name: 'New Song' };
const songs = [{ id: '2', name: 'Old Song' }];
// Changed from addSong to onAddSong
addSong(newSong, songs, /* other required params */);
console.log('Expect setSongs and onSongsUpdate to be called with new list');

// Audio Features Handling
console.log('Test 2: Audio Features Handling');
getAudioFeatures.mockResolvedValue(audioFeaturesMock);
await addSong(newSong, songs, /* other required params */);
console.log('Expect audio features to be processed');

// Error Handling in getAudioFeatures
console.log('Test 3: Error Handling in getAudioFeatures');
getAudioFeatures.mockRejectedValue(new Error('Error'));
await addSong(newSong, songs, /* other required params */);
console.log('Expect error handling logic for getAudioFeatures');

/* this calculates the average of the current songs that the user put in */
const calculateAverage = (songlistdata) => {
    const length = songlistdata.length;
    let sum1 = 0;
    let sum2 = 0;
    for (let i = 0; i < length; i++) {
      sum1 += songlistdata[i].data.x;
      sum2 += songlistdata[i].data.y;
    }
    const avgx = sum1 / length;
    const avgy = sum2 / length;
    return [avgx, avgy];
  };

const newSongData1 = {
    id: 1234567,
    artist: 987654321,
    data: {x:20, y:15},
  }
  const newSongData2 = {
    id: 1234567,
    artist: 987654321,
    data: {x:11, y:4},
  }
  const newSongData3 = {
    id: 1234567,
    artist: 987654321,
    data: {x:11, y:8},
  }

  const listsong = [newSongData1, newSongData2, newSongData3]

// Testing whether the average function works

function assert(condition, message) {
    if (!condition) {
        throw new Error(message || "Assertion failed");
    }
}

let avg = calculateAverage(listsong)
assert(avg[0] == 14, "correct");
assert(avg[0] == 9, "correct");
/**
 * Unit Testing - Unit testing on functions in InputBar, SongBox, and Stats
 * Considering user story 2 and our emphasis on musical technicality, how accurate are our functions for mean, median, etc?
 */
// Import functions
import React, { useState } from "react";
import Stats from '../src/components/Stats'
import InputBar from '../src/components/InputBar'
import SongBox from '../src/components/SongBox'


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
console.log('Clearing Recommendations');
let recs = ['some', 'data'];
handleAddSong({ preventDefault: () => {} }, recs);
console.log('Expect setrecs to be called with []:', setrecs.mock.calls);

// Adding a Song with Valid Data
console.log('Adding a Song with Valid Data');
getTrackInfo.mockResolvedValue(trackInfoMock);
await handleAddSong({ preventDefault: () => {} }, [], 'Sucker', 'Jonas Brothers');
console.log('Expect onAddSong, setTitle, setArtist to be called');

// Error Handling in getTrackInfo
console.log('Error Handling in getTrackInfo');
getTrackInfo.mockRejectedValue(new Error('Error'));
await handleAddSong({ preventDefault: () => {} }, [], 'invisible string', 'Taylor Swift');
console.log('Expect error handling logic for getTrackInfo');

// Testing addSong
console.log('Testing addSong');

// Update Songs List
console.log('Test 1: Update Songs List');
const newSong = { id: '1', name: 'New Song' };
const songs = [{ id: '2', name: 'Old Song' }];
// Changed from addSong to onAddSong
addSong(newSong, songs);
console.log('Expect setSongs and onSongsUpdate to be called with new list');

// Audio Features Handling
console.log('Test 2: Audio Features Handling');
getAudioFeatures.mockResolvedValue(audioFeaturesMock);
await addSong(newSong, songs);
console.log('Expect audio features to be processed');

// Error Handling in getAudioFeatures
console.log('Test 3: Error Handling in getAudioFeatures');
getAudioFeatures.mockRejectedValue(new Error('Error'));
await addSong(newSong, songs, /* other required params */);
console.log('Expect error handling logic for getAudioFeatures');

/* This calculates the average of the current songs that the user put in */
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

// Testing whether the average function works in STATS

function assert(condition, message) {
    if (!condition) {
        throw new Error(message || "Assertion failed");
    }
}

let avg = calculateAverage(listsong)
assert(avg[0] == 14, "correct");
assert(avg[0] == 9, "correct");

// More mock data for testing STATS functions
const mockData = {
    att1: 'Attribute 1',
    att2: 'Attribute 2',
    mean1: 10,
    median1: 5,
    mean2: 20,
    median2: 15,
  };
  




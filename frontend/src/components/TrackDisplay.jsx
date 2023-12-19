import React, { useState } from "react";
import SongBox from "./SongBox";
import InputBar from "./InputBar";
import { getAudioFeatures, getRecommendations } from "../api/spotifyApi";

/**
 * TrackDisplay is a React component that manages the display of songs and recommendations.
 *
 * @component
 * @param {string} att1 - The label for the first attribute used in the graph.
 * @param {string} att2 - The label for the second attribute used in the graph.
 * @param {Function} onDataUpdate - A function to update the data used in the graph.
 * @param {Array} Data - The data used in the graph.
 * @param {Function} onColorDataUpdate - A function to update the color data used in the graph.
 * @param {Function} onSongsUpdate - A function to update the list of songs.
 * @param {Function} onResetSongs - A function to reset the colors of the songs in the graph.
 * @returns {JSX.Element} JSX element representing the track display.
 *
 */
const TrackDisplay = ({
  att1,
  att2,
  onDataUpdate,
  Data,
  onColorDataUpdate,
  onSongsUpdate,
  onResetSongs,
}) => {
  const [songs, setSongs] = useState([]);
  const [alldata, setallData] = useState([]);
  const [recs, setRecs] = useState([]);

  /**
   * Calculate the average of the current songs in the list.
   *
   * @function
   * @param {Array} songlistdata - The list of songs to calculate the average.
   * @returns {Array} An array containing the average values for x and y.
   */
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

  /**
   * Calculate the Euclidean distance between the new song and the centroid (average of old songs).
   *
   * @function
   * @param {Object} songdata - The data of the new song.
   * @param {Array} centroid - The centroid (average) of the old songs.
   * @returns {number} The Euclidean distance between the new song and the centroid.
   */
  const calculateED = (songdata, centroid) => {
    let x = Math.pow(songdata.x - centroid[0], 2);
    let y = Math.pow(songdata.y - centroid[1], 2);
    return Math.sqrt(x + y);
  };

  /**
   * Fetch audio features for a recommended song and return its data.
   *
   * @async
   * @function
   * @param {Object} newSong - The recommended song object.
   * @param {Array} centroid - The centroid (average) of the old songs.
   * @returns {Promise<Object>} A promise that resolves to the data of the recommended song.
   */
  const recommendedafr = async (newSong, centroid) => {
    return await getAudioFeatures(newSong.id)
      .then((audioFeatures) => {
        const newDataPoint = {
          x: audioFeatures[att1].toFixed(2) * 100,
          y: audioFeatures[att2].toFixed(2) * 100,
        };
        const newSongData = {
          id: newSong.id,
          artist: newSong.artists[0].id,
          url: newSong.album.images[0].url,
          title: newSong.name,
          artist_name: newSong.artists[0].name,
          data: newDataPoint,
          ED: calculateED(newDataPoint, centroid),
        };
        return newSongData;
      })
      .catch((error) => {
        // Handle errors
        console.error("Error fetching audio features:", error);
      });
  };

  /**
   * Remove the last added song from the list and update the data in the graph.
   *
   * @function
   */
  const removeSong = () => {
    if (songs.length == 0) {
      alert("Please add a song before you remove one.");
    } else if (songs.length == 1) {
      setSongs([]);
      onDataUpdate([]);
      onResetSongs(0);
    } else {
      setSongs(songs.slice(0, songs.length - 1));
      onDataUpdate(Data.slice(0, Data.length - 1));
    }
  };

  /**
   * Add a new song to the list, fetch its audio features, and update the data in the graph.
   *
   * @function
   * @param {Object} newSong - The new song to be added.
   */
  const addSong = (newSong) => {
    const newSongList = [...songs, newSong];
    setSongs(newSongList);
    onSongsUpdate(newSongList); // Notify parent component

    console.log("att1: " + att1);
    console.log("att2: " + att2);

    getAudioFeatures(newSong.id)
      .then((audioFeatures) => {
        const newDataPoint = {
          x: audioFeatures[att1].toFixed(2) * 100,
          y: audioFeatures[att2].toFixed(2) * 100,
        };

        const newSongData = {
          id: newSong.id,
          artist: newSong.artists[0].id,
          data: newDataPoint,
        };

        const newDataList = [...alldata, newSongData];
        const newGraphData = [...Data, newDataPoint];

        setallData(newDataList);
        onDataUpdate(newGraphData); // Notify parent component

        console.log("Audio Features:", audioFeatures);
        console.log("Att1:", audioFeatures[att1]);
        console.log("Datapoint:", newDataPoint);
        console.log("Updated Data:", newDataList);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error fetching audio features:", error);
      });
  };

  /**
   * Generate song recommendations based on the current list of songs and update the data in the graph.
   *
   * @async
   * @function
   */
  const generateRecommendations = async () => {
    if (alldata.length < 1) {
      alert("Please put in at least one song to generate recommendations");
      return;
    }
    getRecommendations(alldata).then(async (recommendations) => {
      const lenrecommendations = recommendations.tracks.length;
      let new_recommendations = [];
      const centroid = calculateAverage(alldata);
      for (let i = 0; i < lenrecommendations; i++) {
        new_recommendations.push(
          await recommendedafr(recommendations.tracks[i], centroid)
        );
      }
      new_recommendations.sort((a, b) => a.ED - b.ED);
      const final_recommendations = new_recommendations.slice(0, 11);
      let newlist = [];
      for (let i = 0; i < final_recommendations.length; i++) {
        newlist.push(final_recommendations[i].data);
      }
      onDataUpdate(newlist);
      onResetSongs(newlist.length);
      setRecs(final_recommendations);
      return;
    });
  };

  return (
    <div className="flex flex-col overflow-scroll">
      <div className="overflow-scroll bg-beige border-dksage border-2 w-[500px] h-[450px]">
        {recs.length > 0 ? (
          <div>
            <p>Here are your new songs!</p>{" "}
            {recs.map((song, index) => (
              <SongBox
                index={index}
                url={song.url}
                title={song.title}
                artist={song.artist_name}
                onColorDataUpdate={onColorDataUpdate}
              />
            ))}
          </div>
        ) : (
          songs.map((song, index) => (
            <SongBox
              index={index}
              url={song.album.images[0].url}
              title={song.name}
              artist={song.artists[0].name}
              onColorDataUpdate={onColorDataUpdate}
            />
          ))
        )}
      </div>
      <InputBar
        onAddSong={addSong}
        recs={recs}
        setRecs={setRecs}
        removeSong={removeSong}
        generateRecommendations={generateRecommendations}
      />
      {/* <button
        className="bg-amber-500 text-white p-1 rounded"
        onClick={() => generateRecommendations(alldata)}
      >
        Generate Recommendations
      </button> */}
    </div>
  );
};

export default TrackDisplay;

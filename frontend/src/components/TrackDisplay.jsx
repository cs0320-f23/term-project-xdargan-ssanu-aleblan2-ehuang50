import React, { useState } from "react";
import SongBox from "./SongBox";
import InputBar from "./InputBar";
import { getAudioFeatures, getRecommendations } from "../api/spotifyApi";

const TrackDisplay = ({ att1, att2, onDataUpdate }) => {
  const [songs, setSongs] = useState([]);
  const [alldata, setallData] = useState([]);
  const [data, setData] = useState([]);

  const audiofeaturereturn = (newSong) => {
    getAudioFeatures(newSong)
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
        return newSongData;
      })

  }
  const addSong = (newSong) => {
    setSongs([...songs, newSong]);

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
        const newGraphData = [...data, newDataPoint];

        setallData(newDataList);
        setData(newGraphData);
        onDataUpdate(newGraphData); // Notify parent component

        console.log('Audio Features:', audioFeatures);
        console.log('Att1:', audioFeatures[att1]);
        console.log('Datapoint:', newDataPoint);
        console.log('Updated Data:', newDataList);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error fetching audio features:", error);
      });
  };
  const generateRecommendations = () => {
    if (alldata.length < 1) {
      alert("Please put in at least one song to generate recommendations")
      return;
    }
    getRecommendations(alldata).then((recommendations) => {
      const lenrecommendations = recommendations.length;
      let new_reccomendations = [];
      for (let i=0; i<lenrecommendations; i++) {
        new_reccomendations.push(recommendations[i].id);
      }
      console.log(recommendations);
    });
  };

  return (
    <div className="flex flex-col overflow-scroll">
      <div className="overflow-scroll bg-beige border-dksage border-2 w-[500px] h-[450px]">
        {songs.map((song, index) => (
          <SongBox
            index={index}
            url={song.album.images[0].url}
            title={song.name}
            artist={song.artists[0].name}
          />
        ))}
      </div>
      <InputBar onAddSong={addSong} />
      <button style={{border: "2px solid black"}} onClick={generateRecommendations}>Generate Recommendations</button>
    </div>
  );
};

export default TrackDisplay;


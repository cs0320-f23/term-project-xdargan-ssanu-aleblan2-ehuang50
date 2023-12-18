import React, { useState } from "react";
import SongBox from "./SongBox";
import InputBar from "./InputBar";
import { getAudioFeatures } from "../api/spotifyApi";

const TrackDisplay = ({ att1, att2, onDataUpdate }) => {
  const [songs, setSongs] = useState([]);
  const [data, setData] = useState([]);

  const addSong = (newSong) => {
    setSongs([...songs, newSong]);

    getAudioFeatures(newSong.id)
      .then((audioFeatures) => {
        const newDataPoint = {
          x: audioFeatures[att1].toFixed(2) * 100,
          y: audioFeatures[att2].toFixed(2) * 100,
        };

        const newDataList = [...data, newDataPoint];

        setData(newDataList);
        onDataUpdate(newDataList); // Notify parent component

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
    </div>
  );
};

export default TrackDisplay;

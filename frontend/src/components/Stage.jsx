import React, { useState } from "react";
import Logo from "./Logo";
import TrackDisplay from "./TrackDisplay";
import Stats from "./Stats";
import Graph from "./Graph";
import DropdownMenu from "./DropdownMenu";
import { getAudioFeatures } from "../api/spotifyApi";

const Stage = () => {
  const [data, setData] = useState([]);
  const [colorData, setColorData] = useState([]);
  const [songs, setSongs] = useState([]);

  const handleDataUpdate = (newData) => {
    setData(newData);
    const newColorList = [...colorData, "#FFFFFF"];
    setColorData(newColorList);
  };

  const handleColorDataUpdate = (index, color) => {
    const newColorList = [...colorData];
    newColorList[index] = color;
    setColorData(newColorList);
  };

  const handleSongsUpdate = (newSongs) => {
    setSongs(newSongs);
  };

  const [att1, setAtt1] = useState("Energy");
  const [att2, setAtt2] = useState("Danceability");

  const updateDataWithAttribute = async (att, isX) => {
    console.log("original: " + JSON.stringify(data));
    const newDataList = [...data];
    console.log(songs.length);
    console.log(JSON.stringify(songs));
    for (let i = 0; i < songs.length; i++) {
      const currSong = songs[i];
      await getAudioFeatures(currSong.id)
        .then((audioFeatures) => {
          const currData = newDataList[i];
          console.log("old point: " + JSON.stringify(currData));
          console.log("att: " + att);
          console.log(
            "audioFeatures[att]: " + JSON.stringify(audioFeatures[att])
          );
          let updatedCurrData = newDataList[i];
          if (isX) {
            updatedCurrData = {
              ...currData,
              x: audioFeatures[att].toFixed(2) * 100,
            };
          } else {
            updatedCurrData = {
              ...currData,
              y: audioFeatures[att].toFixed(2) * 100,
            };
          }
          console.log("new point: " + JSON.stringify(updatedCurrData));
          newDataList[i] = updatedCurrData;
        })
        .catch((error) => {
          // Handle errors
          console.error("Error updating audio features:", error);
        });
    }
    console.log("updated: " + JSON.stringify(newDataList));
    setData(newDataList);
  };

  const [mean1, setMean1] = useState("");
  const [mean2, setMean2] = useState("");
  const [median1, setMedian1] = useState("");
  const [median2, setMedian2] = useState("");

  const calculateMean = (att, isX) => {};

  return (
    <div className="flex flex-col items-center bg-sage h-screen">
      <div className="flex items-center justify-center w-1/5 p-8">
        <Logo />
      </div>
      <div className="flex">
        <div className="flex flex-col">
          <div className="flex w-1/4 h-2/3 items-center">
            <Stats
              att1={att1}
              att2={att2}
              mean1={mean1}
              median1={median1}
              mean2={mean2}
              median2={median2}
            />
          </div>
          <div className="flex">
            <DropdownMenu
              options={[
                { value: "Acousticness", label: "Acousticness" },
                { value: "Danceability", label: "Danceability" },
                { value: "Energy", label: "Energy" },
                { value: "Instrumentalness", label: "Instrumentalness" },
                { value: "Speechiness", label: "Speechiness" },
                { value: "Valence", label: "Valence" },
              ]}
              onChange={(selectedValue) => {
                setAtt1(selectedValue);
                updateDataWithAttribute(selectedValue.toLowerCase(), true);
              }}
              startingIndex={2}
            />
          </div>
          <div className="flex mt-2">
            <DropdownMenu
              options={[
                { value: "Acousticness", label: "Acousticness" },
                { value: "Danceability", label: "Danceability" },
                { value: "Energy", label: "Energy" },
                { value: "Instrumentalness", label: "Instrumentalness" },
                { value: "Speechiness", label: "Speechiness" },
                { value: "Valence", label: "Valence" },
              ]}
              onChange={(selectedValue) => {
                setAtt2(selectedValue);
                updateDataWithAttribute(selectedValue.toLowerCase(), false);
              }}
              startingIndex={1}
            />
          </div>
        </div>
        <div className="flex p-2">
          <Graph data={data} att1={att1} att2={att2} colorData={colorData} />
        </div>
        <div className="flex flex-col text-center h-full w-2/3">
          <TrackDisplay
            onDataUpdate={handleDataUpdate}
            onColorDataUpdate={handleColorDataUpdate}
            onSongsUpdate={handleSongsUpdate}
            att1={att1.toLowerCase()}
            att2={att2.toLowerCase()}
          />
        </div>
      </div>
    </div>
  );
};

export default Stage;

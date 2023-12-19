import React, { useState } from "react";
import Logo from "./Logo";
import TrackDisplay from "./TrackDisplay";
import Stats from "./Stats";
import Graph from "./Graph";
import DropdownMenu from "./DropdownMenu";
import { getAudioFeatures } from "../api/spotifyApi";

/**
 * Stage is a React component that represents the main front-end stage of the application.
 *
 * @component
 * @returns {JSX.Element} JSX element representing the main stage.
 *
 */
const Stage = () => {
  const [data, setData] = useState([]);
  const [colorData, setColorData] = useState([]);
  const [songs, setSongs] = useState([]);

  /**
   * Handles the update of data in the component.
   *
   * @param {Array} newData - The new data to be stored in the stage.
   */
  const handleDataUpdate = (newData) => {
    setData(newData);
    setMean1(calculateMean(newData, true));
    setMean2(calculateMean(newData, false));
    setMedian1(calculateMedian(newData, true));
    setMedian2(calculateMedian(newData, false));
    const newColorList = [...colorData, "#FFFFFF"];
    setColorData(newColorList);
  };

  /**
   * Handles the update of color data for a specific song.
   *
   * @param {number} index - The index of the song in the list.
   * @param {string} color - The new color data for the song.
   */
  const handleColorDataUpdate = (index, color) => {
    const newColorList = [...colorData];
    newColorList[index] = color;
    setColorData(newColorList);
  };

  /**
   * Handles the update of the songs in the component.
   *
   * @param {Array} newSongs - The new songs to set in the component.
   */
  const handleSongsUpdate = (newSongs) => {
    setSongs(newSongs);
  };

  /**
   * Resets the colors for all songs.
   *
   * @param {number} size - The number of songs.
   */
  const resetColors = (size) => {
    let newColors = [];
    for (let i = 0; i < size; i++) {
      newColors = [...newColors, "#FFFFFF"];
    }
    setColorData(newColors);
  };

  const [att1, setAtt1] = useState("Energy");
  const [att2, setAtt2] = useState("Danceability");

  /**
   * Updates the data with a selected attribute changed.
   *
   * @param {string} att - The selected attribute.
   * @param {boolean} isX - Whether the attribute is for the X-axis.
   */
  const updateDataWithAttribute = async (att, isX) => {
    let newDataList = [...data];
    const updateDataSequentially = async () => {
      for (let i = 0; i < songs.length; i++) {
        const currSong = songs[i];
        await getAudioFeatures(currSong.id)
          .then((audioFeatures) => {
            const currData = newDataList[i];
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
            newDataList[i] = updatedCurrData;
          })
          .catch((error) => {
            // Handle errors
            console.error("Error updating audio features:", error);
          });
      }
    };
    await updateDataSequentially();
    setData(newDataList);
    if (isX) {
      setMean1(calculateMean(newDataList, isX));
      setMedian1(calculateMedian(newDataList, isX));
    } else {
      setMean2(calculateMean(newDataList, isX));
      setMedian2(calculateMedian(newDataList, isX));
    }
  };

  const [mean1, setMean1] = useState("");
  const [mean2, setMean2] = useState("");
  const [median1, setMedian1] = useState("");
  const [median2, setMedian2] = useState("");

  /**
   * Calculates the mean of a specific data list and attribute.
   *
   * @param {Array} dataList - The data list.
   * @param {boolean} isX - Whether the attribute is for the X-axis.
   * @returns {string} The calculated mean.
   */
  const calculateMean = (dataList, isX) => {
    const total = parseFloat(dataList.length);
    if (total == 0) {
      return "";
    }
    let mean = 0;
    for (let i = 0; i < dataList.length; i++) {
      if (isX) {
        mean += dataList[i].x;
      } else {
        mean += dataList[i].y;
      }
    }
    return (mean / total).toFixed(2);
  };

  /**
   * Calculates the median of a specific data list and attribute.
   *
   * @param {Array} dataList - The data list.
   * @param {boolean} isX - Whether the attribute is for the X-axis.
   * @returns {string} The calculated median.
   */
  const calculateMedian = (dataList, isX) => {
    const total = parseFloat(dataList.length);
    if (total == 0) {
      return "";
    }
    // Make a list of all the needed values
    let numberList = [];
    for (let i = 0; i < dataList.length; i++) {
      if (isX) {
        numberList = [...numberList, dataList[i].x];
      } else {
        numberList = [...numberList, dataList[i].y];
      }
    }

    // Sort the numbers in ascending order
    const sortedList = [...numberList].sort((a, b) => a - b);

    // Calculate the median
    if (sortedList.length % 2 === 0) {
      // If the length is even, average the two middle values
      const middleIndex1 = sortedList.length / 2 - 1;
      const middleIndex2 = sortedList.length / 2;
      const median = (sortedList[middleIndex1] + sortedList[middleIndex2]) / 2;

      return median.toFixed(1); // rounded to two decimal places
    } else {
      // If the length is odd, return the middle value
      const middleIndex = Math.floor(sortedList.length / 2);
      return sortedList[middleIndex].toFixed(1); // rounded to two decimal places
    }
  };

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
            onResetSongs={resetColors}
            att1={att1.toLowerCase()}
            att2={att2.toLowerCase()}
            Data={data}
          />
        </div>
      </div>
    </div>
  );
};

export default Stage;

import React, { useState } from "react";
import { getTrackInfo } from "../api/spotifyApi";

/**
 * InputBar is a React component that provides interactive text boxes and buttons for adding, removing songs, and generating recommendations.
 *
 * @component
 * @param {Function} onAddSong - Callback function to add a song.
 * @param {Array<Object>} recs - An array of recommendations.
 * @param {Function} setRecs - Function to set the recommendations.
 * @param {Function} removeSong - Callback function to remove a song.
 * @param {Function} generateRecommendations - Callback function to generate recommendations.
 * @returns {JSX.Element} JSX element representing the input form.
 *
 */
const InputBar = ({
  onAddSong,
  recs,
  setRecs,
  removeSong,
  generateRecommendations,
}) => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");

  /**
   * Handles the submission of when a song is added.
   *
   * @param {Object} e - The form submission event.
   */
  const handleAddSong = (e) => {
    e.preventDefault();
    if (recs.length != 0) {
      setRecs([]);
    }
    if (title && artist) {
      getTrackInfo(title, artist)
        .then((trackInfo) => {
          console.log(trackInfo);
          console.log(trackInfo.name);
          console.log(trackInfo.album.images[0].url);
          onAddSong(trackInfo);
        })
        .catch((error) => {
          // Handle errors
          console.error(error);
        });

      setTitle("");
      setArtist("");
    }
  };

  /**
   * Handles the removal of a song.
   */
  const handleRemoveSong = () => {
    if (recs.length != 0) {
      setRecs([]);
    }
    removeSong();
  };

  return (
    <div className="flex text-gotham justify-around p-4">
      <form className="flex flex-col" onSubmit={handleAddSong}>
        <div className="flex flex-col space-y-2">
          <label>
            <input
              className="bg-beige text-dksage pr-4 pl-4 pt-2 pb-2 rounded"
              type="text"
              placeholder="Enter song title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label>
            <input
              className="bg-beige text-dksage pr-4 pl-4 pt-2 pb-2 rounded"
              type="text"
              placeholder="Enter artist..."
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
            />
          </label>
          <button type="submit" className="bg-dksage text-white p-1 rounded">
            Add Song
          </button>
          <button
            onClick={handleRemoveSong}
            className="bg-red-500 text-white p-1 rounded"
          >
            Remove Song
          </button>
          <button
            onClick={generateRecommendations}
            className="bg-amber-400 text-white p-1 rounded"
          >
            Generate Recommendations
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputBar;

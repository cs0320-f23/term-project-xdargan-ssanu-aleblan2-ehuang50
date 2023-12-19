import React, { useState } from "react";

/**
 * Shortens the given title to a specified maximum number of characters.
 *
 * @param {string} title - The original title.
 * @param {number} maxChars - The maximum number of characters for the shortened title.
 * @returns {string} The shortened title.
 */
const shortenTitle = (title, maxChars) => {
  if (title.length <= maxChars) {
    return title;
  } else {
    return title.substr(0, maxChars - 3) + "...";
  }
};

/**
 * SongBox is a React component that visually displays information about a song.
 *
 * @component
 * @param {string} url - The URL of the song image.
 * @param {string} title - The title of the song.
 * @param {string} artist - The artist of the song.
 * @param {number} index - The index of the song in the list.
 * @param {Function} onColorDataUpdate - Callback function to update color data for the song.
 * @returns {JSX.Element} JSX element representing the song box.
 *
 */
const SongBox = ({ url, title, artist, index, onColorDataUpdate }) => {
  const [currentColor, setCurrentColor] = useState("#FFFFFF");

  const finalTitle = shortenTitle(title, 23);
  const finalArtist = shortenTitle(artist, 27);

  /**
   * Generates a random hex code.
   *
   * @returns {string} The generated hex code.
   */
  const generateRandomHexCode = () => {
    const randomColor = Math.floor(Math.random() * 16777215);
    const hexCode = "#" + randomColor.toString(16).padStart(6, "0");
    return hexCode;
  };

  /**
   * Shuffles the color for the song box and updates color data for this data point at index.
   */
  const shuffleColor = () => {
    const randomHexCode = generateRandomHexCode();
    setCurrentColor(randomHexCode);
    onColorDataUpdate(index, randomHexCode);
  };

  return (
    <div className="flex font-gotham border border-dksage bg-beige p-4">
      <div className="flex w-full">
        <img
          src={url}
          className="w-[100px] square-image-container justify-start"
        />
        <div className="flex flex-col text-dksage p-4 pt-6 whitespace-nowrap w-2/3">
          <p className="flex text-2xl font-bold">{finalTitle}</p>
          <p className="flex text-lg">{finalArtist}</p>
        </div>
        <div className="flex items-center w-full">
          <button
            className={`w-8 h-8 border-dksage border-2 ml-auto rounded-full`}
            style={{ backgroundColor: currentColor }}
            onClick={shuffleColor}
          ></button>
        </div>
      </div>
    </div>
  );
};

export default SongBox;

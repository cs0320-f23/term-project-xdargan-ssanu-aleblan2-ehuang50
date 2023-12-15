import { ACCESS_TOKEN } from "./private/api";

export const getTrackInfo = (songName, artistName) => {
  // Encode the song and artist names for a URL
  const encodedSongName = encodeURIComponent(songName);
  const encodedArtistName = encodeURIComponent(artistName);

  // Make the search request
  return fetch(
    `https://api.spotify.com/v1/search?q=${encodedSongName}%20${encodedArtistName}&type=track&limit=1`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      // Return the track info from the response
      return data.tracks.items[0];
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
};

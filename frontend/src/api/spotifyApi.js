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

export async function getAudioFeatures(trackId) {
  return await fetch(`https://api.spotify.com/v1/audio-features/${trackId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  })
    .then((response) => response.json())
    .then((audioFeatures) => {
      // Return the audio features from the response
      return audioFeatures;
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
}

export const getAudioFeaturesFromSearch = (songName, artistName) => {
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
      // Call audio features using the returned trackID
      return fetch(
        `https://api.spotify.com/v1/audio-features/${data.tracks.items[0].id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      )
        .then((response) => response.json())
        .then((audioFeatures) => {
          // Return the audio features from the response
          return audioFeatures;
        })
        .catch((error) => {
          console.error("Error:", error);
          throw error;
        });
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
};

export const getRecommendations = (songlistdata) => {
  const length = songlistdata.length > 5 ? 5 : songlistdata.length;
  let seed_artists = "";
  let seed_tracks = "";
  for (let i = 0; i < length; i++) {
    if (i - 1 == length) {
      // seed_artists += songlistdata[i].artist;
      seed_tracks += songlistdata[i].id;
    } else {
      // seed_artists += songlistdata[i].artist + ",";
      seed_tracks += songlistdata[i].id + ",";
    }
  }
  // Make the search request
  return fetch(
    /* &seed_artists=${seed_artists} */
    `https://api.spotify.com/v1/recommendations?limit=30&seed_tracks=${seed_tracks}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    }
  )
    .then((response) => response.json())
    .then((recommendations) => {
      // Return the recommendations from the response
      return recommendations;
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
};

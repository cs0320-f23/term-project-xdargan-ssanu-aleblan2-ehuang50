import React, {useState} from 'react'
import SongBox from './SongBox'
import InputBar from './InputBar';

const TrackDisplay = () => {

    const [songs, setSongs] = useState([]);

    const addSong = (newSong) => {
        setSongs([...songs, newSong]);
    };

    return (
        <div className='flex flex-col overflow-scroll'>
            <div className="overflow-scroll border-dksage border-2">
                {songs.map((song, index) => (
                <SongBox
                    key={index}
                    url={require("../image/clairo.png")}
                    title={song.title}
                    artist={song.artist}
                    color="red-600"
                />
                ))}
            </div>
            <InputBar onAddSong={addSong} />
        </div>
      );
    };
    
    export default TrackDisplay;
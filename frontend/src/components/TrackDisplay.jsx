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
            <div className="overflow-scroll bg-beige border-dksage border-2 w-[500px] h-[450px] ">
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
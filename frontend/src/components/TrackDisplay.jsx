import React, {useState} from 'react'
import SongBox from './SongBox'
import InputBar from './InputBar';

const TrackDisplay = () => {

    const [songs, setSongs] = useState([]);

    const addSong = (newSong) => {
        setSongs([...songs, newSong]);
    };

    return (
        <div className="overflow-scroll border-dksage border-2">
          <div>
            {songs.map((song, index) => (
              <SongBox
                key={index}
                // Assuming you have an image URL for the new song, you can modify accordingly
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

// return (
//     <div className="overflow-scroll border-dksage border-2">
//         <div>
//             <SongBox 
//                 url={require("../image/lizzymcalpine.jpeg")}
//                 title="Same Boat"
//                 artist="Lizzy McAlpine"
//                 color="red-600"/>
//             <SongBox 
//                 url={require("../image/clairo.png")}
//                 title="Closer to You"
//                 artist="Clairo"/>
//             <SongBox 
//                 url={require("../image/duster.jpeg")}
//                 title="Inside Out"
//                 artist="Duster"/>
//             <SongBox 
//                 url={require("../image/macdemarco.jpeg")}
//                 title="Moonlight on..."
//                 artist="Mac Demarco"/>
//             <SongBox 
//                 url={require("../image/frankocean.jpeg")}
//                 title="Self Control"
//                 artist="Frank Ocean"/>
//         </div>
//     </div>
// );
// }

// export default TrackDisplay
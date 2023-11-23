import React from 'react'
import SongBox from './SongBox'
import InputBar from './InputBar';

const TrackDisplay = () => {
return (
    <div className="overflow-scroll border-dksage border-2">
        <div>
            <SongBox 
                url=""
                title="Same Boat"
                artist="Lizzy McAlpine"/>
            <SongBox 
                title="Closer to You"
                artist="Clairo"/>
        </div>
        <div>
            {/* <InputBar/> */}
        </div>
    </div>
);
}

export default TrackDisplay
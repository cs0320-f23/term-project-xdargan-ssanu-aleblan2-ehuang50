import React, {useState} from 'react'
import Logo from './Logo' 
import TrackDisplay from './TrackDisplay'
import Stats from './Stats'
import Graph from './Graph'

const Stage = () => {

  const [data, setData] = useState([]);

  const handleDataUpdate = (newData) => {
    setData(newData);
  };
  
  return (
    <div className='flex flex-col items-center bg-sage h-screen'>
        <div className='flex items-center justify-center w-1/5 p-8'>
          <Logo />
        </div>
        <div className='flex'>
          <div className='flex w-1/4 h-2/3 items-center'>
            <Stats 
            att1="Popularity"
            att2="Energy"
            mean1=""
            median1=""
            mean2=""
            median2=""/>
          </div>
          <div className='flex p-2'>
            <Graph 
            data={data}
            att1="Energy"
            att2="Popularity"/>
          </div>
          <div className='flex flex-col text-center h-full w-2/3'>
            <TrackDisplay
            onDataUpdate={handleDataUpdate}
            att1="energy"
            att2="danceability"
            />
          </div>
        </div>
    </div>
  )
}

export default Stage
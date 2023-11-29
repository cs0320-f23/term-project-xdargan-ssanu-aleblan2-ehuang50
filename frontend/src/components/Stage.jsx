import React from 'react'
import Logo from './Logo' 
import InputBar from './InputBar'
import TrackDisplay from './TrackDisplay'
import Stats from './Stats'
import Graph from './Graph'

const Stage = () => {

  const data = [
    { x: 10, y: 20 },
    { x: 30, y: 40 },
    { x: 50, y: 60 },
    { x: 52, y: 60 },
  ];

  return (
    <div className='flex flex-col items-center bg-sage h-screen'>
        <div className='flex items-center justify-center w-1/5 p-8'>
          <Logo />
        </div>
        <div className='flex'>
          <div className='flex w-1/4'>
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
          <div className='flex flex-col text-center h-1/2 w-1/3'>
            <TrackDisplay/>
          </div>

        </div>
        <div className='flex'>
        </div>
    </div>
  )
}

export default Stage
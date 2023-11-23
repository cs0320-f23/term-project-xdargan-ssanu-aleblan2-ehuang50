import React from 'react'
import Logo from './Logo'
import SongBox from './SongBox'
import TrackDisplay from './TrackDisplay'

const Stage = () => {
  return (
    <div className='flex flex-col items-center bg-sage h-screen'>
        <div className='flex items-center justify-center w-1/5 p-8'>
          <Logo />
        </div>
        <div className='flex text-center h-1/2 w-1/3'>
          <TrackDisplay/>
        </div>
        <div className='flex'>
        </div>
    </div>
  )
}

export default Stage
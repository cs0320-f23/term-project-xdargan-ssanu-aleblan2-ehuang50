import React from 'react'

const SongBox = ({ url, title, artist }) => {
  return (
    <div className='flex items-center font-gotham border border-dksage bg-beige'>
        <img src={require("../image/lizzymcalpine.jpeg")} className='w-1/5 p-2'/>
        <div className='flex flex-col w-2/3 text-left justify-center text-dksage'>
          <p className='flex text-2xl font-bold items-end'> 
            {title}
          </p>
          <p className='flex text-lg items-center'> 
            {artist}
          </p>
        </div>
        <div>

        </div>
    </div>
  )
}

export default SongBox
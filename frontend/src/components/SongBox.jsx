import React from 'react'

const SongBox = ({ url, title, artist, color }) => {

  return (
    <div className='flex font-gotham border border-dksage bg-beige'>
      <div className='flex p-2'>
        <img src={url} className='w-1/5'/>
        <div className='flex flex-col text-dksage p-4 pt-6'>
          <p className='flex text-2xl font-bold '> 
            {title}
          </p>
          <p className='flex font- text-lg'> 
            {artist}
          </p>
        </div>
        <div className='flex items-center'>
          <div class={`w-8 h-8 bg-${color} border-dksage border-2 rounded-full`}></div>
        </div>
      </div>
    </div>
  )

}

export default SongBox
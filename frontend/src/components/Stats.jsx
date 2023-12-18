import React from 'react'

const Stats = ({att1, att2, mean1, median1, mean2, median2}) => {
  return (
    <div className='flex flex-col text-dksage font-gotham ( border-2 border-dksage bg-beige p-8 )'>
      <div className='font-gotham text-dksage text-xl'>
        <h1 className='font-bold'>{att1}</h1>
        <h1 className='font-regular'>Mean: {mean1}</h1>
        <h1 className='font-regular'>Median: {median1}</h1>
      </div>
      <br />
      <div className='font-gotham text-dksage text-xl'>
        <h1 className='font-bold text-xl'>{att2}</h1>
        <h1 className='font-regular'>Mean: {mean2}</h1>
        <h1 className='font-regular'>Median: {median2}</h1>
      </div>
    </div>
  )
}

export default Stats
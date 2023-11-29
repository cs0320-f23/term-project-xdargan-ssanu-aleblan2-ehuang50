import React from 'react';

const InputBar = () => {

  return (
    <div className='flex text-gotham justify-around p-2'>
        <form>
          <label>
            <input 
            className='bg-beige text-dksage'
            type='text' 
            placeholder='Enter song title...'/>
          </label>
        </form>
        <form>
          <label>
            <input 
            className='bg-beige text-dksage'
            type='text' 
            placeholder='Enter artist...'/>
          </label>
        </form>
    </div>
  )
}

export default InputBar
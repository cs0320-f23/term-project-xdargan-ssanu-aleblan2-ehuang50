import React, {useState} from 'react';

const InputBar = ({onAddSong}) => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');

  const handleAddSong = (e) => {
    e.preventDefault();
    if (title && artist) {
      onAddSong({ title: title, artist: artist });
      setTitle('');
      setArtist('');
    }
  };

  return (
    <div className='flex text-gotham justify-around p-4'>
        <form className="flex flex-col" onSubmit={handleAddSong}>
          <div className='flex flex-col space-y-2'>
            <label>
              <input 
              className='bg-beige text-dksage'
              type='text' 
              placeholder='Enter song title...'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label>
              <input 
              className='bg-beige text-dksage'
              type='text' 
              placeholder='Enter artist...'
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              />
            </label>
            <button type='submit' className='bg-dksage text-white p-1 rounded'>
              Add Song
            </button>
          </div>
        </form>
    </div>
  )
}

export default InputBar
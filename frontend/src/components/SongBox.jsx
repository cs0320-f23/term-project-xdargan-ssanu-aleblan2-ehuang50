import React, {useState} from 'react'

const shortenTitle = (title, maxChars) => {
  if (title.length <= maxChars) {
    return title;
  } else {
    return title.substr(0, maxChars - 3) + '...';
  }
}

const SongBox = ({ url, title, artist, index}) => {

  const [currentColor, setCurrentColor] = useState(0);

  const finalTitle = shortenTitle(title, 23);
  const finalArtist = shortenTitle(artist, 27);

  const generateRandomHexCode = () => {
    const randomColor = Math.floor(Math.random() * 16777215);
    const hexCode = '#' + randomColor.toString(16).padStart(6, '0');
    return hexCode;
  };

  const shuffleColor = () => {
    const randomHexCode = generateRandomHexCode();
    setCurrentColor(randomHexCode);
  };

  return (
    <div className='flex font-gotham border border-dksage bg-beige p-4'>
      <div className='flex w-full'>
        <img src={url} className='w-[100px] square-image-container justify-start'/>
        <div className='flex flex-col text-dksage p-4 pt-6 whitespace-nowrap w-2/3'>
          <p className='flex text-2xl font-bold'> 
            {finalTitle}
          </p>
          <p className='flex text-lg'> 
            {finalArtist}
          </p>
        </div>
        <div className='flex items-center w-full'>
          <button
              className={`w-8 h-8 border-dksage border-2 ml-auto rounded-full`}
              style={{ backgroundColor: currentColor }}
              onClick={shuffleColor}
            ></button>
        </div>
      </div>
    </div>
  )

}

export default SongBox
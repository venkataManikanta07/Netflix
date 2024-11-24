import React from 'react'

export const VideoTitle = ({title, overview}) => {
  return (
    <div>
        <h1 className='pt-36 px-12 text-4xl font-bold'>{title}</h1>
        <p className='px-12 w-1/3 mt-4 text-lg'>{overview}</p>
        <div className='px-12'> 
            <button className='bg-gray-400 text-black text-lg font-black px-4 py-2 mr-3 bg-opacity-50 border rounded-sm'>▶ Play</button>
            <button className='bg-gray-400 text-black text-lg font-black px-4 py-2 mr-3 bg-opacity-50 border rounded-sm'>More Info</button>
        </div>
    </div>
  )
}

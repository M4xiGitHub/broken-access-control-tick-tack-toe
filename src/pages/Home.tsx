import React from 'react'

export default function Home() {
  return (
    <div className='bg-[#1A2238] w-full h-full flex flex-col items-center justify-center gap-6'>
    
      <div className='flex flex-col items-center gap-4 '>
        <h1 className='text-6xl font-extrabold text-white tracking-widest'>
          Welcome to TikTakToe
        </h1>
        <h2 className='text-3xl font-semibold text-white tracking-widest'>
          Play with your friends
        </h2>
        <button className='w-40 h-12 bg-blue-700 text-white font-semibold rounded-lg'>
          Play
        </button>
        </div>
    </div>
  )
}

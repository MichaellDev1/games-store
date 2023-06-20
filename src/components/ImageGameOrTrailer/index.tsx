import Image from 'next/image'
import React from 'react'
import ReactPlayer from 'react-player'
import { BsFillPlayFill } from 'react-icons/bs'

export default function ImageGameOrTrailer({ isStartVideo, moviesGame, movieSelected, dataGame, setStartVideo, handleSelectedMovie }: any) {
  return <div className='flex-[3] flex flex-col w-full h-full'>

    <div className='h-full rounded-xl w-full bg-black relative overflow-hidden'>
      {isStartVideo && moviesGame.length > 0
        ? <ReactPlayer
          url={moviesGame[movieSelected].data.max}
          width='100%'
          height='100%'
          controls
          playing={isStartVideo}
        />
        : <Image
          src={moviesGame[movieSelected]
            ? moviesGame[movieSelected].preview
            : dataGame.background_image
              ? dataGame.background_image
              : ''}
          priority={true}
          alt={moviesGame[movieSelected]
            ? moviesGame[movieSelected].name
            : 'image screeancshot'}
          width={900}
          onClick={() => setStartVideo(true)}
          height={900}
          className='w-full h-full object-cover cursor-pointer' />}

      {!isStartVideo
        && moviesGame.length > 0
        && <div className='absolute z-20 top-0 left-0 right-0 bottom-0 m-auto p-5 text-4xl w-[50px] h-[50px] bg-[#bebdbd42] flex justify-center items-center rounded-full backdrop-blur-sm cursor-pointer' onClick={() => setStartVideo(true)}>
          <span> <BsFillPlayFill /></span>
        </div>}

    </div>
    <div className='flex gap-2 mt-3'>
      {moviesGame.length > 1 && moviesGame.slice(0, 4).map((tra: any, inx: number) => (
        <div
          className={`w-[100px] cursor-pointer border overflow-hidden h-[100px] ${inx == movieSelected ? 'border-neutral-50' : 'border-transparent'} rounded-xl`}
          key={tra.id}
          onClick={() => handleSelectedMovie(inx)}>
          <Image
            src={moviesGame[movieSelected].preview}
            alt={moviesGame[movieSelected].name}
            width={500}
            height={500}
            priority
            className='w-full h-full object-cover' />
        </div>
      ))}
    </div>
  </div>
}

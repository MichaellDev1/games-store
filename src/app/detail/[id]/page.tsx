'use client'
import React, { useEffect, useState } from 'react'
import detailGAme from '@/detailGame.json'
import traillerGAme from '@/trailerGame.json'
import Image from 'next/image'
import ReactPlayer from 'react-player'
import { BsFillPlayFill } from 'react-icons/bs'
import { MdFavoriteBorder } from 'react-icons/md'

const gameLinks = [
  {
    label: 'Description',
    href: 'description'
  },
  {
    label: 'Stores',
    href: 'stores'
  }, {
    label: 'Platforms',
    href: 'platforms'
  }, {
    label: 'Tags',
    href: 'tags'
  }
]

export default function Detail({ params }: any) {
  const [movieSelected, setMovieSelected] = useState(0)
  const [dataGame, setDataGame] = useState<any>()
  const [moviesGame, setMoviesGame] = useState<any>()
  const [dataSelected, setDataSelected] = useState(gameLinks[0].href)
  const [isReadMore, setReadMore] = useState(false)
  const [isStartVideo, setStartVideo] = useState(false)
  const { id } = params

  useEffect(() => {
    setDataGame(detailGAme)
    setMoviesGame(traillerGAme)

    console.log(detailGAme)
  }, [id])

  const handleSelectedMovie = (inx: number) =>
    setMovieSelected(inx)

  const handleDescriptionSelected = (href: string) =>
    setDataSelected(href)

  const handleReadMore = () =>
    setReadMore(!isReadMore)

  return (
    <section>
      {dataGame && <React.Fragment>
        <div className='flex flex-row items-center h-[500px] gap-5'>
          <div className='flex-[3] flex flex-col w-full h-full'>
            {moviesGame && <React.Fragment>
              <div className='h-full rounded-xl w-full bg-black relative overflow-hidden'>
                {isStartVideo
                  ? <ReactPlayer
                    url={moviesGame[movieSelected].data.max}
                    width='100%'
                    height='100%'
                    controls
                    playing={isStartVideo}
                  />
                  : <Image
                    src={moviesGame[movieSelected].preview}
                    alt={moviesGame[movieSelected].name}
                    width={500}
                    onClick={() => setStartVideo(true)}
                    height={500}
                    className='w-full h-full object-cover cursor-pointer' />}

                {!isStartVideo && <div className='absolute z-20 top-0 left-0 right-0 bottom-0 m-auto p-5 text-4xl w-[50px] h-[50px] bg-[#bebdbd42] flex justify-center items-center rounded-full backdrop-blur-sm cursor-pointer' onClick={() => setStartVideo(true)}>
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
                      className='w-full h-full object-cover' />
                  </div>
                ))}
              </div>
            </React.Fragment>}
          </div>

          <div className='flex-1 bg-[#202020] h-full rounded-xl flex flex-col justify-between p-8'>
            <div>
              <h2 className='text-xl font-medium'>{dataGame.name}</h2>
              <ul className='flex items-center gap-5 flex-wrap my-3'>
                {detailGAme.genres.map(res => (
                  <li key={res.id}>{res.name}</li>
                ))}
              </ul>
            </div>
            <div className='mt-5 flex flex-col gap-6'>
              <div className='w-full flex justify-between items-center'>
                <span>Rating:</span>
                <span>{detailGAme.rating}</span>
              </div>
              <div className='w-full flex justify-between items-center'>
                <span>Release date:</span>
                <span>{detailGAme.released}</span>
              </div>
              <div className='w-full flex justify-between items-center'>
                <span>Developers:</span>
                <ul>{detailGAme.developers.length > 0 ? (
                  detailGAme.developers.map(res => (
                    <li key={res.id}>{res.name}</li>
                  ))
                ) : <li key={detailGAme.developers[0].id}>{detailGAme.developers[0].name}</li>}</ul>
              </div>
            </div>

            <div className='w-full text-center'>
              <button className='py-3 px-5 w-full rounded-2xl bg-[--color-gradient] hover:bg-[#ff8d58] transition-all'>
                <MdFavoriteBorder />
                Add Favorites</button>
            </div>
          </div>
        </div>
        <div className='w-full mt-20'>
          <ul className='flex gap-10 items-center'>
            {gameLinks.map(({ label, href }: { label: string, href: string }) => (
              <li key={href} className='relative cursor-pointer' onClick={() => handleDescriptionSelected(href)}>
                {label}
                {href == dataSelected && <span className='w-[70%] m-auto right-0 h-[2px] bg-[var(--color-gradient)] absolute -bottom-[4px] rounded-2xl left-0' style={{ boxShadow: '0px 5px 10px #ff6b27' }}></span>}
              </li>
            ))}
          </ul>

          <div className='mt-10'>
            {dataSelected === gameLinks[0].href && <p className='font-light max-w-[700px] text-sm'>{dataGame.description_raw.split('').slice(0, isReadMore ? dataGame.description_raw.length : 300).map((res: any) => res)}...<button className='text-[var(--color-gradient)] ml-3 text-sm' onClick={handleReadMore}>{isReadMore ? 'Read less' : 'Read more'}</button></p>}
          </div>
        </div>
      </React.Fragment>
      }
    </section >
  )
}

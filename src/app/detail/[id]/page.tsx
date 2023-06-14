'use client'
import React, { useEffect, useState } from 'react'
import detailGAme from '@/detailGame.json'
import traillerGAme from '@/trailerGame.json'
import Image from 'next/image'

const gameLinks = [
  {
    label: 'Description',
    href: 'description'
  },
  {
    label: 'Time',
    href: 'time'
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
  const { id } = params

  useEffect(() => {
    setDataGame(detailGAme)
    setMoviesGame(traillerGAme)
  }, [id])

  const handleSelectedMovie = (inx: number) =>
    setMovieSelected(inx)

  const handleDescriptionSelected = (href: string) =>
    setDataSelected(href)

  return (
    <section>
      {moviesGame && dataGame && <React.Fragment>
        <div className='flex flex-row items-center h-[500px] gap-5'>
          <div className='flex-[3] flex flex-col w-full h-full'>

            <div className='bg-slate-700 h-full rounded-xl w-full relative overflow-hidden'>
              <Image
                src={moviesGame[movieSelected].preview}
                alt={moviesGame[movieSelected].name}
                width={500}
                height={500}
                className='w-full h-full object-cover' />
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
          </div>

          <div className='flex-1 bg-[#202020] h-full rounded-xl p-8'>
            <h2 className='text-xl font-medium'>{dataGame.name}</h2>
          </div>
        </div>
        <div className='w-full mt-20'>
          {/* <p className='font-light max-w-[700px] text-xs'>{detailGAme.description_raw.split('').slice(0, 300).map(res => res)}... 
          <button className='text-[var(--color-gradient)] ml-3 text-sm'>Read more</button></p> */}
          <ul className='flex gap-10 items-center'>
            {gameLinks.map(({ label, href }: { label: string, href: string }) => (
              <li key={href} className='relative cursor-pointer' onClick={() => handleDescriptionSelected(href)}>
                {label}
                {href == dataSelected && <span className='w-[70%] m-auto right-0 h-[2px] bg-[var(--color-gradient)] absolute -bottom-[4px] rounded-2xl left-0' style={{ boxShadow: '0px 5px 10px #ff6b27' }}></span>}
              </li>
            ))}
          </ul>
        </div>
      </React.Fragment>
      }
    </section >
  )
}

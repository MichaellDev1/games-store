'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import ReactPlayer from 'react-player'
import { BsFillPlayFill } from 'react-icons/bs'
import { MdFavoriteBorder, MdOutlineFavorite } from 'react-icons/md'
import Link from 'next/link'
import Carrousel from '@/components/Carrousel'
import { getGame } from '@/services/getGame'
import Spinner from '@/components/Spinner'
import useFavorite from '@/hooks/useFavorite'

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
  const { handleFavorite, isFavorite, setIsFavorite } = useFavorite()
  const [movieSelected, setMovieSelected] = useState(0)
  const [dataGame, setDataGame] = useState<any>()
  const [dataSelected, setDataSelected] = useState(gameLinks[0].href)
  const [isReadMore, setReadMore] = useState(false)
  const [isStartVideo, setStartVideo] = useState(false)
  const [moviesGame, setMoviesGame] = useState<Array<any>>([])
  const [screeanShotGame, setScreeanShot] = useState<Array<any>>([])

  const { id } = params

  useEffect(() => {
    const local = JSON.stringify(localStorage.getItem('favorites'))

    getGame.getDetailGame(id)
      .then((detail: any) => {
        setDataGame(detail)

        if (local) {
          local.includes(detail.id)
            ? setIsFavorite(true)
            : setIsFavorite(false)
        }

        detail.movies_count > 0
          && getGame.getTrailerGame(id)
            .then((traillers: any) => {
              setMoviesGame(traillers.results)
            })

        detail.screenshots_count > 0
          && getGame.getScreeanShot(id)
            .then(screean => {
              setScreeanShot(screean.results)
            })
      })


  }, [id])

  const handleSelectedMovie = (inx: number) =>
    setMovieSelected(inx)

  const handleDescriptionSelected = (href: string) =>
    setDataSelected(href)

  const handleReadMore = () =>
    setReadMore(!isReadMore)


  return dataGame ? <section>
    {dataGame && <React.Fragment>
      <div className='flex flex-row items-center h-[500px] gap-5'>
        <div className='flex-[3] flex flex-col w-full h-full'>

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
                  : dataGame
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

        <div className='flex-1 bg-[#202020] h-full rounded-xl flex flex-col justify-between p-8'>
          <div>
            <h2 className='text-xl font-medium'>{dataGame.name}</h2>
            <ul className='flex items-center gap-5 flex-wrap my-3'>
              {dataGame.genres.map((res: any) => (
                <li key={res.id}>{res.name}</li>
              ))}
            </ul>
          </div>
          <div className='mt-5 flex flex-col gap-6'>
            <div className='w-full flex justify-between items-center'>
              <span>Rating:</span>
              <span>{dataGame.rating}</span>
            </div>
            <div className='w-full flex justify-between items-center'>
              <span>Release date:</span>
              <span>{dataGame.released}</span>
            </div>
            <div className='w-full flex justify-between items-center'>
              <span>Developers:</span>
              <ul>{dataGame.developers.length > 0 ? (
                dataGame.developers.map((res: any) => (
                  <li key={res.id}>{res.name}</li>
                ))
              ) : <li key={dataGame.developers[0].id}>{dataGame.developers[0].name}</li>}</ul>
            </div>
          </div>

          <div className='w-full text-center'>
            <button className='py-3 px-5 w-full flex items-center justify-center rounded-2xl bg-[--color-gradient] hover:bg-[#ff8d58] transition-all text-sm gap-2' onClick={() => handleFavorite(dataGame.id)}>
              <span className='text-lg'>
                {isFavorite ? <MdOutlineFavorite /> : <MdFavoriteBorder />}
              </span>
              Add Favorites
            </button>
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

        <div className='mt-10 '>
          {dataSelected === gameLinks[0].href && (
            <p className='font-light text-sm'>
              {dataGame.description_raw.split('').slice(0, isReadMore ? dataGame.description_raw.length : 300).map((res: any) => res)}...{dataGame.description_raw.length > 300 
                && <button className='text-[var(--color-gradient)] ml-3 text-sm' onClick={handleReadMore}>
                  {isReadMore ? 'Read less' : 'Read more'}
                </button>}
            </p>
          )}

          {dataSelected == gameLinks[2].href && <ul className='flex items-center gap-12 flex-wrap'>

            {
               dataGame.platforms.map(plataform => (
                <li key={plataform.platform.id} className='flex flex-col'>
                  <span>{plataform.platform.name}</span>
                </li>
              ))
            }

          </ul>}


          {dataSelected == gameLinks[1].href && <ul className='flex items-center gap-12 flex-wrap'>
            {
              dataGame.stores.map((store: any) => (
                <li key={store.id}>
                  <Link href={store.store.domain}>{store.store.name}</Link>
                </li>
              ))
            }
          </ul>}

          {dataSelected == gameLinks[3].href && <ul className='flex items-center gap-12 flex-wrap'>
            {
              dataGame.tags.map((tag) => (
                <li key={tag.id}>
                  <span>{tag.name}</span>
                </li>
              ))
            }
          </ul>}
        </div>

      </div>
      <section className='w-full mt-20'>
        {
          screeanShotGame.length > 0 && <Carrousel title='Screenshots'>
            {
              screeanShotGame.map((screenshot) => (
                <li className={`flex-shrink-0 overflow-hidden outline-none relative rounded-[5px] list-none w-[300px] h-full`} key={screenshot.id}>
                  <Image src={screenshot.image} alt={`image screeanshot`} height={400} width={400} className='w-full h-full object-cover' />
                </li>
              ))
            }
          </Carrousel>
        }
      </section>
    </React.Fragment>
    }
  </section > : <div className='min-h-[80vh] flex justify-center items-center'>
    <Spinner />
  </div>
}

'use client'
import React, { useEffect, useState } from 'react'
import { getGame } from '@/services/getGame'
import Spinner from '@/components/Spinner'
import useFavorite from '@/hooks/useFavorite'
import DetailInfo from '@/components/DetailInfo'
import ImageGameOrTrailer from '@/components/ImageGameOrTrailer'
import AllDetailGame from '@/components/AllDetailGame'
import SectionScreanShots from '@/components/SectionScreanshots'


export default function Detail({ params }: any) {
  const { handleFavorite, isFavorite, setIsFavorite } = useFavorite()
  const [movieSelected, setMovieSelected] = useState(0)
  const [dataGame, setDataGame] = useState<any>()
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
        <ImageGameOrTrailer
          dataGame={dataGame}
          handleSelectedMovie={handleSelectedMovie}
          isStartVideo={isStartVideo}
          movieSelected={movieSelected}
          moviesGame={moviesGame}
          setStartVideo={setStartVideo} />

        <DetailInfo
          dataGame={dataGame}
          handleFavorite={handleFavorite}
          isFavorite={isFavorite} />
      </div>
      <AllDetailGame
        dataGame={dataGame}
        handleReadMore={handleReadMore}
        isReadMore={isReadMore} />

      <SectionScreanShots
        screeanShotGame={screeanShotGame} />

    </React.Fragment>
    }
  </section >
    : <div className='min-h-[80vh] flex justify-center items-center'>
      <Spinner />
    </div>
}

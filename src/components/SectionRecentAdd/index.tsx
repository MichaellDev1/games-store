'use client'
import React, { useEffect, useState } from 'react'
import CarrouselOne from './CarrouselOne'
import { getGame } from '@/services/getGame'
import { LuGamepad2 } from 'react-icons/lu'
import CardGenre from './CardGenre'


export default function SectionRecentAdd() {
  const [genres, setGenres] = useState<Array<any>>([])

  useEffect(() => {
    getGame.getAllGenres()
      .then((res: any) => {
        setGenres(res.results.slice(0, 3))
      })
  }, [])

  return (
    <section className='min-h-[30px] w-full' >
      <CarrouselOne title='Recomendado' page={30} size={30} />

      <div className='min-h-[400px] w-full flex flex-col justify-center mt-24'>
        <h3 className="text-2xl font-medium flex items-center gap-3 mb-5">
          <span className="text-4xl"><LuGamepad2 /></span>
          Your best genres are here
        </h3>
        {
          genres.length > 0 && <div className='flex gap-4 mt-5'>
            {
              genres.map(genre => <CardGenre
                key={genre.id}
                image_background={genre.image_background}
                name={genre.name}
                slug={genre.slug} />)
            }
          </div>
        }
      </div>

      <CarrouselOne title='Action' page={40} size={30} />
      <CarrouselOne title='Aventure' page={50} size={30} />
    </section>
  )
}

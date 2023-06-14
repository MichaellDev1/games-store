import React, { useState, useEffect } from 'react'
import jsonX from '@/games.json'
import Carrousel from '../Carrousel'
import Image from 'next/image'
import Link from 'next/link'

export default function SectionOffers() {
  const [games, setGames] = useState<Array<any>>([])

  useEffect(() => {
    setGames(jsonX)
  }, [])

  return (
    <section className='mt-5'>
      <Carrousel title='Special offers'>
        <div className='h-[100%] flex-shrink-0 w-[330px] outline-none overflow-hidden relative rounded-[5px]'>
          <Image src={games[0]?.background_image} alt={`image background game ${games[0]?.name}`} width={900} height={900} className='w-full h-full object-cover' />
        </div>
        {
          games.slice(1, games.length).map((game: any) => (
            <Link 
              href={`/detail/${game.id}`} 
              key={game.id} 
              className='h-[100%] flex-shrink-0 overflow-hidden w-[190px] outline-none relative rounded-[10px]'>
              <Image 
                src={game.background_image} 
                alt={`image background game ${game.name}`} 
                width={900} 
                height={900} 
                className='w-full h-full object-cover' />
            </Link>
          ))
        }
      </Carrousel>
    </section>
  )
}
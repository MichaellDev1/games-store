import React, { useState, useEffect } from 'react'
import jsonX from '@/games.json'
import Carrousel from '../Carrousel'
import Image from 'next/image'
import Link from 'next/link'
import ChildrenCarrousel from '../ChildrenCarrousel'

export default function SectionOffers() {
  const [games, setGames] = useState<Array<any>>([])

  useEffect(() => {
    setGames(jsonX)
  }, [])

  return (
    <section className='mt-5'>
      <Carrousel title='Special offers'>
        {games.length > 0 && <>
          <ChildrenCarrousel background_image={games[0]?.background_image} id={games[0].id} width='330px' name={games[0].name} />
          {
            games.slice(1, games.length).map((game: any) => (
              <ChildrenCarrousel
                key={game.id}
                background_image={game.background_image}
                id={game.id}
                name={game.name}
                width='190px' />
            ))
          }
        </>}
      </Carrousel>
    </section>
  )
}
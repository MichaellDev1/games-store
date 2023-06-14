'use client'
import React, { useEffect, useState } from 'react'
import Carrousel from '../Carrousel'
import recentAdd from '@/mejoresGames.json'
import ChildrenCarrousel from '../ChildrenCarrousel'

export default function SectionRecentAdd() {
  const [games, setGames] = useState<Array<any>>([])

  useEffect(() => {
    setGames(recentAdd)
  }, [])

  return (
    <section>
      <Carrousel title='Recently added'>
        <ChildrenCarrousel background_image={games[0]?.background_image} id={games[0].id} width='330px' name={games[0].name} />
        {games.slice(1, games.length).map((game: any) => (
          <ChildrenCarrousel key={game.id} background_image={game.background_image} id={game.id} name={game.name} width='190px' />))}
      </Carrousel>
    </section>
  )
}

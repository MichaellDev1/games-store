'use client'
import React, { useEffect, useState } from 'react'
import Carrousel from '../Carrousel'
import ChildrenCarrousel from '../ChildrenCarrousel'
import useNearScreen from '@/hooks/useNearScreen'
import { getGame } from '@/services/getGame'

export default function SectionRecentAdd() {
  const [games, setGames] = useState<Array<any>>([])
  const { isNear, refEle } = useNearScreen({ rootMargin: '300px' })

  useEffect(() => {
    if (isNear) {
      getGame.getAllGames({ page: 40, size: 30 })
        .then((data: any) => {
          setGames(data.results)
        })
    }
  }, [isNear])

  return (
    <section className='min-h-[30px] w-full' ref={refEle}>
      {isNear && <Carrousel title='Recently added'>
        {games.length > 0 && <>
          <ChildrenCarrousel background_image={games[0]?.background_image} id={games[0].id} width='330px' name={games[0].name} />
          {games.slice(1, games.length).map((game: any) => (
            <ChildrenCarrousel key={game.id} background_image={game.background_image} id={game.id} name={game.name} width='190px' />))}
        </>}
      </Carrousel>}

      <div className='mt-32'>
        {isNear && <Carrousel title='Recommendation'>
          {games.length > 0 && <>
            <ChildrenCarrousel background_image={games[0]?.background_image} id={games[0].id} width='330px' name={games[0].name} />
            {games.slice(1, games.length).map((game: any) => (
              <ChildrenCarrousel key={game.id} background_image={game.background_image} id={game.id} name={game.name} width='190px' />))}
          </>}
        </Carrousel>}
      </div>
    </section>
  )
}

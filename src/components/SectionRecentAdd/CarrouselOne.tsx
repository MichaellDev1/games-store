'use client'
import React, { useEffect, useState } from 'react'
import Carrousel from '../Carrousel'
import ChildrenCarrousel from '../ChildrenCarrousel'
import useNearScreen from '@/hooks/useNearScreen'
import { getGame } from '@/services/getGame'

export default function CarrouselOne({ title, page, size }: any) {
  const [games, setGames] = useState<Array<any>>([])
  const { isNear, refEle } = useNearScreen({ rootMargin: '30px' })

  useEffect(() => {
    if (isNear) {
      getGame.getAllGames({ page, size })
        .then((data: any) => {
          setGames(data.results)
        })
    }
  }, [isNear, page, size])

  return <div className='mt-24 min-h-[300px]' ref={refEle}>
    {isNear && <Carrousel title={title}>
      {games.length > 0 && <>
        <ChildrenCarrousel background_image={games[0]?.background_image} id={games[0].id} width='330px' name={games[0].name} />
        {games.slice(1, games.length).map((game: any) => (
          <ChildrenCarrousel key={game.id} background_image={game.background_image} id={game.id} name={game.name} width='190px' />))}
      </>}
    </Carrousel>}
  </div>
}

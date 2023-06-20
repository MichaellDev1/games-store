'use client'
import { getGame } from '@/services/getGame'
import Link from 'next/link'
import React, { Suspense, useEffect, useState } from 'react'
const CardPreView = React.lazy(() => import('@/components/CardPreView/index'))

interface Props {
  keywordDebounce: string
  keyword: string
}

export default function MenuSearchChange({ keywordDebounce, keyword = '' }: Props) {
  const [games, setGames] = useState<Array<any>>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (keyword !== '') {
      getGame.searchGame({ keyword: keywordDebounce, page: 1, size: 4, isRecent: false, date: null, genrer: [], platform: [] })
        .then((data: any) => {
          setGames(data.results)
          setLoading(true)
        })
    }
  }, [keywordDebounce])

  useEffect(() => {
    if (!loading) {
      setLoading(true)
    }
  }, [keyword])


  return (
    <div className='w-full  bg-neutral-800 border-neutral-600 border absolute z-10 overflow-hidden rounded-lg flex-col  top-12 backdrop-blur-sm menu-preview hidden shadow-xl '>
      {
        games.length > 0
          ? games.map((game, inx) => (
            <Suspense key={game.id} fallback={<div className='w-full py-4 bg-neutral-800'></div>}>
              <CardPreView
                background_image={game.background_image}
                id={game.id}
                name={game.name}
              />
            </Suspense>
          )) : loading
            ? <h3 className='text-xs font-normal p-5'>Loading...</h3>
            : <p className='px-5'>No se ha encontrado resultado para la busqueda...</p>
      }
      {games.length > 0 &&
        <Link href={`/search/${keyword}`} className='text-sm font-normal  hover:bg-neutral-600 py-5 transition-all px-5'>View more</Link>}
    </div>
  )
}

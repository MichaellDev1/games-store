"use client"
import Spinner from '@/components/Spinner';
import { getGame } from '@/services/getGame';
import React, { Suspense, useEffect, useState } from 'react'
const CardSearch = React.lazy(() => import('@/components/CardSearch'))

export default function Favorites() {
  const [favorites, setFavorites] = useState<Array<any>>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem('favorites'))
    if (local) {
      const dataFavorites = local.map((id: any) => {
        setLoading(true)
        return getGame.getDetailGame(id)
          .then(data => {
            return { ...data }
          })
      });

      Promise.all(dataFavorites)
        .then(res => {
          setLoading(false)
          setFavorites(res)
        })
    }
  }, [])

  const handleFavoriteDesible = (id: string) => {
    const deleteFavorite = favorites.filter(game => game.id !== id)
    setFavorites(deleteFavorite)
  }

  return (
    <div className='min-h-[100vh]'>
      <h2 className='mb-5 font-medium text-xl'>Your favorite:</h2>
      {
        loading
          ? <div className='w-full min-h-[65vh] flex justify-center items-center'><Spinner /> </div>
          : favorites.length == 0
            ? <h2>Aun no tienes favoritos agregados...</h2>
            : <div className='flex flex-wrap gap-4'>
              {
                favorites.map(data => <Suspense key={data.id} fallback={<div className='w-[180px] bg-neutral-600 relative rounded-md h-[300px]'></div>}>
                  <CardSearch
                    background_image={data.background_image}
                    id={data.id}
                    name={data.name} 
                    handleFavoriteDesible={handleFavoriteDesible}/>
                </Suspense>)
              }
            </div>
      }
    </div>
  )
}

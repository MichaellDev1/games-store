import React, { Suspense } from 'react'
const CardSearch = React.lazy(() => import('@/components/CardSearch/index'))

export default function ListGameSearch({ games }: { games: any }) {
  return (
    <ul className='w-full flex flex-wrap gap-4 min-h-[100vh]'>
      {
        games.length > 0 && games.map((game: any) => (
          <Suspense key={`${game.id}${game.name}${game.slug}`} fallback={<div className='w-[180px] bg-neutral-600 relative rounded-md h-[300px]'></div>}>
            <CardSearch
              background_image={game.background_image}
              id={game.id}
              name={game.name} />
          </Suspense>
        ))
      }
    </ul>
  )
}
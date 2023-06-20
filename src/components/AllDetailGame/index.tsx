import Link from 'next/link'
import React from 'react'

export default function AllDetailGame({ dataGame, isReadMore, handleReadMore }) {
  return <div className='w-full mt-20'>
    <div className='mt-10 flex flex-col gap-16'>
      {/* description */}
      <div>
        <h3 className='text-3xl font-medium mb-4'>Description</h3>
        <p className='font-light text-sm'>
          {dataGame.description_raw.split('').slice(0, isReadMore ? dataGame.description_raw.length : 300).map((res: any) => res)}...{dataGame.description_raw.length > 300
            && <button className='text-[var(--color-gradient)] ml-3 text-sm' onClick={handleReadMore}>
              {isReadMore ? 'Read less' : 'Read more'}
            </button>}
        </p>
      </div>

      {/* platform */}
      <div>
        <h3 className='text-3xl font-medium mb-4'>Platforms</h3>
        <ul className='flex items-center gap-12 flex-wrap'>
          {
            dataGame.platforms.map((plataform: any) => (
              <li key={plataform.platform.id} className='flex flex-col'>
                <span>{plataform.platform.name}</span>
              </li>
            ))
          }
        </ul>
      </div>

      {/* Stores */}
      <div>
        <h3 className='text-3xl font-medium mb-4'>Stores</h3>
        <ul className='flex items-center gap-12 flex-wrap'>
          {
            dataGame.stores.map((store: any) => (
              <li key={store.id}>
                <Link href={store.store.domain}>{store.store.name}</Link>
              </li>
            ))
          }
        </ul>
      </div>
      {/* Tags */}
      <div>
        <h3 className='text-3xl font-medium mb-4'>Tags</h3>
        <ul className='flex items-center gap-12 flex-wrap'>
          {
            dataGame.tags.map((tag: any) => (
              <li key={tag.id}>
                <span>{tag.name}</span>
              </li>
            ))
          }
        </ul>
      </div>
    </div>

  </div>
}

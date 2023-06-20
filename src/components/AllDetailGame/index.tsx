import Link from 'next/link'
import React from 'react'

export default function AllDetailGame({ dataGame, isReadMore, handleReadMore }: any) {
  return <div className='w-full mt-20'>
    <div className='mt-10 flex flex-col gap-16'>
      {/* description */}
      <div>
        <h3 className='text-[23px] font-medium mb-4'>Description</h3>
        <p className='font-light text-base text-neutral-300'>
          {dataGame.description_raw && dataGame.description_raw.split('').slice(0, isReadMore ? dataGame.description_raw.length : dataGame.description_raw.length > 300 ? 300 : dataGame.description_raw.length).map((res: any) => res)}...{dataGame.description_raw.length > 300
            && <button className='ml-3 font-normal text-base text-white' onClick={handleReadMore}>
              {isReadMore ? 'Read Less' : 'Read More'}
            </button>}
        </p>
      </div>

      {/* platform */}
      <div>
        <h3 className='text-[23px] font-medium mb-4'>Platforms</h3>
        <ul className='flex items-center gap-5 text-neutral-300 flex-wrap'>
          {
            dataGame.platforms.map((plataform: any) => (
              <li key={plataform.platform.id} className='flex flex-col text-sm font-normal'>
                <span>{plataform.platform.name}</span>
              </li>
            ))
          }
        </ul>
      </div>

      {/* Stores */}
      <div>
        <h3 className='text-[23px] font-medium mb-4'>Stores</h3>
        <ul className='flex items-center gap-5 text-neutral-300 flex-wrap'>
          {
            dataGame.stores.map((store: any) => (
              <li key={store.id} className='text-sm font-normal'>
                <Link href={store.store.domain} style={{ textDecoration: 'underline' }}>{store.store.name}</Link>
              </li>
            ))
          }
        </ul>
      </div>
      {/* Tags */}
      <div>
        <h3 className='text-[23px] font-medium mb-4'>Tags</h3>
        <ul className='flex items-center gap-5 text-neutral-300 flex-wrap'>
          {
            dataGame.tags.map((tag: any) => (
              <li key={tag.id} className='text-sm font-normal'>
                <span>{tag.name}</span>
              </li>
            ))
          }
        </ul>
      </div>
    </div>

  </div>
}

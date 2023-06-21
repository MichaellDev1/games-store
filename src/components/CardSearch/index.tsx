import useFavorite from '@/hooks/useFavorite'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { MdOutlineFavorite, MdFavoriteBorder } from 'react-icons/md'
import './index.css'

function CardSearch({ id, background_image, name, handleFavoriteDesible = null }: any) {
  const { handleFavorite, isFavorite, favorites } = useFavorite()

  return (
    <div className='relative card-search'>
      <button
        className={`absolute button-favorite top-2 right-2 bg-[#00000080] text-base rounded-full p-1 z-10`}
        style={{ opacity: isFavorite ? '1' : '' }}
        onClick={() => {
          handleFavorite(id)
          if (handleFavoriteDesible) handleFavoriteDesible(id)
        }}>
        {isFavorite && favorites.includes(id)
          ? <MdOutlineFavorite />
          : <MdFavoriteBorder />}
      </button>
      <Link href={`/detail/${id}`} className='relative flex flex-col w-[180px]'>
        <div className='h-[250px] rounded-[3px] overflow-hidden relative image-card'>
          <Image alt='game image background' src={background_image ? background_image : 'https://media.rawg.io/media/screenshots/c49/c49be155f1616816863e3305f5c39f0a.jpg'} className='w-full h-full object-cover' width={300} height={300} />
          <div className='info-game w-full h-full bg-[#ffffff1a] absolute top-0 left-0'>

          </div>
        </div>
        <div className='min-h-[30px] mt-3'>
          <h5 className='text-sm'>{name}</h5>
        </div>
      </Link>
    </div>
  )
}

export default React.memo(CardSearch)
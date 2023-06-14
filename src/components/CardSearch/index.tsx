import Image from 'next/image'
import React from 'react'

function CardSearch({ id, background_image, name }: any) {
  return (
    <li className='relative flex flex-col w-[200px]'>
      <div className='h-[250px] rounded-[3px] overflow-hidden relative '>
        <Image alt='game image background' src={background_image ? background_image : ''} className='w-full h-full object-cover' width={400} height={400} />
      </div>
      <div className='min-h-[30px] mt-3'>
        <h5 className='text-sm'>{name}</h5>
      </div>
    </li>
  )
}

export default React.memo(CardSearch)
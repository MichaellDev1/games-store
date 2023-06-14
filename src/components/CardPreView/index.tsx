import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface Props {
  name: string
  id: string
  background_image: string
}

function CardPreview({ name, id, background_image }) {
  return <Link href={`/search/${id}`} className='w-full flex gap-3 items-center'>
    <div className='w-[33px] h-[43px] rounded-sm bg-slate-200 relative overflow-hidden'>
      <Image
        src={background_image ? background_image : 'https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg'}
        alt='image backgrpund'
        width={200}
        height={200}
        className='w-full h-full object-cover' />
    </div>
    <div>
      <span className='text-sm'>{name}</span>
    </div>
  </Link>
}


export default React.memo(CardPreview)
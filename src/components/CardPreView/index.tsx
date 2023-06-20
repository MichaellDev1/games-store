import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface Props {
  name: string
  id: string
  background_image: string
}

function CardPreview({ name, id, background_image }: Props) {
  return <Link href={`/detail/${id}`} className='w-full flex gap-3 items-center py-3 hover:bg-neutral-600 transition-all px-5'>
    <div className='w-[33px] h-[43px] rounded-sm bg-slate-200 relative overflow-hidden'>
      <Image
        src={background_image ? background_image 
        : 'https://www.charlotteathleticclub.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png'}
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
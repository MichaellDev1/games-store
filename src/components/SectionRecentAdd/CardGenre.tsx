import Image from 'next/image'
import React from 'react'

interface Props {
    image_background: string
    slug: string
    name: string
}

export default function CardGenre({ image_background, slug, name }: Props) {
    return <div className='flex-1 rounded-md'>
        <div className='w-full h-[170px] relative rounded-md overflow-hidden'>
            <Image src={image_background} alt={`genre ${slug}`} width={300} height={300} className='w-full h-full object-cover' />
        </div>
        <h3 className='text-[17px] font-normal mt-5'>{name}</h3>
    </div>
}

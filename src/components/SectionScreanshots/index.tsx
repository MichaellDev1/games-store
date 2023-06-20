import Image from 'next/image'
import React from 'react'
import Carrousel from '../Carrousel'

export default function SectionScreanShots({ screeanShotGame }: any) {
  return <section className='w-full mt-20'>
    {
      screeanShotGame.length > 0
      && <Carrousel title=''>
        {
          screeanShotGame.map((screenshot: any) => (
            <li className={`flex-shrink-0 overflow-hidden outline-none relative rounded-[5px] list-none w-[300px] h-full`} key={screenshot.id}>
              <Image src={screenshot.image} alt={`image screeanshot`} height={400} width={400} className='w-full h-full object-cover' />
            </li>
          ))
        }
      </Carrousel>
    }
  </section>
}

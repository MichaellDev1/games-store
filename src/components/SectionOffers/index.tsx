import React, { useRef, useState } from 'react'
import jsonX from '@/games.json'
import { useEffect } from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import Image from 'next/image'
import Link from 'next/link'

export default function SectionOffers() {
  const [games, setGames] = useState([])
  const refCarrousel: React.LegacyRef<HTMLDivElement> | null = useRef(null)
  const refBtnLeft: React.LegacyRef<HTMLDivElement> | null = useRef(null)
  const refBtnRight: React.LegacyRef<HTMLDivElement> | null = useRef(null)
  const [num, setNum] = useState<number>(0)

  useEffect(() => {
    setGames(jsonX)
    console.log(jsonX)
  }, [])


  const handleScrollBtn = (scrollLeft: boolean = false) => {
    if (refCarrousel.current) {
      const element = refCarrousel.current

      scrollLeft
        ? element.scrollLeft -= element.scrollLeft <= 0
          ? 0
          : element.clientWidth
        : element.scrollLeft += element.scrollLeft >= element.scrollWidth
          ? 0
          : element.clientWidth
    }
  }

  return (
    <section className='mt-5'>
      <div className='w-full mb-3 flex justify-between'>
        <h3 className='text-base font-normal'>Special offers</h3>
        <div className='flex items-center gap-2'>
          <div ref={refBtnLeft} className='relative '>
            <button className='w-[30px] h-[30px] cursor-pointer outline-nones items-center justify-center flex rounded-full bg-[#202020] rotate-180 text-base border-none text-white' onClick={() => handleScrollBtn(true)} style={{ boxShadow: '0px 1px 4px rgba(0,0,0,.1607843137)' }}>
              <IoIosArrowForward />
            </button>
          </div>
          <div ref={refBtnRight} className='relative flex justify-center'>
            <button className='w-[30px] h-[30px] cursor-pointer outline-nones items-center text-base justify-center text-white flex rounded-full  bg-[#202020] border-none' onClick={() => handleScrollBtn(false)} style={{ boxShadow: '0px 1px 4px rgba(0,0,0,.1607843137)' }}><IoIosArrowForward />
            </button>
          </div>
        </div>
      </div>

      <div className='w-full overflow-hidden h-[280px] mb-[5px] box-border relative' >
        <div className='relative carrousel overflow-y-hidden h-full overflow-x-hidden scroll-smooth' ref={refCarrousel}>
          <section className='flex gap-[15px] h-full items-center'>
            <div className='h-[100%] flex-shrink-0 w-[330px] outline-none overflow-hidden relative rounded-[15px]'>
            <Image src={games[0]?.background_image} alt={`image background game ${games[0]?.name}`} width={900} height={900} className='w-full h-full object-cover'/>
            </div>

            {
              games.slice(1, games.length).map((game: any) => (
                <Link href={`/detail/${game.id}`} key={game.id} className='h-[100%] flex-shrink-0 overflow-hidden w-[190px] outline-none relative rounded-[15px]'>
                  <Image src={game.background_image} alt={`image background game ${game.name}`} width={900} height={900} className='w-full h-full object-cover'/>
                </Link>
              ))
            }
          </section>
        </div>
      </div>
    </section>
  )
}
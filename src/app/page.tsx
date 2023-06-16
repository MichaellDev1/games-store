'use client'
import { useEffect, useState } from "react"
import jsonGames from '@/games.json'
import Hero from '@/components/Hero'
import SectionOffers from '@/components/SectionOffers'
import SectionRecentAdd from "@/components/SectionRecentAdd"
import Image from "next/image"
import { TfiGift } from 'react-icons/tfi'
import Link from "next/link"

export default function Home() {
  const [games, setGames] = useState<any>([])
  const [num, setNum] = useState<number>(0)

  useEffect(() => {
    setGames(jsonGames)
  }, [])


  const handleChangeHero = (inx: number): void => {
    setNum(inx)
  }

  return (
    <section>
      <Hero games={games[num]} handleChangeHero={handleChangeHero} num={num} />
      <SectionOffers />
      <section className="my-20 relative">
        <div className="w-full">
          <h3 className="text-2xl font-medium flex items-center gap-3 mb-5">
            <span className="text-4xl"><TfiGift /></span>
            Free Games
          </h3>
          <div className="flex items-center gap-5 justify-center">

            {games.length > 0 && <>
              <Link href={`/detail/${games[14].id}`} className="flex flex-col">
                <div className="flex-1 h-[200px] rounded-[5px] relative overflow-hidden">
                  <Image src={games[14].background_image} alt={'game free'} width={600} height={600} className="w-full h-full object-cover" />
                  <div className="absolute bg-[#0078F2] uppercase font-medium py-[2px] text-sm text-center bottom-0 w-full left-0">Free now</div>
                </div>
                <h4 className="mt-5 font-normal text-base">{games[14].name}</h4>
              </Link>


              <Link href={`/detail/${games[11].id}`} className="flex flex-col">
                <div className="flex-1 h-[200px] rounded-[5px] overflow-hidden relative">
                  <Image src={games[11].background_image} alt={'game free'} width={600} height={600} className="w-full h-full object-cover" />
                  <div className="absolute bg-[#0078F2] uppercase font-medium py-[2px] text-sm text-center bottom-0 w-full left-0">Free now</div>
                </div>
                <h4 className="mt-5 font-normal text-base">{games[11].name}</h4>
              </Link>


              <Link href={`/detail/${games[15].id}`} className="flex flex-col">
                <div className="flex-1 h-[200px] rounded-[5px] overflow-hidden relative">
                  <Image src={games[15].background_image} alt={'game free'} width={600} height={600} className="w-full h-full object-cover" />
                  <div className="absolute bg-[#000000] uppercase font-medium py-[2px] text-sm text-center bottom-0 w-full left-0">Soon</div>
                </div>
                <h4 className="mt-5 font-normal text-base">{games[15].name}</h4>
              </Link>
            </>
            }
          </div>
        </div>
      </section>
      <SectionRecentAdd />
    </section>
  )
}
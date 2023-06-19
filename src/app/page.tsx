'use client'
import React, { Suspense, useEffect, useState } from "react"
const Hero = React.lazy(() => import('@/components/Hero'))
import SectionOffers from '@/components/SectionOffers'
import SectionRecentAdd from "@/components/SectionRecentAdd"
import FreeGameSection from "@/components/FreeGameSection"
import { getGame } from "@/services/getGame"

export default function Home() {
  const [games, setGames] = useState<any>([])
  const [num, setNum] = useState<number>(0)

  useEffect(() => {
    getGame.getAllGames({ page: 1, size: 20 })
      .then((data: any) => {
        setGames(data.results)
      })
  }, [])

  const handleChangeHero = (inx: number): void => setNum(inx)

  return (
    <section>
      <Suspense fallback={<div className="w-full min-h-[400px] bg-neutral-800 relative"></div>}>
        <Hero games={games[num]} handleChangeHero={handleChangeHero} num={num} />
      </Suspense>
      <SectionOffers />
      <FreeGameSection games={games} />
      <SectionRecentAdd />
    </section>
  )
}
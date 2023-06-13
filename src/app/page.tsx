'use client'
import { useEffect, useState } from "react"
import GradientRounded from '@/components/GradientRounded'
import jsonGames from '@/games.json'
import Hero from '@/components/Hero'
import SectionOffers from '@/components/SectionOffers'

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
      <GradientRounded />
      <Hero games={games[num]} handleChangeHero={handleChangeHero} num={num} />
      <SectionOffers />
    </section>
  )
}
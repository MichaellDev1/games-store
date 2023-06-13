'use client'
import GradientRounded from '@/components/GradientRounded'
import Menu from '@/components/Menu'
import jsonGames from '@/games.json'
import { useEffect, useState } from "react"
import Hero from '@/components/Hero'
import SectionOffers from '@/components/SectionOffers'
import Header from '@/components/Header'

export default function Home() {
  const [games, setGames] = useState([])
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
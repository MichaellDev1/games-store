'use client'
import GradientRounded from '@/components/GradientRounded'
import Menu from '@/components/Menu'
import jsonGames from '@/games.json'
import { useEffect } from "react"

export default function Home() {

  useEffect(() => {
    console.log(jsonGames)
  }, [])

  return (
    <main className='flex relative'>
      <GradientRounded />
      <Menu menuHidden={true}/>
      <div className=''>

      </div>
    </main>
  )

}
'use client'
import { useEffect, useState } from "react"
import ListGameSearch from '@/components/ListGamesSearch/indext'
import { getGame } from "@/services/getGame"

export default function Search({ params }: any) {
  const { id } = params
  const [games, setGame] = useState<Array<any>>([])

  useEffect(() => {
    getGame.searchGame({ keyword: decodeURI(id), page: 1 }).then(res => {
      setGame(res.results)
    })
  }, [id])

  return (
    <div>
      <div className="text-neutral-500 mb-7 mt-5 text-base font-medium gap-4 flex items-center"><span>Mostrar: </span><button className="text-white">Todos</button></div>

      <ListGameSearch 
        games={games} />
    </div>
  )
}



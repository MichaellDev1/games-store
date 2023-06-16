'use client'
import { useEffect, useState } from "react"
import ListGameSearch from '@/components/ListGamesSearch/indext'
import { getGame } from "@/services/getGame"

export default function Search({ params }: any) {
  const { id } = params
  const [games, setGame] = useState<Array<any>>([])
  const [page, setPage] = useState<number>(1)
  const [totalPage, setTotalPage] = useState<null | number>()

  useEffect(() => {
    getGame.searchGame({ keyword: decodeURI(id), page }).then((res: any) => {
      setGame(lastPage => [...lastPage, ...res.results])
      setTotalPage(Math.floor(res.count / 30))
      console.log(Math.floor(res.count / 30))
    })
  }, [id, page])


  const handleNextPage = () => {
    if (totalPage !== null) {
      console.log('e')
      setPage(lastPage => lastPage + 1)
    }
  }

  return (
    <div>
      <div className="text-neutral-500 mb-7 mt-5 text-base font-medium gap-4 flex items-center"><span>Mostrar: </span><button className="text-white">Todos</button></div>

      <ListGameSearch
        games={games} />

      {totalPage
        && <button className="mt-5 bg-sky-500 text-white text-center" onClick={handleNextPage}>View more</button>}
    </div>
  )
}



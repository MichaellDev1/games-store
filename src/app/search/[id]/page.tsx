'use client'
import { useEffect, useRef, useState } from "react"
import ListGameSearch from '@/components/ListGamesSearch/indext'
import { getGame } from "@/services/getGame"
import { MdKeyboardArrowDown } from 'react-icons/md'
import useNearScreen from "@/hooks/useNearScreen"
import CardFilter from "@/components/CardFilter"

const menuList = [
  {
    label: 'Todos',
    recent: false
  }, {
    label: 'Ultimos lanzamientos',
    recent: true
  }
]

const filterList = [{
  label: 'Genero'
}, {
  label: 'Plataforma'
}]

export default function Search({ params }: any) {
  const { id } = params
  const [games, setGame] = useState<Array<any>>([])
  const [page, setPage] = useState<number>(1)
  const [totalPage, setTotalPage] = useState<number>(0)
  const [showMenu, setShowMenu] = useState(false)
  const [loading, setLoading] = useState(false)
  const refScrolling: any = useRef()
  const [isFirst, setFirst] = useState(false)
  const [recentAdd, setRecentAdd] = useState(false)


  const [genereFilter, setGenereFilter] = useState<Array<null | string>>([])
  const [platformFilter, setPlatformFilter] = useState<Array<string | null>>([])
  const [dateFilter, setDateFilter] = useState<null | Date>()

  const { isNear } = useNearScreen({ isContinuous: true, rootMargin: '300px', externalRef: loading ? null : refScrolling })

  const handleNextPage = (): void => {
    if (totalPage !== null && games.length <= (totalPage * 30)) {
      setPage(lastPage => lastPage + 1)
    }
  }

  const handleShowMenu = () =>
    setShowMenu(!showMenu)


  useEffect(() => {
    if (!isFirst) setLoading(true)

    getGame.searchGame({
      keyword: decodeURI(id),
      page,
      size: 30,
      isRecent: recentAdd,
      date: dateFilter,
      platform: platformFilter,
      genrer: genereFilter
    }).then((res: any) => {

      setGame(lastPage => res.results ? [...lastPage, ...res.results] : [...lastPage])
      setTotalPage(Math.floor(res.count / 30))
      !isFirst && setLoading(false)
      !isFirst && setFirst(true)
    })

  }, [id, page, recentAdd, dateFilter, genereFilter, platformFilter])


  useEffect(() => {
    if (isNear) handleNextPage()
  }, [isNear])

  const handleReset = (): void => {
    setGame([])
    setPage(1)
    setTotalPage(0)
  }

  const handleRecentAdd = (recent: boolean) => {
    if (recent !== recentAdd) {
      handleReset()
      setRecentAdd(recent)
    }
  }

  const handleFilter = ({ genres, platforms, date }: any): void => {
    handleReset()

    if (genres) {
      const verify = genereFilter.findIndex(genre => genre == genres)
      if (verify != -1) {
        const deleteFilter = genereFilter.filter(id => id !== genres)
        setGenereFilter(deleteFilter)
      } else {
        setGenereFilter(lastGenres => [...lastGenres, genres])
      }
    }

    if (platforms) {
      const verify = platformFilter.findIndex(plat => plat == platforms)
      if (verify != -1) {
        const deleteFilter = platformFilter.filter(id => id !== platforms)
        setPlatformFilter(deleteFilter)
      } else {
        setPlatformFilter(lastPlatform => [...lastPlatform, platforms])
      }
    }
    date && setDateFilter(date !== dateFilter ? date : null)
  }

  return (
    <div className="flex w-full gap-3">
      <div className="min-h-[100vh] flex-[4]">
        <div className="text-neutral-500 mb-7 mt-5 text-base font-medium relative gap-4 flex items-center"><span>Mostrar: </span>
          <div className="relative">
            <button className="text-white relative flex items-center" onClick={handleShowMenu}>
              <span>Todos</span>
              <span className={`${showMenu ? 'rotate-180' : 'rotate-0'} transition-all`}>
                <MdKeyboardArrowDown />
              </span>
            </button>
            {showMenu && <div className="absolute w-[230px]  flex flex-col justify-start items-start overflow-hidden  rounded-md shadow-md left-0 bg-neutral-800 top-7 z-20 text-white">
              {
                menuList.map(({ label, recent }) => (
                  <button key={label} className="py-3 w-full text-start hover:bg-neutral-600 transition-all px-5" onClick={() => handleRecentAdd(recent)}>{label}</button>
                ))
              }
            </div>}
          </div>
        </div>

        <ListGameSearch
          games={games} />
        {games.length <= (totalPage * 30)
          && <div className="w-full h-[10px]" ref={refScrolling}></div>}
      </div>
      <div className="p-5 flex-1">
        <h3>Filtros({genereFilter.length + platformFilter.length})</h3>

        <ul className="flex flex-col gap">
          {filterList.map(({ label }) => <CardFilter key={label} genereFilter={genereFilter} label={label} platformFilter={platformFilter} filterList={filterList} handleFilter={handleFilter} />)}
        </ul>
      </div>
    </div>
  )
}



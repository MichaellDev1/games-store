'use client'
import { useEffect, useRef, useState } from "react"
import ListGameSearch from '@/components/ListGamesSearch/indext'
import { getGame } from "@/services/getGame"
import { MdKeyboardArrowDown } from 'react-icons/md'
import useNearScreen from "@/hooks/useNearScreen"

const menuList = [
  {
    label: 'Todos',
  }, {
    label: 'Ultimos lanzamientos',
  }
]

export default function Search({ params }: any) {
  const { id } = params
  const [games, setGame] = useState<Array<any>>([])
  const [page, setPage] = useState<number>(1)
  const [totalPage, setTotalPage] = useState<null | number>(0)
  const [showMenu, setShowMenu] = useState(false)
  const [loading, setLoading] = useState(false)
  const refScrolling: any = useRef()
  const [isFirst, setFirst] = useState(false)
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

    getGame.searchGame({ keyword: decodeURI(id), page, size: 30 }).then((res: any) => {
      setGame(lastPage => [...lastPage, ...res.results])
      setTotalPage(Math.floor(res.count / 30))
      !isFirst && setLoading(false)
      !isFirst && setFirst(true)
    })

  }, [id, page])


  useEffect(() => {
    if (isNear) handleNextPage()
  }, [isNear])

  return (
    <div>
      <div className="min-h-[100vh]">
        <div className="text-neutral-500 mb-7 mt-5 text-base font-medium relative gap-4 flex items-center"><span>Mostrar: </span>
          <button className="text-white relative flex items-center" onClick={handleShowMenu}>
            <span>Todos</span>
            <span className={`${showMenu ? 'rotate-180' : 'rotate-0'} transition-all`}>
              <MdKeyboardArrowDown />
            </span>
            {showMenu && <div className="absolute w-[230px]  flex flex-col justify-start items-start overflow-hidden  rounded-md shadow-md left-0 bg-neutral-800 top-7 z-20">
              {
                menuList.map(({ label }) => (
                  <button key={label} className="py-3 w-full text-start hover:bg-neutral-600 transition-all px-5">{label}</button>
                ))
              }
            </div>}
          </button>
        </div>

        <ListGameSearch
          games={games} />
        {totalPage
          && games.length <= (totalPage * 30)
          && <div className="w-full h-[10px]" ref={refScrolling}></div>}
      </div>
    </div>
  )
}



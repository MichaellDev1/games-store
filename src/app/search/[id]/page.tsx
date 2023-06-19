'use client'
import { DetailedHTMLProps, HTMLAttributes, useCallback, useEffect, useRef, useState } from "react"
import ListGameSearch from '@/components/ListGamesSearch/indext'
import { getGame } from "@/services/getGame"
import { MdKeyboardArrowDown } from 'react-icons/md'

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
  const [totalPage, setTotalPage] = useState<null | number>()
  const refNearcScrean = useRef<any>()
  const [showMenu, setShowMenu] = useState(false)

  useEffect(() => {
    getGame.searchGame({ keyword: decodeURI(id), page }).then((res: any) => {
      setGame(lastPage => [...lastPage, ...res.results])
      setTotalPage(Math.floor(res.count / 30))
    })
  }, [id, page])


  useEffect(() => {
    if (refNearcScrean.current) {
      const visibility = (entries: any, observer: any) => {
        const ele = entries[0]
        if (ele.isIntersecting) {
          handleNextPage()
          console.log(observer)
        }
      }
      const observer = new IntersectionObserver(visibility, {
        rootMargin: '300px'
      })

      observer.observe(refNearcScrean.current)
      return () => observer && observer.disconnect()

    }
  }, [refNearcScrean])

  const handleNextPage = () => {
    if (totalPage !== null && games.length <= (totalPage * 30)) {
      setPage(lastPage => lastPage + 1)
    }
  }

  const handleShowMenu = () => {
    setShowMenu(!showMenu)
  }

  return (
    <div>
      <div className="min-h-[100vh]">
        <div className="text-neutral-500 mb-7 mt-5 text-base font-medium relative gap-4 flex items-center"><span>Mostrar: </span>
          <button className="text-white relative flex items-center" onClick={handleShowMenu}>
            <span>Todos</span>
            <span className={`${showMenu ? 'rotate-180' : 'rotate-0'} transition-all`}>
              <MdKeyboardArrowDown />
            </span>
            {showMenu && <div className="absolute w-[230px]  flex flex-col justify-start items-start overflow-hidden  rounded-md shadow-md left-0 bg-neutral-800 top-7 z-10">
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
          && <div className="w-full h-[10px]" ref={refNearcScrean}></div>}
      </div>
    </div>
  )
}



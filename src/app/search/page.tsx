'use client'
import ListGameSearch from "@/components/ListGamesSearch/indext"
import useNearScreen from "@/hooks/useNearScreen"
import { getGame } from "@/services/getGame"
import { useCallback, useEffect, useReducer, useRef, useState } from "react"
import { MdKeyboardArrowDown } from 'react-icons/md'
import { useSearchParams } from 'next/navigation'
import Carrousel from "@/components/Carrousel"
import Image from "next/image"
import Link from "next/link"
import { menuList } from "./data"
import useLoading from "@/hooks/useLoading"
import { initialStateSearch, searchReducer } from "@/reducers/searchReducer"
import SectionFilter from "@/components/SectionFilter"

export default function Search() {
  const [page, setPage] = useState<number>(1)
  const [totalPage, setTotalPage] = useState<number>(0)
  const [isFirst, setFirst] = useState(false)
  const [recentAdd, setRecentAdd] = useState(false)
  const { loading, setLoading, setShowMenu, showMenu } = useLoading()

  const searchParams = useSearchParams()
  const keyword = searchParams.get('q')
  const genrerSelected = searchParams.get('gender')

  const refScrolling: any = useRef()
  const { isNear } = useNearScreen({ isContinuous: true, rootMargin: '300px', externalRef: loading ? null : refScrolling })
  const [state, dispatch]: any = useReducer(searchReducer, initialStateSearch())

  useEffect(() => {
    if (!isFirst) setLoading(true)

    const options = {
      keyword: decodeURI(keyword),
      page,
      size: 30,
      isRecent: recentAdd,
      platform: state.platformFilter,
      genrer: genrerSelected && state.genderFilter.length === 0 ? [genrerSelected] : !genrerSelected || state.genderFilter.length == 0 ? [] : [...state.genderFilter, genrerSelected]
    }

    if (keyword) {
      getGame.searchGame(options).then((res: any) => {
        dispatch({ type: "ADD_GAMES", payload: res.results })
        setTotalPage(Math.floor(res.count / 30))
        !isFirst && setLoading(false)
        !isFirst && setFirst(true)
      })
    } else {
      getGame.getAllGames(options).then((res: any) => {
        dispatch({ type: "ADD_GAMES", payload: res.results })
        setTotalPage(Math.floor(res.count / 30))
        !isFirst && setLoading(false)
        !isFirst && setFirst(true)
      })
    }

  }, [keyword, page, recentAdd, state.genderFilter, state.platformFilter, genrerSelected])

  useEffect(() => {
    getGame.getAllGenres()
      .then((data: any) => {
        dispatch({ type: 'ADD_GENRES', payload: data.results })
      })
  }, [])

  const handleNextPage = useCallback(() => {
    if (totalPage !== null && state.games.length <= (totalPage * 30)) {
      setPage(lastPage => lastPage + 1)
    }
  }, [state.games.length, totalPage])

  useEffect(() => {
    if (isNear && refScrolling.current) handleNextPage()
  }, [isNear, handleNextPage])

  // FUNCTIONS
  const handleShowMenu = () =>
    setShowMenu(!showMenu)

  const handleReset = (): void => {
    setPage(1)
    setTotalPage(0)
  }

  const handleRecentAdd = (recent: boolean) => {
    if (recent !== recentAdd) {
      handleReset()
      dispatch({ type: "RESET_GAME" })
      setRecentAdd(recent)
    }
  }

  const handleFilter = ({ type, payload }: { type: string, payload: string }) => {
    const selected = type == 'platform' ? state.platformFilter : state.genderFilter
    const verify = selected.findIndex((id: string) => id == payload)

    if (verify != -1) {
      dispatch({
        type: type == 'platform'
          ? 'DELETE_PLATFORM_FILTER'
          : '"DELETE_GENRE_FILTER"', payload: payload
      })
    } else {
      dispatch({
        type: type == 'platform'
          ? 'ADD_PLATFORM_FILTER'
          : 'ADD_GENRES_FILTER', payload: payload
      })
    }
  }

  return (
    <div className="flex w-full flex-col gap-3">
      {
        !keyword && <div className="mt-12 w-full">
          <Carrousel title="Genders" height="270px">
            {state.genres.map((data: any) => (
              <Link href={`/search?gender=${data.id}`} className="w-[230px] p-5 shrink-0 bg-neutral-900 rounded-md overflow-hidden text-center relative block h-full" key={data.id} onClick={() => {
                setPage(1)
                dispatch({ type: 'RESET_GAME' })
              }}>
                <div className="h-[120px] w-full overflow-hidden rounded-lg mb-2">
                  <Image src={data.image_background} alt={`genre ${data.name}`} width={200} height={200} className="w-full h-full object-cover" priority />
                </div>
                <span className="font-normal text-[18px]">{data.name}</span>
              </Link>
            ))}
          </Carrousel>
        </div>
      }

      <div className="flex gap-3 w-full min-h-[200vh]">
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
                    <button
                      key={label}
                      className="py-3 w-full text-start hover:bg-neutral-600 transition-all px-5"
                      onClick={() => handleRecentAdd(recent)}>
                      {label}
                    </button>
                  ))
                }
              </div>}
            </div>
          </div>

          <ListGameSearch games={state.games} />
          {state.games.length <= (totalPage * 30)
            && <div className="w-full h-[10px]" ref={refScrolling}></div>}
        </div>

        <SectionFilter
          handleFilter={handleFilter}
          genderFilter={state.genderFilter}
          platformFilter={state.platformFilter}
          genderAll={state.genres} />

      </div>
    </div>
  )
}



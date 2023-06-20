import React, { useEffect, useState } from 'react'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { FiCheck } from 'react-icons/fi'
import { getGame } from '@/services/getGame'

const platforms = [{
  label: 'Pc',
  id: '4'
}, {
  label: 'Play Stations 5',
  id: '187'
}, {
  label: 'Play Stations 4',
  id: '18'
}, {
  label: 'Play Stations 3',
  id: '16'
}, {
  label: 'Xbox One',
  id: '1'
},]

export default function CardFilter({ label, filterList, handleFilter, platformFilter, genereFilter}: any) {
  const [showOptions, setOptions] = useState(false)
  const [genresAll, setAllGenres] = useState<Array<any>>([])

  useEffect(() => {
    getGame.getAllGenres()
      .then(res => {
        setAllGenres(res.results)
      })
  }, [])

  const handleShowMoreOptions = () =>
    setOptions(!showOptions)

  return <div className='flex flex-col'>
    <li className="py-5 border-b hover:text-white font-normal text-sm border-neutral-700 text-neutral-400 flex items-center justify-between cursor-pointer mt-5" onClick={handleShowMoreOptions}>
      <span className='uppercase text-xs px-5'>{label}</span>
      <span className={`${showOptions ? 'rotate-180' : 'rotate-0'} transition-all`}>
        <MdKeyboardArrowDown />
      </span>
    </li>
    {
      showOptions && <div className='w-full min-h-[200px] '>
        {label == filterList[0].label && <div>

          {genresAll.length > 0 && <ul className='flex flex-col gap-2 text-sm font-light text-neutral-300 w-full  mt-5'>
            {genresAll.map((genre: any) => (
              <li key={genre.id} className={`py-3 px-5 cursor-pointer flex items-center justify-between rounded-[3px] w-full ${genereFilter.includes(genre.id) ? 'bg-neutral-800 text-white' : ''}`} onClick={() => handleFilter({ genres: genre.id })}>
                <span>{genre.name}</span>
                {
                  genereFilter.includes(genre.id) && <span>
                    <FiCheck />
                  </span>
                }
              </li>
            ))}
          </ul>}

        </div>}


        {label == filterList[1].label && <div>
          <ul className='flex flex-col gap-2 text-sm font-light text-neutral-300 w-full  mt-5'>
            {platforms.map(({ label, id }) => (
              <li key={id} className={`py-3 px-5 cursor-pointer flex items-center justify-between rounded-[3px] w-full ${platformFilter.includes(id) ? 'bg-neutral-800 text-white' : ''}`} onClick={() => handleFilter({ platforms: id })}>
                <span>{label}</span>
                {
                  platformFilter.includes(id) && <span>
                    <FiCheck />
                  </span>
                }
              </li>
            ))}
          </ul>
        </div>}
      </div>
    }
  </div>
}

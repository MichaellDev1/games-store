import React, { useState } from 'react'
import { MdKeyboardArrowDown } from 'react-icons/md'

export default function CardFilter({ label, filterList }: any) {
  const [showOptions, setOptions] = useState(false)

  const handleShowMoreOptions = () =>
    setOptions(!showOptions)

  return <div className='flex flex-col'>
    <li className="py-5 border-b hover:text-white font-normal text-sm border-neutral-700 text-neutral-400 flex items-center justify-between cursor-pointer mt-5" onClick={handleShowMoreOptions}>
      <span className='uppercase text-xs'>{label}</span>
      <span className={`${showOptions ? 'rotate-180' : 'rotate-0'} transition-all`}>
        <MdKeyboardArrowDown />
      </span>
    </li>
    {
      showOptions && <div className='w-full min-h-[200px] '>
        {label == filterList[0].label && <div>Genero</div>}
        {label == filterList[1].label && <div>Plataforma</div>}
        {label == filterList[2].label && <div>Fecha</div>}
      </div>
    }
  </div>
}

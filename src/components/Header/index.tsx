'use client'
import { useState } from 'react'
import { RiNotification2Line } from 'react-icons/ri'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { TbShoppingBag } from 'react-icons/tb'
import Image from 'next/image'
import FormSearch from '../FormSearch'
import './index.css'

export default function Header() {
  const [showMenu, setMenu] = useState<boolean>(false)

  const handleShowMenu = () => {
    setMenu(!showMenu)
  }

  return <header className='flex items-center w-full justify-between h-[100px] gap-5 z-30'>
    <FormSearch />
    <div className='flex-1 relative  flex justify-end'>
      <div className='flex gap-3 items-center'>

        <button className='text-[var(--texticon-color)] bg-[var(--bg-icons)] text-[17px] relative p-3 rounded-full'>
          <span className='w-[10px] h-[10px] bg-red-500 rounded-full absolute top-[1px] right-[1px]'></span>
          <RiNotification2Line />
        </button>

        <button className='text-[var(--texticon-color)] bg-[var(--bg-icons)] text-[17px] p-3 rounded-full'>
          <TbShoppingBag />
        </button>
      </div>

      <button className='flex gap-2 ml-3 cursor-pointer items-center hover:bg-neutral-800 transition-all py-1 px-3 rounded-xl' onClick={handleShowMenu}>
        <div className='text-[var(--texticon-color)] bg-[var(--bg-icons)] w-[39px] h-[39px] bg-white text-[17px] border border-[var(--color-gradient)] rounded-full overflow-hidden relative'>
          <Image src={'https://www.getillustrations.com/photos/pack/3d-avatar-male_lg.png'} alt='image user' width={400} height={400} className='w-full h-full object-cover' />
        </div>
        <span className='text-[15px]'>Michael Santucho</span>
        <MdKeyboardArrowDown />
      </button>

      {showMenu && <div className='border border-neutral-600 bg-[#00000075] w-[300px] min-h-[400px] absolute right-0 top-14 backdrop-blur-sm rounded-lg shadow-xl menu-user'></div>}

    </div>
  </header>
}

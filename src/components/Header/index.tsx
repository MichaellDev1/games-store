'use client'
import { useEffect, useState } from 'react'
import { RiNotification2Line } from 'react-icons/ri'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { TbShoppingBag } from 'react-icons/tb'
import Image from 'next/image'
import FormSearch from '../FormSearch'
import MenuUser from '../MenuUser'
import './index.css'
import { useContextAuth } from '@/context/AuthContext'
import AlertElement from '../AlertElement'

export default function Header() {
  const [showMenu, setMenu] = useState<boolean>(false)
  const { user, setUser }: any = useContextAuth()

  useEffect(() => {
    window.onscroll = () => { if (showMenu) return setMenu(false) }
  }, [showMenu])

  const handleShowMenu = () =>
    setMenu(!showMenu)

  return <header className='flex items-center w-full justify-between h-[100px] gap-5 z-30 relative'>
    <FormSearch />
    <div className='flex-1 relative  flex justify-end'>
      {
        user ? <>
          <div className='flex gap-3 items-center'>
            <button className='text-[var(--texticon-color)] bg-[var(--bg-icons)] text-[17px] relative p-3 rounded-full border border-transparent hover:border-neutral-600 flex content-alert'>
              <span className='w-[10px] h-[10px] bg-red-500 rounded-full absolute top-[1px] right-[1px]'></span>
              <RiNotification2Line />

              <AlertElement message={'Notifications'} positions='top-[50px] left-[-22px] '/>
            </button>

            <button className='text-[var(--texticon-color)] bg-[var(--bg-icons)] text-[17px] p-3 rounded-full border border-transparent hover:border-neutral-600 relative content-alert'>
              <TbShoppingBag />

              <AlertElement message={'Cart'} positions='top-[50px] left-[0px] right-0 m-auto'/>
            </button>
          </div>

          <button className={`flex gap-2 ml-3 ${showMenu ? 'bg-neutral-800 border-neutral-600 border' : ''} cursor-pointer items-center hover:bg-neutral-800 border border-transparent hover:border-neutral-600 transition-all py-1 px-3 rounded-xl`} onClick={handleShowMenu}>
            <div className='text-[var(--texticon-color)] bg-[var(--bg-icons)] w-[39px] h-[39px] bg-white text-[17px] border border-[var(--color-gradient)] rounded-full overflow-hidden relative'>
              <Image src={user.image} alt='image user' width={400} height={400} className='w-full h-full object-cover' />
            </div>
            <span className='text-[15px]'>{user.name} {user.surname}</span>
            <MdKeyboardArrowDown />
          </button></> : null
      }

      {user && <MenuUser
        handleShowMenu={handleShowMenu}
        showMenu={showMenu}
        dataUser={user}
        setUser={setUser} />}
    </div>
  </header>
}

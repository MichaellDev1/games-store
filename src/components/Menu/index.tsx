'use client'
import Link from 'next/link'
import { useState } from 'react'
import { CgGames } from 'react-icons/cg'
import { VscFolderLibrary } from 'react-icons/vsc'
import { RiChatSmile3Fill } from 'react-icons/ri'
import { FaUserFriends } from 'react-icons/fa'
import { LuSettings } from 'react-icons/lu'
import { IoMdHelpCircle } from 'react-icons/io'
import { AiOutlineLogin } from 'react-icons/ai'

type Props = {
  menuHidden: boolean
}

const navLinks = [
  {
    icon: <CgGames />,
    href: '/',
    label: 'Games store'
  },
  {
    icon: <VscFolderLibrary />,
    href: '/favorites',
    label: 'Favorites'
  },
  {
    icon: <RiChatSmile3Fill />,
    href: '/explore',
    label: 'explore'
  }, {
    icon: <FaUserFriends />,
    href: '/balance',
    label: 'Balance'
  },
]

export default function Menu({ menuHidden }: Props) {
  const initialState = window.location.pathname
  const [pathname, setPathName] = useState(initialState)

  const handleClick = (href: string) => {
    setPathName(href)
  }

  return <div className={`w-52 h-full fixed left-0 top-0 bg-transparent z-40 p-10 lg:left-0 ${menuHidden ? 'left-0' : 'left-full'}`}>
    <div>
      <div className='pb-16 '>
        <h4 className='text-2xl'>Mishelds</h4>
      </div>
      <nav>
        <ul className='flex flex-col gap-7'>
          {navLinks.map(({ icon, href, label }) => (
            <li key={label} onClick={() => handleClick(href)} className={`list-none font-light ${pathname == href ? 'text-[var(--color-gradient)]' : 'text-[#fff]'} text-[15px]`}>
              <Link href={href} className='flex items-center gap-2'>
                <span className='text-[20px] text-[#ffffff8f]'>{icon}</span>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>

    <div className='mt-24'>
      <ul className='flex flex-col gap-7'>
        <li className='list-none font-light text-[15px] text-[#fff]'>
          <Link href='/settings' className='flex items-center gap-2'>
            <span className='text-[20px] text-[#ffffff8f]'>
              <LuSettings />
            </span>
            Settings
          </Link>
        </li>
        <li className='list-none font-light text-[15px] text-[#fff]'>
          <Link href={'/help'} className='flex items-center gap-2'>
            <span className='text-[20px] text-[#ffffff8f]'>
              <IoMdHelpCircle />
            </span>
            Help
          </Link>
        </li>
      </ul>


    </div>
    <div className='mt-28'>
      <Link href={'/help'} className='flex items-center gap-2'>
        <span className='text-[20px] text-[#ffffff8f]'>
          <AiOutlineLogin />
        </span>
        Log Out
      </Link>
    </div>
  </div>

}

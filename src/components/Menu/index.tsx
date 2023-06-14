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
    label: 'Explore'
  }, {
    icon: <FaUserFriends />,
    href: '/balance',
    label: 'Balance'
  },
]

export default function Menu({ menuHidden }: Props) {
  const initialState = location.pathname
  const [pathname, setPathName] = useState(initialState)

  const handleClick = (href: string) => {
    setPathName(href)
  }

  return <div className={`w-52 h-full fixed top-0 bg-transparent z-40 p-7 lg:left-0 ${menuHidden ? 'left-0' : 'left-full'} lg:left-0 left-full`}>
    <div>
      <div className='pb-16 flex items-center gap-2'>
        <div className='relative bg-white w-[20px] h-[20px] rounded-full overflow-hidden'>
          <span className='bg-[var(--color-gradient)] w-[15px] h-[15px] absolute rounded-full'></span>
        </div>
        <h4 className='text-[23px] font-medium'>
          Mishelds</h4>
      </div>
      <nav>
        <ul className='flex flex-col gap-2'>
          {navLinks.map(({ icon, href, label }) => (
            <li key={label} onClick={() => handleClick(href)} className={`list-none font-light ${pathname == href ? 'text-[var(--color-gradient)]' : 'text-[#fff]'} w-full text-[15px] py-2 px-2 rounded-md hover:bg-neutral-800 transition-all`}>
              <Link href={href} className='flex items-center gap-2'>
                <span className='text-[20px] relative text-[#ffffff8f]'>
                  {href == pathname && <span className='w-[3px] h-[20px] bg-[var(--color-gradient)] rounded-full absolute top-0 -left-4' style={{ boxShadow: '1px 0px 10px #ff6b27' }}></span>}
                  <span className='z-20 relative backdrop-blur-md'>{icon}</span>
                </span>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
    <div className='mt-24'>
      <ul className='flex flex-col gap-2'>
        <li className='list-none hover:bg-neutral-800 transition-all py-2 px-2 rounded-md font-light text-[15px] text-[#fff]'>
          <Link href='/settings' className='flex items-center gap-2'>
            <span className='text-[20px] text-[#ffffff8f]'>
              <LuSettings />
            </span>
            Settings
          </Link>
        </li>
        <li className='list-none hover:bg-neutral-800 transition-all py-2 px-2 rounded-md font-light text-[15px] text-[#fff]'>
          <Link href={'/help'} className='flex items-center gap-2'>
            <span className='text-[20px] text-[#ffffff8f]'>
              <IoMdHelpCircle />
            </span>
            Help
          </Link>
        </li>
      </ul>
    </div>
    <div className='mt-20'>
      <Link href={'/help'} className='flex items-center gap-2'>
        <span className='text-[20px] text-[#ffffff8f]'>
          <AiOutlineLogin />
        </span>
        Log Out
      </Link>
    </div>
  </div>

}

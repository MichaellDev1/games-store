import Link from 'next/link'
import React from 'react'
import { AiFillGithub, AiOutlineInstagram } from 'react-icons/ai'
import { BsLinkedin } from 'react-icons/bs'

const myRedes = [
  {
    href: '',
    icon: <AiOutlineInstagram />
  }, {
    href: '',
    icon: <BsLinkedin />
  }, {
    href: '',
    icon: <AiFillGithub />
  }
]

export default function Footer() {
  return <footer className='py-8 mt-10 flex flex-col items-center justify-center text-center'>
    <ul className='flex relative items-center justify-center gap-6 mb-5'>
      {
        myRedes.map(({ href, icon }, inx) => (
          <li key={inx} className='text-[20px]'>
            <Link href={href}>{icon}</Link>
          </li>
        ))
      }

      <span className='min-w-[300px] absolute h-[1px] bg-[#ff6b27] -left-[305px]' style={{background: 'linear-gradient(190deg, #ffad18, transparent)'}}></span>

      <span className='min-w-[300px] absolute h-[1px] bg-[#ff6b27] -right-[305px]' style={{background: 'linear-gradient(45deg, #ffad18, transparent)'}}></span>
    </ul>
    <h4 className='text-xs'>Echo con 🧡 por Michael Santucho</h4>
  </footer>
}

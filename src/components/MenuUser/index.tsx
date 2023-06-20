import Image from 'next/image'
import React, { useRef } from 'react'
import { BiPencil } from 'react-icons/bi'

const extencions = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif']

export default function MenuUser({ handleShowMenu, showMenu, dataUser, setUser }: { handleShowMenu: any, showMenu: boolean, dataUser: any, setUser: any }) {
  const refInput: any = useRef()

  const handleClick = () => { if (refInput.current) refInput.current.click() }
  const changeImageUser = (e: any) => {
    const newUserData = { ...dataUser }
    newUserData.image = e.target.result
    window.localStorage.setItem('user', JSON.stringify(newUserData))
    setUser(newUserData)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    if (e.target.files[0]) {
      if (extencions.includes(e.target.files[0].type)) {
        const image = e.target.files[0]
        const reader = new FileReader()
        reader.addEventListener('load', changeImageUser)
        reader.readAsDataURL(image)
      }
    }
  }

  return showMenu && <>
    <div className='w-full h-full fixed top-0 left-0 bg-transparent' onClick={handleShowMenu}></div>
    <div className='border border-neutral-600 bg-neutral-800  absolute right-0 top-14 backdrop-blur-sm rounded-lg shadow-xl menu-user p-6'>
      <div className='flex items-center gap-2'>
        <div className='relative'>
          <div className='w-[80px] h-[80px] overflow-hidden  rounded-full relative'>
            <Image src={dataUser.image} alt='image user mneu' width={200} height={200} className='w-full h-full object-cover' />
          </div>
          <button className='w-[23px] h-[23px] bg-[var(--color-gradient)] absolute z-10 text-sm flex justify-center items-center rounded-full bottom-0 overflow-hidden right-0' onClick={handleClick}>
            <input type="file" className='w-full h-full absolute top-0 left-0' onChange={handleImageChange} hidden ref={refInput} />
            <BiPencil />
          </button>
        </div>
        <div className='flex flex-col'>
          <span className='text-base font-medium'>{dataUser.name} {dataUser.surname}</span>
          <p className='font-normal text-xs text-neutral-300'>{dataUser.email}</p>
        </div>
      </div>
    </div>
  </>
}

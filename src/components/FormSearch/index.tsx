'use client'
import React, { useState } from 'react'
import { RiSearch2Line } from 'react-icons/ri'
import { useRouter } from 'next/navigation'
import useDebounce from '@/hooks/useDebounce'
import MenuSearchChange from '../MenuSearchChange'
import './index.css'

export default function FormSearch() {
  const [keyword, setKeyword] = useState<string>('')
  const keywordDebounce = useDebounce({ delay: 600, value: keyword })
  const router = useRouter()

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (keyword.trim() == '') return
    return router.push(`/search?q=${keyword}`)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setKeyword(e.target.value)

  return (
    <form className='relative flex-1' onSubmit={handleSearch}>

      <span className='absolute top-[7px] left-3 text-2xl text-[var(--texticon-color)]'>
        <RiSearch2Line />
      </span>

      <input onChange={handleChange}
        type="text"
        name="keyword"
        autoComplete='off'
        placeholder='Search orders'
        className='text-[var(--texticon-color)] input-search-header transition-all w-full placeholder:text-[var(--texticon-color)] px-12 py-[9px] bg-[var(--bg-icons)] rounded-xl text-[15px] focus:bg-neutral-600 hover:bg-neutral-700 font-light' />

      {keyword.trim() !== '' &&
        <MenuSearchChange 
        keyword={keyword} 
        keywordDebounce={keywordDebounce} />}
    </form>
  )
}

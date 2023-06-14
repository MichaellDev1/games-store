'use client'
import React, { useState } from 'react'
import { RiSearch2Line } from 'react-icons/ri'
import { useRouter } from 'next/navigation'

export default function FormSearch() {
  const [keyword, setKeyword] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (keyword.trim() == '') return
    return router.push(`/search/${keyword}`)
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
        placeholder='Search orders'
        className='text-[var(--texticon-color)] w-full placeholder:text-[var(--texticon-color)] px-12 py-[9px] bg-[var(--bg-icons)] rounded-xl text-[15px] font-light' />
    </form>
  )
}

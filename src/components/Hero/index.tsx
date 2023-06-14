import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import './index.css'

interface Props {
  games: any
  handleChangeHero: Function
  num: number
}

export default function Hero({ games, handleChangeHero, num }: Props) {
  const [isViewTags, setViewTags] = useState<boolean>(false)
  const [isViewPlatForm, setViewPlatform] = useState(false)

  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const interval = setTimeout(() => {
      num == 4 ? handleChangeHero(0) : handleChangeHero(num + 1)
    }, 7000)

    setAnimate(true)
    const intervalL = setTimeout(() => {
      setAnimate(false)
      clearTimeout(intervalL)
    }, 600)

    return () => clearTimeout(interval)
  }, [num, handleChangeHero])

  const handleViewMore = (isTags: boolean) => {
    isTags ? setViewTags(!isViewTags) : setViewPlatform(!isViewPlatForm)
  }

  return (
    <div>
      {
        games && <>
          <div className='h-[400px] grid grid-cols-6 grid-rows-3 w-full gap-2'>
            <div className='bg-slate-600 rounded-[15px] relative overflow-hidden' style={{ gridColumn: '1/5', gridRow: '1/4' }}>

              <ul className='absolute top-5 left-5 flex items-center flex-wrap gap-3 z-10'>


                {games.tags.slice(0, isViewTags ? games.tags.length : 3).map((tag: any) => (
                  <li key={tag.name} className={`list-none bg-[#08080848] ${animate ? 'animate' : ''} py-[7px] px-3 rounded-3xl text-[11px] backdrop-blur-md font-light`}>
                    <span>{tag.name}</span>
                  </li>
                ))}

                {games.tags.length > 3 && <button className={`bg-[#08080848] ${animate ? 'animate' : ''}  py-2 px-3 rounded-3xl text-[14px] backdrop-blur-md font-normal`} onClick={() => handleViewMore(true)}>
                  <IoMdAdd />
                </button>}
              </ul>

              <ul className='absolute bottom-5 left-5 flex flex-wrap items-center gap-3 z-10'>


                {games.parent_platforms?.slice(0, isViewPlatForm ? games.parent_platforms.length : 3).map((platform: any) => (
                  <li key={platform.platform.name} className={`list-none bg-[#08080848]  animate py-[7px] px-3 rounded-3xl text-[11px] backdrop-blur-md font-light`}>
                    <span>{platform.platform.name}</span>
                  </li>
                ))}

                {games.parent_platforms?.length > 3 && <button className={`bg-[#08080848]  py-2 px-3 rounded-3xl text-[14px] backdrop-blur-md font-normal`} onClick={() => handleViewMore(false)}>
                  <IoMdAdd />
                </button>}
              </ul>




              <div className={`absolute bottom-5 z-10 right-5 bg-[#08080848] py-1 px-3 rounded-3xl text-[14px] backdrop-blur-md font-normal  `}>
                {games.rating}
              </div>

              <Image src={games.background_image} className={`w-full h-full object-cover `} width={1500} height={800} alt={`image background game ${games.nam}`} priority />


              <div className='w-full h-[230px] absolute bottom-0 left-0' style={{ background: 'linear-gradient(0deg, #000000b8, transparent)' }}>
              </div>
            </div>

            <div className='bg-slate-600 flex flex-col justify-center p-6 rounded-[15px]' style={{ gridRow: '1/3', gridColumn: '5/7', background: 'linear-gradient(253deg, #eb8250, rgb(51 51 51 / 0%) 70.71%), linear-gradient(127deg, rgb(16 16 16), rgb(70 243 70 / 0%) 70.71%), linear-gradient(336deg, rgb(255 0 0), rgb(13 14 7 / 86%) 70.71%)' }}>
              <h2 className={`font-semibold text-[18px] ${animate ? 'animate' : ''}`}>{games.name}</h2>
              <p className={`text-xs font-light ${animate ? 'animate' : ''}`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, fugiat!</p>
              <div className='flex flex-col w-full mt-20'>
                <span className='text-[15px] mb-1 font-light'>$16.66</span>
                <div className='flex justify-between items-center'>
                  <button className='bg-[#00000050] py-[9px] rounded-xl font-normal px-8 text-[15px]'>
                    Availible now
                  </button>
                </div>
              </div>
            </div>

            <div className={`flex items-center gap-2`} style={{ gridColumn: '5/7' }}>
              <div className='bg-slate-400 animate rounded-[15px] flex-1 h-full relative overflow-hidden'>
                <Image src={games.short_screenshots[0].image} alt={`Screanshoot game ${games.name}`} width={400} height={400} className='w-full h-full object-cover' />
              </div>
              <div className='bg-slate-400 animate rounded-[15px] flex-1 h-full relative overflow-hidden'>
                <Image src={games.short_screenshots[1].image} alt={`Screanshoot game ${games.name}`} width={400} height={400} className='w-full h-full object-cover' />
              </div>
            </div>
          </div>
        </>
      }
      <div className='w-full py-5 flex justify-center items-center gap-4'>
        {new Array(5).fill(null).map((ele: null, inx: number) => (
          <span key={inx}
            onClick={() => handleChangeHero(inx)}
            className={`${num == inx ? 'w-[30px] bg-[var(--color-gradient)] selected' : ' bg-[var(--bg-icons)] w-[6px]'} cursor-pointer h-[6px] rounded-full transition-all`}></span>
        ))}
      </div>
    </div>
  )
}

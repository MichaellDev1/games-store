import React, { useRef } from 'react'
import { IoIosArrowForward } from 'react-icons/io'

export default function Carrousel({ children, title }: { children: React.ReactNode, title: string }) {
  const refCarrousel: React.LegacyRef<HTMLDivElement> | null = useRef(null)
  const refBtnLeft: React.LegacyRef<HTMLDivElement> | null = useRef(null)
  const refBtnRight: React.LegacyRef<HTMLDivElement> | null = useRef(null)

  const handleScrollBtn = (scrollLeft: boolean = false) => {
    if (refCarrousel.current) {
      const element = refCarrousel.current

      scrollLeft
        ? element.scrollLeft -= element.scrollLeft <= 0
          ? 0
          : element.clientWidth
        : element.scrollLeft += element.scrollLeft >= element.scrollWidth
          ? 0
          : element.clientWidth
    }
  }

  return (
    <div>
      <div className='w-full mb-3 flex justify-between'>
        <h3 className='text-lg font-normal'>{title}</h3>
        <div className='flex items-center gap-2'>
          <div ref={refBtnLeft} className='relative '>
            <button className='w-[30px] h-[30px] cursor-pointer outline-nones items-center justify-center flex rounded-full bg-[#202020] rotate-180 text-base border-none text-white' onClick={() => handleScrollBtn(true)} style={{ boxShadow: '0px 1px 4px rgba(0,0,0,.1607843137)' }}>
              <IoIosArrowForward />
            </button>
          </div>
          <div ref={refBtnRight} className='relative flex justify-center'>
            <button className='w-[30px] h-[30px] cursor-pointer outline-nones items-center text-base justify-center text-white flex rounded-full  bg-[#202020] border-none' onClick={() => handleScrollBtn(false)} style={{ boxShadow: '0px 1px 4px rgba(0,0,0,.1607843137)' }}><IoIosArrowForward />
            </button>
          </div>
        </div>
      </div>
      <div className='w-full overflow-hidden h-[270px] mb-[5px] box-border relative' >
        <div className='relative carrousel overflow-y-hidden h-full overflow-x-hidden scroll-smooth' ref={refCarrousel}>
          <section className='flex gap-[10px] h-full items-center'>
            {children}
          </section>
        </div>
      </div>
    </div >
  )
}

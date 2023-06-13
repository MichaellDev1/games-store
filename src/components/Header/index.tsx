import { RiSearch2Line, RiNotification2Line } from 'react-icons/ri'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { TbShoppingBag } from 'react-icons/tb'
import Image from 'next/image'

export default function Header() {
    return <header className='flex items-center w-full justify-between h-[100px] gap-5 z-30'>
        <form className='relative flex-1'>
            <span className='absolute top-[7px] left-3 text-2xl text-[var(--texticon-color)]'>
                <RiSearch2Line />
            </span>
            <input type="text" name="keyword" placeholder='Search orders' className='text-[var(--texticon-color)] w-full placeholder:text-[var(--texticon-color)] px-12 py-[9px] bg-[var(--bg-icons)] rounded-xl text-[15px] font-light' />
        </form>

        <div className='flex-1 relative flex justify-end'>
            <div className='flex gap-3'>
                <button className='text-[var(--texticon-color)] bg-[var(--bg-icons)] text-[17px] p-3 rounded-full'>
                    <RiNotification2Line />
                </button>

                <button className='text-[var(--texticon-color)] bg-[var(--bg-icons)] text-[17px] p-3 rounded-full'>
                    <TbShoppingBag />
                </button>
            </div>
            <button className='flex gap-2 ml-3 cursor-pointer items-center'>
                <div className='text-[var(--texticon-color)] bg-[var(--bg-icons)] w-[39px] h-[39px] bg-white text-[17px] border border-[var(--color-gradient)] rounded-full overflow-hidden relative'>
                    <Image src={'https://www.getillustrations.com/photos/pack/3d-avatar-male_lg.png'} alt='image user' width={400} height={400} className='w-full h-full object-cover' />
                </div>
                <span className='text-[15px]'>Michael Santucho</span>
                <MdKeyboardArrowDown />
            </button>
        </div>
    </header>
}

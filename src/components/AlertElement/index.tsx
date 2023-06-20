import React from 'react'

export default function AlertElement({ message, positions }: any) {
    return <div className={`${positions} absolute  text-white z-30 w-max alert-element`}>
        <div className='py-[4px] px-2 bg-neutral-600 relative z-10 rounded-md '>
            <span className='text-[11px] font-normal relative' style={{lineHeight: '1'}}>{message}</span>
        </div>
        <span className='w-[10px] h-[10px] bg-neutral-600 absolute top-[-3px] rotate-45 left-0 right-0 m-auto'></span>
    </div>
}

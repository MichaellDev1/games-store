import React from 'react'

type Props = {
    menuHidden: boolean
}

export default function Menu({ menuHidden }: Props) {
    return <div className={`w-64 h-full fixed left-0 rounded-xl top-0 bg-white z-20 p-10 lg:left-0 ${menuHidden ? 'left-0' : 'left-full'}`}>

    </div>

}

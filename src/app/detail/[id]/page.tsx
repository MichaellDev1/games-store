'use client'
import React, { useEffect } from 'react'
import detailGAme from '@/detailGame.json'
import traillerGAme from '@/trailerGame.json'

export default function Detail({ params }: any) {
    const { id } = params
    useEffect(() => {
        console.log(detailGAme)
        console.log(traillerGAme)
    }, [id])
    return (
        <div>Detail</div>
    )
}

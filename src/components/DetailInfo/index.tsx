import React from 'react'
import { MdFavoriteBorder, MdOutlineFavorite } from 'react-icons/md'

export default function DetailInfo({ dataGame, handleFavorite, isFavorite }: any) {
    return <React.Fragment>

        <div className='flex-1 bg-[#202020] h-full rounded-xl flex flex-col justify-between p-8'>
            <div>
                <h2 className='text-2xl text-center font-medium'>{dataGame.name}</h2>
                <ul className='flex items-center gap-5 flex-wrap justify-center font-light text-neutral-300 text-sm my-3'>
                    {dataGame.genres && dataGame.genres.map((res: any) => (
                        <li key={res.id}>{res.name}</li>
                    ))}
                </ul>
            </div>
            <div className='mt-5 flex flex-col gap-6'>
                <div className='w-full flex justify-between items-center'>
                    <span className='uppercase font-normal text-sm'>Rating:</span>
                    <span className='text-xs font-light text-neutral-300'>{dataGame.rating}</span>
                </div>
                <div className='w-full flex justify-between items-center'>
                    <span className='uppercase font-normal text-sm'>Release date:</span>
                    <span className='text-xs font-light text-neutral-300'>{dataGame.released}</span>
                </div>
                <div className='w-full flex justify-between items-center'>
                    <span className='uppercase font-normal text-sm'>Developers:</span>
                    <ul>{dataGame.developers ? dataGame.developers.length > 0 ? (
                        dataGame.developers.map((res: any) => (
                            <li key={res.id} className='text-xs font-light text-neutral-300'>{res.name}</li>
                        ))
                    ) : <li key={dataGame.developers[0].id}>{dataGame.developers[0].name}</li> : null}</ul>
                </div>
            </div>

            <div className='w-full text-center'>
                <button className='py-3 px-5 w-full flex items-center justify-center rounded-lg bg-[--color-gradient] hover:bg-[#ff8d58] transition-all text-sm gap-2' onClick={() => handleFavorite(dataGame.id)}>
                    <span className='text-lg'>
                        {isFavorite ? <MdOutlineFavorite /> : <MdFavoriteBorder />}
                    </span>
                    Add Favorites
                </button>
            </div>

        </div>
    </React.Fragment>
}

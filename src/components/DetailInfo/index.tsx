import React from 'react'
import { MdFavoriteBorder, MdOutlineFavorite } from 'react-icons/md'

export default function DetailInfo({ dataGame, handleFavorite, isFavorite }: any) {
    return <React.Fragment>

        <div className='flex-1 bg-[#202020] h-full rounded-xl flex flex-col justify-between p-8'>
            <div>
                <h2 className='text-xl font-medium'>{dataGame.name}</h2>
                <ul className='flex items-center gap-5 flex-wrap my-3'>
                    {dataGame.genres.map((res: any) => (
                        <li key={res.id}>{res.name}</li>
                    ))}
                </ul>
            </div>
            <div className='mt-5 flex flex-col gap-6'>
                <div className='w-full flex justify-between items-center'>
                    <span>Rating:</span>
                    <span>{dataGame.rating}</span>
                </div>
                <div className='w-full flex justify-between items-center'>
                    <span>Release date:</span>
                    <span>{dataGame.released}</span>
                </div>
                <div className='w-full flex justify-between items-center'>
                    <span>Developers:</span>
                    <ul>{dataGame.developers.length > 0 ? (
                        dataGame.developers.map((res: any) => (
                            <li key={res.id}>{res.name}</li>
                        ))
                    ) : <li key={dataGame.developers[0].id}>{dataGame.developers[0].name}</li>}</ul>
                </div>
            </div>

            <div className='w-full text-center'>
                <button className='py-3 px-5 w-full flex items-center justify-center rounded-2xl bg-[--color-gradient] hover:bg-[#ff8d58] transition-all text-sm gap-2' onClick={() => handleFavorite(dataGame.id)}>
                    <span className='text-lg'>
                        {isFavorite ? <MdOutlineFavorite /> : <MdFavoriteBorder />}
                    </span>
                    Add Favorites
                </button>
            </div>

        </div>
    </React.Fragment>
}

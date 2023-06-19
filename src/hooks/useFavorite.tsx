"use client"
import { useEffect, useState } from 'react'

export default function useFavorite() {
  const [isFavorite, setIsFavorite] = useState(false)
  const [favorites, setFavorites] = useState<Array<any>>([])

  useEffect(() => {
    const localStorageFavorites: Array<any> = JSON.parse(localStorage.getItem('favorites'))
    if (localStorageFavorites) {
      setFavorites(localStorageFavorites)
    }
  }, [])

  const handleFavorite = (id: string) => {
    const localStorageFavorites: Array<any> = JSON.parse(localStorage.getItem('favorites'))

    if (localStorageFavorites) {
      const checked = localStorageFavorites.findIndex(idd => idd == id)

      if (checked !== -1) {
        const deleteId = localStorageFavorites.filter(id => id !== id)
        setIsFavorite(false)
        localStorage.setItem('favorites', JSON.stringify(deleteId))
        setFavorites(deleteId)
  
      } else {

        localStorage.setItem('favorites', JSON.stringify([...localStorageFavorites, id]))
        setIsFavorite(true)
        setFavorites(lastValue => [...lastValue, id])
      }

    } else {
      localStorage.setItem('favorites', JSON.stringify([id]))
      setIsFavorite(true)
      setFavorites(lastValue => [...lastValue, id])
    }
  }

  return { handleFavorite, isFavorite, setIsFavorite, favorites }
}

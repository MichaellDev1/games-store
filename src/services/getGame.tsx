import { api_url } from "./config"
const api_key = process.env.NEXT_PUBLIC_API_KEY

export const getGame = {
  getAllGames: () => {
    return fetch(`${api_url}/games?key=${api_key}`)
      .then(res => res.json())
  },
  getDetailGame: (id: string) => {
    return fetch(`${api_url}`)
      .then(res => res.json())
  },
  getPlataform: () => {
    return fetch(`${api_url}/platforms?key=${api_key}`)
      .then(res => res.json())
  },
  searchGame: ({ keyword }: { keyword: string }) => {
    return fetch(`${api_url}/search=${keyword}?key=${api_key}`)
      .then(res => res.json())
  },
  getAdditionsGame: ({ keyword }: { keyword: string }) => {
    return fetch(`${api_url}/games/${keyword}/additions?key=${api_key}`)
      .then(res => res.json())
  },
  getVideoYtGame: (id: string) => {
    return fetch(`${api_url}/games/${id}/youtube?key=${api_key}`)
      .then(res => res.json())
  },
  getTrailerGame: (id: string) => {
    return fetch(`${api_url}/games/${id}/movies?key=${api_key}`)
      .then(res => res.json())
  }
}
import { api_url } from "./config"
const api_key = process.env.NEXT_PUBLIC_API_KEY

export const getGame = {
  getAllGames: () => {
    return fetch(`${api_url}/games?key=${api_key}`)
      .then(res => res.json())
  },
  getDetailGame: (id: string) => {
    return fetch(`${api_url}/games/${id}?key=${api_key}`)
      .then(res => res.json())
  },
  getPlataform: () => {
    return fetch(`${api_url}/platforms?key=${api_key}`)
      .then(res => res.json())
  },
  searchGame: ({ keyword, page, size = 20 }: { keyword: string, page: number, size: number }) => {
    return fetch(`${api_url}/games?search=${keyword}&page_size=${size}&page=${page}&ordering=rating&key=${api_key}`)
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
  },
  getOrderBy: ({ ordering }: { ordering: string }) => {
    return fetch(`${api_url}/games?ordering=${ordering}&key=${api_key}`)
      .then(res => res.json())
  }
}
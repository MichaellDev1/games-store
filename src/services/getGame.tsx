import { api_url } from "./config"
const api_key = process.env.NEXT_PUBLIC_API_KEY

export const getGame = {
  getAllGames: (): Promise<Response> => {
    return fetch(`${api_url}/games?key=${api_key}`)
      .then(res => res.json())
  },
  getDetailGame: (id: string): Promise<Response> => {
    return fetch(`${api_url}/games/${id}?key=${api_key}`)
      .then(res => res.json())
  },
  getPlataform: (): Promise<Response> => {
    return fetch(`${api_url}/platforms?key=${api_key}`)
      .then(res => res.json())
  },
  searchGame: ({ keyword, page, size = 30 }: { keyword: string, page: number, size: number }): Promise<Response> => {
    return fetch(`${api_url}/games?search=${keyword}&page_size=${size}&page=${page}&ordering=rating&platforms_count=1&key=${api_key}`)
      .then(res => res.json())
  },
  getAdditionsGame: ({ keyword }: { keyword: string }): Promise<Response> => {
    return fetch(`${api_url}/games/${keyword}/additions?key=${api_key}`)
      .then(res => res.json())
  },
  getTrailerGame: (id: string): Promise<Response> => {
    return fetch(`${api_url}/games/${id}/movies?key=${api_key}`)
      .then(res => res.json())
  },
  getOrderBy: ({ ordering }: { ordering: string }): Promise<Response> => {
    return fetch(`${api_url}/games?ordering=${ordering}&key=${api_key}`)
      .then(res => res.json())
  },
  getScreeanShot: (id: string) => {
    return fetch(`${api_url}/games/${id}/screenshots?key=${api_key}`)
      .then(res => res.json())
  }
}

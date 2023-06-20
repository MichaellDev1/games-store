import { api_url } from "./config"
const api_key = process.env.NEXT_PUBLIC_API_KEY

export const getGame = {
  getAllGames: ({ page, size = 30, isRecent = false, date = null, platform = [], genrer = [] }: { page: number, size: number, isRecent: boolean, genrer: Array<string | null> | undefined, platform: Array<string | null> | undefined, date: null | Date | undefined }): Promise<Response> => {
    return fetch(`${api_url}/games?page_size=${size}&page=${page}${isRecent
      ? '&ordering=added'
      : ''}${platform.length > 0
        ? `&platforms=${platform.length > 1 ? platform.map(platform => platform) : platform[0] ? platform[0] : ''}`
        : ''}${genrer.length > 0
          ? `&genres=${genrer.length > 1 ? genrer.map(genre => genre) : genrer[0] ? genrer[0] : ''}`
          : ''}&key=${api_key}`)
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
  searchGame: ({ keyword, page, size = 30, isRecent = false, date = null, platform = [], genrer = [] }: { keyword: string, page: number, size: number, isRecent: boolean, genrer: Array<string | null> | undefined, platform: Array<string | null> | undefined, date: null | Date | undefined }): Promise<Response> => {
    return fetch(`${api_url}/games?search=${keyword}&page_size=${size}&page=${page}${isRecent
      ? '&ordering=added'
      : ''}${platform.length > 0
        ? `&platforms=${platform.length > 1 ? platform.map(platform => platform) : platform[0] ? platform[0] : ''}`
        : ''}${genrer.length > 0
          ? `&genres=${genrer.length > 1 ? genrer.map(genre => genre) : genrer[0] ? genrer[0] : ''}`
          : ''}&key=${api_key}`)
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
  },
  getByGenres: ({ id, page_size, page }: any) => {
    return fetch(`${api_url}/games?genres=${id}&page_size=${page_size}&page=${page}&key=${api_key}`)
      .then(res => res.json())
  },
  getAllGenres: () => {
    return fetch(`${api_url}/genres?key=${api_key}`)
      .then(res => res.json())
  }
}

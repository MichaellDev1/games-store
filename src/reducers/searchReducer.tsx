const initialStateSearch: any = () => ({
  genderFilter: [],
  platformFilter: [],
  genres: [],
  games: [],
})

const searchReducer = (state = initialStateSearch(), action: any = {}) => {
  switch (action.type) {
    case "ADD_GENRES_FILTER": {
      return {
        ...state,
        games: [],
        genderFilter: [...state.genderFilter, action.payload]
      }
    }
    case "DELETE_GENRE_FILTER": {
      const deleteGenre = state.genderFilter.filter((id: string) => id !== action.payload)
      return {
        ...state,
        games: [],
        genderFilter: deleteGenre
      }
    }
    case "DELETE_PLATFORM_FILTER": {
      const deletePlatform = state.genderFilter.filter((id: string) => id !== action.payload)
      return {
        ...state,
        games: [],
        platformFilter: deletePlatform
      }
    }
    case "ADD_PLATFORM_FILTER": {
      return {
        ...state,
        games: [],
        platformFilter: [...state.platformFilter, action.payload]
      }
    }
    case "ADD_GENRES": {
      return {
        ...state,
        genres: action.payload
      }
    }
    case "ADD_GAMES": {
      return {
        ...state,
        games: action.payload
          ? [...state.games, ...action.payload]
          : [...state.games]
      }
    }
    case "RESET_GAME": {
      const reset: Array<any> = []
      return {
        ...state,
        games: reset
      }
    }
    default: return state
  }
}

export { searchReducer, initialStateSearch }
const initialState = {
   videogames: [],
   allVideogames: [],
   videogameDetail: [],
   genres: [],
   platforms: [],
   loading: true,
}

function rootReducer(state = initialState, { type, payload }) {
   switch (type) {
      case 'GET_VIDEOGAMES':
         return {
            ...state,
            videogames: payload,
            allVideogames: payload,
            videogameDetail: [],
            loading: false,
         }
      case 'SEARCH_VIDEOGAME':
         return {
            ...state,
            videogames: payload,
            allVideogames: payload,
            loading: false,
         }
      case 'GET_VIDEOGAME_DETAILS':
         return {
            ...state,
            videogameDetail: payload,
            loading: false,
         }
      case 'POST_VIDEOGAME':
         return {
            ...state,
         }
      case 'GET_GENRES':
         return {
            ...state,
            genres: payload,
         }
      case 'GET_PLATFORMS':
         return {
            ...state,
            platforms: payload,
         }
      case 'FILTER_BY_API_OR_DB':
         const allVideogames = state.allVideogames
         const filteredVideogames =
            payload === 'created'
               ? allVideogames.filter(game => game.createdOnDb)
               : allVideogames.filter(game => typeof game.id === 'number')
         return {
            ...state,
            videogames: payload === 'all' ? allVideogames : filteredVideogames,
         }
      case 'ORDER':
         let orderedGames
         if (payload === 'descA') {
            orderedGames = state.videogames.sort((a, b) => {
               if (a.name.toLowerCase() < b.name.toLowerCase()) return 1   // a comes first
               if (a.name.toLowerCase() > b.name.toLowerCase()) return -1  // b comes first
               return 0                                                    // a and b are equal
            })
         }
         if (payload === 'ascA') {
            orderedGames = state.videogames.sort((a, b) => {
               if (a.name.toLowerCase() < b.name.toLowerCase()) return -1
               if (a.name.toLowerCase() > b.name.toLowerCase()) return 1
               return 0
            })
         }
         if (payload === 'descR') {
            orderedGames = state.videogames.sort((a, b) => {
               return a.rating - b.rating
            })
         }
         if (payload === 'ascR') {
            orderedGames = state.videogames.sort((a, b) => {
               return b.rating - a.rating
            })
         }
         return {
            ...state,
            videogames: orderedGames,
         }
      case 'FILTER_BY_GENRE':
         const allGames = state.allVideogames
         const dbFilter = allGames.filter(game => game.genres.find(g => (g.name === payload ? game : null)))
         // console.log(dbFilter)
         const apiFilter = allGames.filter(game => game.genres.includes(payload))
         return {
            ...state,
            videogames: payload === 'All' ? allGames : apiFilter.concat(dbFilter),
         }
      case 'LOADING': {
         return {
            ...state,
            loading: true,
         }
      }
      default:
         return state
   }
}

export default rootReducer

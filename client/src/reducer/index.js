const initialState = {
   videogames: [],
   allVideogames: [],
}

function rootReducer(state = initialState, {type, payload}) {
   switch (type) {
      case 'GET_VIDEOGAMES':
         return {
            ...state,
            videogames: payload,
            allVideogames: payload,
         }
      case 'FILTER_BY_API_OR_DB':
         const allVideogames = state.allVideogames
         const filteredVideogames =
            payload === 'created'
               ? allVideogames.filter(game => game.createdOnDb)
               : allVideogames.filter(game => typeof game.id === 'number')
         return {
            ...state,
            videogames:
               payload === 'all' ? state.allVideogames : filteredVideogames,
         }
      case 'ORDER':
         let orderedGames
         if (payload === 'descA') {
            orderedGames = state.videogames.sort((a, b) => {
               if (a.name.toLowerCase() < b.name.toLowerCase()) return 1
               if (a.name.toLowerCase() > b.name.toLowerCase()) return -1
               return 0
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
               if (a.rating < b.rating) return 1
               if (a.rating > b.rating) return -1
               return 0
            })
         }
         if (payload === 'ascR') {
            orderedGames = state.videogames.sort((a, b) => {
               if (a.rating < b.rating) return -1
               if (a.rating > b.rating) return 1
               return 0
            })
         }

         return {
            ...state,
            videogames: orderedGames,
         }
      default:
         return state
   }
}

export default rootReducer

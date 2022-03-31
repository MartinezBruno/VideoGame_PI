import axios from 'axios'

export const getVideogames = () => dispatch => {
   // try {
   //    dispatch({type: 'LOADING', payload: 'Searching games'})
   //    var json = await axios.get('/videogames')
   //    // console.log(json, 'videogames')
   //    return dispatch({
   //       type: 'GET_VIDEOGAMES',
   //       payload: json.data,
   //    })
   // } catch (error) {
   //    console.log(error)
   // }

   axios
      .get('/videogames')
      .then(json => {
         return dispatch({type: 'GET_VIDEOGAMES', payload: json.data})
      })
      .catch(error => {
         console.log(error)
      })
}

export const searchGameByName = name => async dispatch => {
   try {
      const json = await axios.get(`/videogames?name=${name}`)
      console.log(json.data)
      return dispatch({
         type: 'SEARCH_VIDEOGAME',
         payload: json.data,
      })
   } catch (error) {
      console.log(error)
   }
}

export const getVideogameDetails = id => async dispatch => {
   try {
      var json = await axios.get(`/videogame/${id}`)
      // console.log(json.data, 'videogame details')
      return dispatch({
         type: 'GET_VIDEOGAME_DETAILS',
         payload: json.data,
      })
   } catch (error) {
      console.log(error)
   }
}

export const getGenres = () => dispatch => {
   // var json = await axios.get('/genres')
   // console.log(json.data, 'genres')
   // return dispatch({
   //    type: 'GET_GENRES',
   //    payload: json.data,
   // })
   axios
      .get('/genres')
      .then(res => {
         return dispatch({type: 'GET_GENRES', payload: res.data})
      })
      .catch(error => console.log(error))
}

export const filterByApiOrDb = payload => async dispatch => {
   try {
      // console.log(payload, 'filterByDbOrApi ACTION')
      dispatch({
         type: 'FILTER_BY_API_OR_DB',
         payload,
      })
   } catch (error) {
      console.log(error)
   }
}

export const order = payload => async dispatch => {
   try {
      dispatch({
         type: 'ORDER',
         payload,
      })
   } catch (error) {
      console.log(error)
   }
}

export const filterByGenre = payload => async dispatch => {
   try {
      dispatch({
         type: 'FILTER_BY_GENRE',
         payload,
      })
   } catch (error) {
      console.log(error)
   }
}

export const postVideoGame = videogame => async dispatch => {
   try {
      let newVideoGame = await axios.post('/videogame', videogame)
      return dispatch({
         type: 'POST_VIDEOGAME',
         payload: newVideoGame.data,
      })
   } catch (error) {
      console.log(error)
   }
}

export const platformsOptions = [
   {id: 1, name: 'PC'},
   {id: 2, name: 'PLAYSTATION 5'},
   {id: 3, name: 'XBOX ONE'},
   {id: 4, name: 'PLAYSTATION 4'},
   {id: 5, name: 'XBOX SERIES S/X'},
   {id: 6, name: 'NINTENDO SWITCH'},
   {id: 7, name: 'IOS'},
   {id: 8, name: 'ANDROID'},
   {id: 9, name: 'NINTENDO 3DS'},
   {id: 10, name: 'NINTENDO DS'},
   {id: 11, name: 'NINTENDO DSI'},
   {id: 12, name: 'MACOS'},
   {id: 13, name: 'LINUX'},
   {id: 14, name: 'XBOX 360'},
   {id: 15, name: 'XBOX'},
   {id: 16, name: 'PLAYSTATION 3'},
   {id: 17, name: 'PLAYSTATION 2'},
   {id: 18, name: 'PLAYSTATION'},
   {id: 19, name: 'PS VITA'},
   {id: 20, name: 'PSP'},
   {id: 21, name: 'WII U'},
   {id: 22, name: 'WII'},
   {id: 23, name: 'GAMECUBE'},
   {id: 24, name: 'NINTENDO 64'},
   {id: 25, name: 'GAME BOY ADVANCE'},
   {id: 26, name: 'GAME BOY COLOR'},
   {id: 27, name: 'GAME BOY'},
   {id: 28, name: 'SNES'},
   {id: 29, name: 'NES'},
   {id: 30, name: 'CLASSIC MACINTOSH'},
   {id: 31, name: 'APPLE II'},
   {id: 32, name: 'COMMODORE / AMIGA'},
   {id: 33, name: 'ATARI 7800'},
   {id: 34, name: 'ATARI 5200'},
   {id: 35, name: 'ATARI 2600'},
   {id: 36, name: 'ATARI FLASHBACK'},
   {id: 37, name: 'ATARI 8-BIT'},
   {id: 38, name: 'ATARI ST'},
   {id: 39, name: 'ATARI LYNX'},
   {id: 40, name: 'ATARI XEGS'},
   {id: 41, name: 'GENESIS'},
   {id: 42, name: 'SEGA SATURN'},
   {id: 43, name: 'SEGA CD'},
   {id: 44, name: 'SEGA 32X'},
   {id: 45, name: 'SEGA MASTER SYSTEM'},
   {id: 46, name: 'DREAMCAST'},
   {id: 47, name: '3DO'},
   {id: 48, name: 'JAGUAR'},
   {id: 49, name: 'GAME GEAR'},
   {id: 50, name: 'NEO GEO'},
   {id: 51, name: 'WEB'},
]

import axios from 'axios'

export const getVideogames = () => dispatch => {
  axios
  .get('/videogames')
      .then(json => {
         return dispatch({ type: 'GET_VIDEOGAMES', payload: json.data })
      })
      .catch(error => {
         console.log(error)
      })
}

export const searchGameByName = name => async dispatch => {
   try {
      const json = await axios.get(`/videogames?name=${name}`)
      // console.log(json.data)
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

export const getGenres = () => async dispatch => {
   var json = await axios.get('/genres')
   // console.log(json.data, 'genres')
   return dispatch({
      type: 'GET_GENRES',
      payload: json.data,
   })
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

export const orderBy = payload => async dispatch => {
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
export const getPlatforms = () => async dispatch => {
   try {
      let games = (await axios.get('/videogames')).data
      let allPlatforms = games.map(p => p.platforms)
      let platforms = [...new Set(allPlatforms.flat())]
      // console.log(platforms, 'platforms')
      return dispatch({
         type: 'GET_PLATFORMS',
         payload: platforms,
      })
   } catch (error) {
      console.log(error)
   }
}
export const LoaderToTrue = () => dispatch => {
   dispatch({
      type: 'LOADING',
   })
}

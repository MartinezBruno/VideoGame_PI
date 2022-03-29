import axios from 'axios'

export const getVideogames = () => async dispatch => {
   var json = await axios.get('/videogames')
   // console.log(json, 'videogames')
   return dispatch({
      type: 'GET_VIDEOGAMES',
      payload: json.data,
   })
}
export const getGenres = () => async dispatch => {
   var json = await axios.get('/genres')
   console.log(json.data, 'genres')
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

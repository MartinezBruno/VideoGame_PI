import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getVideogameDetails } from '../../actions'
import image from '../Images/img-not-found.jpg'
import loading from '../Images/loading.gif'

function Detail() {
   const {id} = useParams()
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(getVideogameDetails(id))
   }, [dispatch, id])

   const gameDetail = useSelector(state => state.videogameDetail)

   if (gameDetail.id !== undefined) {
      return (
         <div className="videogame-detail">
            <div className="img-detail">
               <img
                  src={gameDetail.image ? gameDetail.image : image}
                  alt={gameDetail.name}
                  width="450px"
               />
            </div>
            <h2 className="name-detail">{gameDetail.name}</h2>
            <p className="rating-detail">Rating: {gameDetail.rating}</p>
            <p className="released-detail">Released: {gameDetail.released}</p>
            <div>
               <h4 className="genres-detail">Genres</h4>
               {gameDetail.genres ? (
                  gameDetail.genres.map((genre, index) => (
                     <div key={index} className="genreMap-detail">
                        <p>{genre}</p>
                     </div>
                  ))
               ) : (
                  <p className="error-detail">
                     "No hay generos disponibles para mostrar"
                  </p>
               )}
            </div>
            <div>
               <h4 className="platfroms-detail">Platforms</h4>
               {gameDetail.platforms ? (
                  gameDetail.platforms.map((plat, index) => (
                     <div key={index}>
                        <p>{plat}</p>
                     </div>
                  ))
               ) : (
                  <p className="error-detail">
                     No hay plataformas disponibles para mostrar
                  </p>
               )}
            </div>
            <div>
               <h4 className="description-detail">Description</h4>
               {gameDetail.description ? <>{gameDetail.description}</> : <></>}
            </div>
         </div>
      )
   } else {
      return (
         <div className="videogame-detail">
            <div className="img-detail">
               <img src={loading} alt="loading" className="loading" />
            </div>
            <h2 className="name-detail">Loading...</h2>
            <p className="rating-detail">Loading...</p>
            <p className="released-detail">Loading...</p>
            <div>
               <h4 className="genres-detail">Loading...</h4>
               <p className="error-detail">Loading...</p>
            </div>
            <div>
               <h4 className="platfroms-detail">Loading...</h4>
               <p className="error-detail">Loading...</p>
            </div>
            <div>
               <h4 className="description-detail">Loading...</h4>
               <p className="error-detail">Loading...</p>
            </div>
         </div>
      )
   }
}

export default Detail

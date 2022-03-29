import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {getVideogameDetails} from '../../actions'
import Block from '../Loading/Block'

function Detail() {
   const {id} = useParams()
   const dispatch = useDispatch()
   const [detail] = useState(id)

   useEffect(() => {
      dispatch(getVideogameDetails(detail))
   }, [dispatch, detail])

   const gameDetail = useSelector(state => state.videogameDetail)
   return (
      <div>
         <div className="container">
            {gameDetail ? (
               <>
                  <div className="img-detail">
                     <img
                        src={gameDetail.image}
                        alt={gameDetail.name}
                        width="450px"
                     />
                  </div>
                  <h1 className="name-detail">{gameDetail.name}</h1>
                  <p className="rating-detail">Rating: {gameDetail.rating}</p>
                  <p className="released-detail">
                     Released: {gameDetail.released}
                  </p>
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
                     {gameDetail.description ? (
                        <>{gameDetail.description}</>
                     ) : (
                        <></>
                     )}
                  </div>
               </>
            ) : (
               <Block />
            )}
         </div>
      </div>
   )
}

export default Detail

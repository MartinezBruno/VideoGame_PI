import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getVideogameDetails, LoaderToTrue } from '../../actions'
import image from '../Images/img-not-found.jpg'
import Loader from '../Loader/Loader'
import './Detail.css'

function Detail() {
   const { id } = useParams()
   const dispatch = useDispatch()
   const gameDetail = useSelector(state => state.videogameDetail)
   const loader = useSelector(state => state.loading)
   useEffect(() => {
      dispatch(getVideogameDetails(id))
      return () => {
         dispatch(LoaderToTrue())
      }
   }, [dispatch, id])


   return (
      <div className="container">
         {loader ? (
            <Loader />
         ) : (
            <>
               {gameDetail.id ? (
                  <div className="container-detail">
                     <div className="tarjeta">
                        <div className="tarjeta-image">
                           <img
                              src={gameDetail.image ? gameDetail.image : image}
                              alt={gameDetail.image ? gameDetail.name : 'Not found'}
                              width="400px"
                              heigth="290px"
                           />
                        </div>
                        <div className="tarjeta-text">
                           <h2>{gameDetail.name}</h2>
                           <p>
                              Genres:
                              {gameDetail.createdOnDb
                                 ? gameDetail.genres.map((genre, index) => <span key={index}> - {genre.name}</span>)
                                 : gameDetail.genres.map((genre, index) => <span key={index}> - {genre}</span>)}
                           </p>
                           <h4 className="sub-title">Description:</h4>
                           {<p className="descrpiton" dangerouslySetInnerHTML={{ __html: gameDetail.description }} />}
                           <p>Released: {gameDetail.released}</p>
                           <p>Rating: {gameDetail.rating}/5</p>
                           <p>
                              Platforms:
                              {gameDetail.platforms.map((plat, index) => (
                                 <span key={index}> - {plat}</span>
                              ))}
                           </p>
                        </div>
                     </div>
                  </div>
               ) : (
                  <p>Lamentablemete la informacion no se puede mostrar, intente ir al inicio y volver a intentarlo</p>
               )}
            </>
         )}
      </div>
   )
}

export default Detail

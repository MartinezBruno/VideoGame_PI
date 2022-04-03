import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import {getVideogameDetails} from '../../actions'
import image from '../Images/img-not-found.jpg'
import loading from '../Images/loading.gif'
import './Detail.css'

function Detail() {
   const {id} = useParams()
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(getVideogameDetails(id))
   }, [dispatch, id])

   const gameDetail = useSelector(state => state.videogameDetail)

   return (
      <>
         {gameDetail.id ? (
            <div className="container-detail">
               <div className="tarjeta">
                  <div className="tarjeta-image">
                     <img
                        src={gameDetail.image ? gameDetail.image : image}
                        alt="img not found"
                        width="400px"
                        heigth="290px"
                     />
                  </div>
                  <div className="tarjeta-text">
                     <h3>{gameDetail.name}</h3>
                     <p>
                        Genres:
                        {gameDetail.createdOnDb
                           ? gameDetail.genres.map((genre, index) => <span key={index}> - {genre.name}</span>)
                           : gameDetail.genres.map((genre, index) => <span key={index}> - {genre}</span>)}
                     </p>
                     <h4 className="sub-title">Description:</h4>
                     {<p className="descrpiton" dangerouslySetInnerHTML={{__html: gameDetail.description}} />}
                     <p>Released: {gameDetail.released}</p>
                     <p>Rating: {gameDetail.rating}</p>
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
            <div>
               <img src={loading} alt="" />
            </div>
         )}
      </>
   )
}

export default Detail

import React from 'react'
import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getVideogames, getGenres, order} from '../../actions'
import NavBar from '../NavBar/NavBar'
import Card from '../Card/Card'
import Paged from '../Paged/Paged'

import FilterAPIorDB from '../Filters/FilterAPIorDB'
import FilterGenres from '../Filters/FilterGenres'

function Home() {
   const dispatch = useDispatch() //Dispatch para ejecutar las acciones
   const allVideoGames = useSelector(state => state.videogames)
   const [currentPage, setCurrentPage] = useState(1) //Pagina actual
   const [gamesPerPage, setGamesPerPage] = useState(15) //Cantidad de videojuegos por pagina
   const indexOfLastGame = currentPage * gamesPerPage //15 (Seteo indice del ultimo videojuego)
   const indexOfFirstGame = indexOfLastGame - gamesPerPage //0 (Seteo indice del primer videojuego)

   const currentGames = allVideoGames.slice(indexOfFirstGame, indexOfLastGame) //Seteo los videojuegos que se van a mostrar
   // console.log(currentGames)
   const paged = pageNumber => {
      setCurrentPage(pageNumber) //Seteo la pagina actual
   }

   useEffect(
      () => {
         dispatch(getVideogames()) //Ejecuto la accion
         dispatch(getGenres())
      },
      [dispatch], //siempre que cambie el dispatch
   )

   const [orderAlphabetical, setOrderAlphabetical] = useState('')

   const handleAlphabetical = e => {
      dispatch(order(e.target.value))
      setCurrentPage(1)
      setOrderAlphabetical('Order' + e.target.value)
   }

   const [orderByRating, setOrderByRating] = useState('')

   const handleRating = e => {
      dispatch(order(e.target.value))
      setCurrentPage(1)
      setOrderByRating('Order' + e.target.value)
   }

   return (
      <div>
         <NavBar />
         <div>
            <div>
               <select defaultValue={''} onChange={e => handleRating(e)}>
                  <option value="" disabled>
                     Orden por rating
                  </option>
                  <option value="ascR">Ascendente</option>
                  <option value="descR">Descendente</option>
               </select>
               <select defaultValue={''} onChange={e => handleAlphabetical(e)}>
                  <option value="" disabled>
                     Orden Alfabetico
                  </option>
                  <option value="ascA">A/Z</option>
                  <option value="descA">Z/A</option>
               </select>
               <FilterAPIorDB />
               <FilterGenres />
            </div>
            <Paged
               gamesPerPage={gamesPerPage}
               allVideoGames={allVideoGames.length}
               paged={paged}
            />

            {currentGames?.map(game => {
               return (
                  <Card
                     key={game.id}
                     id={game.id}
                     name={game.name}
                     image={game.image}
                     genres={
                        !game.createdOnDb
                           ? game.genres.map((genre, index) => (
                                <li key={index}>{genre}</li>
                             ))
                           : game.genres.map((genre, index) => (
                                <li key={index}>{genre.name}</li>
                             ))
                     }
                  />
               )
            })}
         </div>
      </div>
   )
}

export default Home

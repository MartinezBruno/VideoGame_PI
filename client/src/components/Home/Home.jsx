import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getGenres, getVideogames, order } from '../../actions'
import Card from '../Card/Card'
import FilterAPIorDB from '../Filters/FilterAPIorDB'
import FilterGenres from '../Filters/FilterGenres'
import image from '../Images/img-not-found.jpg'
import loading from '../Images/loading.gif'
import NavBar from '../NavBar/NavBar'
import Paged from '../Paged/Paged'

function Home() {
   const dispatch = useDispatch() //Dispatch para ejecutar las acciones
   const allVideoGames = useSelector(state => state.videogames)
   const searchedGames = useSelector(state => state.videogameSearched)
   const [currentPage, setCurrentPage] = useState(1) //Pagina actual
   const [gamesPerPage] = useState(15) //Cantidad de videojuegos por pagina
   const indexOfLastGame = currentPage * gamesPerPage //15 (Seteo indice del ultimo videojuego)
   const indexOfFirstGame = indexOfLastGame - gamesPerPage //0 (Seteo indice del primer videojuego)

   const currentGames = allVideoGames.slice(indexOfFirstGame, indexOfLastGame) //Seteo los videojuegos que se van a mostrar
   const currentGamesSearch = searchedGames.slice(
      indexOfFirstGame,
      indexOfLastGame,
   )
   // console.log(currentGames)
   const paged = pageNumber => {
      setCurrentPage(pageNumber) //Seteo la pagina actual
   }

   const [, setOrderAlphabetical] = useState('')

   const handleAlphabetical = e => {
      dispatch(order(e.target.value))
      setCurrentPage(1)
      setOrderAlphabetical('Order' + e.target.value)
   }

   const [, setOrderByRating] = useState('')

   const handleRating = e => {
      dispatch(order(e.target.value))
      setCurrentPage(1)
      setOrderByRating('Order' + e.target.value)
   }

   useEffect(
      () => {
         dispatch(getVideogames()) //Ejecuto la accion
         dispatch(getGenres())
      },
      [dispatch], //siempre que cambie el dispatch
   )
   if (currentGamesSearch.length > 0) {
      return (
         <>
            <NavBar />
            <Paged
               gamesPerPage={gamesPerPage}
               allVideoGames={searchedGames.length}
               paged={paged}
            />
            {currentGamesSearch.map(game => (
               <Card
                  key={game.id}
                  id={game.id}
                  image={game.image ? game.image : image}
                  name={game.name}
                  genres={
                     game.createdOnDb
                        ? game.genres.map((genre, index) => (
                             <li key={index}>{genre.name}</li>
                          ))
                        : game.genres.map((genre, index) => (
                             <li key={index}>{genre}</li>
                          ))
                  }
               />
            ))}
         </>
      )
   } else {
      return (
         <>
            {currentGames.length > 0 ? (
               <>
                  <NavBar />
                  <div>
                     <select defaultValue={''} onChange={e => handleRating(e)}>
                        <option value="" disabled>
                           Orden por rating
                        </option>
                        <option value="ascR">Ascendente</option>
                        <option value="descR">Descendente</option>
                     </select>
                     <select
                        defaultValue={''}
                        onChange={e => handleAlphabetical(e)}
                     >
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
                  {currentGames.map(game => (
                     <Card
                        key={game.id}
                        id={game.id}
                        image={game.image ? game.image : image}
                        name={game.name}
                        genres={
                           game.createdOnDb
                              ? game.genres.map((genre, index) => (
                                   <li key={index}>{genre.name}</li>
                                ))
                              : game.genres.map((genre, index) => (
                                   <li key={index}>{genre}</li>
                                ))
                        }
                     />
                  ))}
                  <Paged
                     gamesPerPage={gamesPerPage}
                     allVideoGames={allVideoGames.length}
                     paged={paged}
                  />
               </>
            ) : (
               <div>
                  <img src={loading} alt="loading" className="loading" />
               </div>
            )}
         </>
      )
   }
}

export default Home

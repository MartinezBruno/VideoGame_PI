import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getGenres, getVideogames, LoaderToTrue, orderBy } from '../../actions'
import Card from '../Card/Card'
import imgNotFound from '../Images/img-not-found.jpg'
import Loader from '../Loader/Loader'
import NavBar from '../NavBar/NavBar'
import Paged from '../Paged/Paged'
import './Home.css'

function Home() {
  const dispatch = useDispatch() //Dispatch para ejecutar las acciones
  const allVideoGames = useSelector((state) => state.videogames)
  const loader = useSelector((state) => state.loading)
  const [currentPage, setCurrentPage] = useState(1) //Pagina actual
  const [gamesPerPage] = useState(15) //Cantidad de videojuegos por pagina
  const indexOfLastGame = currentPage * gamesPerPage //15 (Seteo indice del ultimo videojuego)
  const indexOfFirstGame = indexOfLastGame - gamesPerPage //0 (Seteo indice del primer videojuego)

  const currentGames = allVideoGames.slice(indexOfFirstGame, indexOfLastGame) //Seteo los videojuegos que se van a mostrar

  // console.log(currentGames)
  const paged = (pageNumber) => {
    setCurrentPage(pageNumber) //Seteo la pagina actual
  }

  const [, setOrder] = useState('')

  const handleOrder = (e) => {
    e.preventDefault()
    dispatch(orderBy(e.target.value))
    paged(1)
    setOrder(e.target.value)
  }

  const handleRefresh = (e) => {
    e.preventDefault()
    dispatch(getVideogames())
    dispatch(getGenres())
    dispatch(LoaderToTrue())
    paged(1)
    // console.log('Recargando pagina mi rey')
  }

  useEffect(
    () => {
      dispatch(getVideogames()) //Ejecuto la accion
      dispatch(getGenres())
      // console.log('Ejecutando useEffect')
      return () => {
        dispatch(LoaderToTrue())
      }
    },
    [dispatch] //siempre que cambie el dispatch
  )

  return (
    <div className='container'>
      <NavBar order={handleOrder} refresh={handleRefresh} paged={paged} />
      {loader ? (
        <Loader />
      ) : (
        <>
          {currentGames.length > 0 ? (
            <div>
              <Paged gamesPerPage={gamesPerPage} allVideoGames={allVideoGames.length} paged={paged} currentPage={currentPage} />
              <div className='cards'>
                {currentGames.map((game) => (
                  <Card
                    key={game.id}
                    id={game.id}
                    image={game.image ? game.image : imgNotFound}
                    name={game.name}
                    genres={
                      game.createdOnDb
                        ? game.genres.map((genre, index) => <li key={index}>{genre.name}</li>)
                        : game.genres.map((genre, index) => <li key={index}>{genre}</li>)
                    }
                  />
                ))}
              </div>
              <Paged gamesPerPage={gamesPerPage} allVideoGames={allVideoGames.length} paged={paged} />
            </div>
          ) : (
            <h2 style={{ color: 'white' }}>Not Found</h2>
          )}
        </>
      )}
    </div>
  )
}

export default Home

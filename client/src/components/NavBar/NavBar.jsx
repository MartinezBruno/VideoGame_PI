import React from 'react'
import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getVideogames} from '../../actions'
import {Link} from 'react-router-dom'

import SearchBar from '../SearchBar/SearchBar'

function NavBar() {
   const dispatch = useDispatch()

   let handleOnClick = e => {
      e.preventDefault()
      dispatch(getVideogames())
   }

   return (
      <div>
         <Link to="/videogame">Crear Videojuego</Link>
         <h1>Aguante boquita papá</h1>
         <button onClick={e => handleOnClick(e)}>
            Volver a cargar los videojuegos
         </button>
         <SearchBar />
      </div>
   )
}

export default NavBar

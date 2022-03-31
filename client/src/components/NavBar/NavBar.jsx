import React from 'react'
import {useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {getVideogames} from '../../actions'
import SearchBar from '../SearchBar/SearchBar'

function NavBar() {
   const dispatch = useDispatch()

   let handleOnClick = e => {
      e.preventDefault()
      dispatch(getVideogames())
   }

   return (
      <div>
         <Link to="/videogame" style={{textDecoration: 'none'}}>
            Crear Videojuego
         </Link>
         <h1>Videogames SPA</h1>
         <button onClick={e => handleOnClick(e)}>Reload</button>
         <SearchBar />
      </div>
   )
}

export default NavBar

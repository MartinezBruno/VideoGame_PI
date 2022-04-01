import React from 'react'
import {Link} from 'react-router-dom'
import FilterAPIorDB from '../Filters/FilterAPIorDB'
import FilterGenres from '../Filters/FilterGenres'
import SearchBar from '../SearchBar/SearchBar'

function NavBar({order, refresh, setCurrentPage}) {
   return (
      <div>
         <Link to="/videogame" style={{textDecoration: 'none'}}>
            Crear Videojuego
         </Link>
         <h1>Videogames SPA</h1>
         <SearchBar />
         <button onClick={refresh}>Reload</button>
         <FilterAPIorDB />
         <FilterGenres />
         <select defaultValue={''} onChange={order}>
            <option value="" disabled>
               Order By:
            </option>
            <option value="ascA">Ascendente</option>
            <option value="descA">Descendente</option>
            <option value="ascR">Rating +</option>
            <option value="descR">Rating -</option>
         </select>
      </div>
   )
}

export default NavBar

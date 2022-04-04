import React from 'react'
import { Link } from 'react-router-dom'
import FilterAPIorDB from '../Filters/FilterAPIorDB'
import FilterGenres from '../Filters/FilterGenres'
import SearchBar from '../SearchBar/SearchBar'
import './NavBar.css'

function NavBar({ order, refresh }) {
   return (
      <div className="nav-bar">
         <Link to="/videogame">Crear Videojuego</Link>
         <h1>Videogames SPA</h1>
         <div className="nav">
            <SearchBar />
            <button onClick={refresh} className="reload-button">
               Reload Page
            </button>
            <FilterGenres />
            <FilterAPIorDB />
            <select defaultValue={''} onChange={order} className="select">
               <option value="" disabled>
                  Order By:
               </option>
               <option value="ascA">Ascendente</option>
               <option value="descA">Descendente</option>
               <option value="ascR">Rating +</option>
               <option value="descR">Rating -</option>
            </select>
         </div>
      </div>
   )
}

export default NavBar

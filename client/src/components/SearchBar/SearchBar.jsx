import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { searchGameByName } from '../../actions/'
import './SearchBar.css'

function SearchBar() {
   const dispatch = useDispatch()
   const [videogame, setVidegame] = useState('')

   const handleSubmit = e => {
      e.preventDefault()
      dispatch(searchGameByName(videogame))
      setVidegame('')
   }

   const handleInputChange = e => {
      e.preventDefault()
      setVidegame(e.target.value)
   }

   return (
      <div className="searchBar">
         <form className="searchForm" onSubmit={e => handleSubmit(e)}>
            <input
               type="text"
               placeholder="Search a videogame..."
               onChange={e => handleInputChange(e)}
               value={videogame}
            />
            <button type="submit">Search</button>
         </form>
      </div>
   )
}

export default SearchBar

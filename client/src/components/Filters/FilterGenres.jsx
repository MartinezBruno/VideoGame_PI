import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useState} from 'react'
import {filterByGenre} from '../../actions'

function FilterGenres() {
   const dispatch = useDispatch()
   const genres = useSelector(state => state.genres)
   const [, setCurrentPage] = useState(1)
   const [, setFilterByGenre] = useState('')

   const handleGenre = e => {
      e.preventDefault()
      dispatch(filterByGenre(e.target.value))
      setCurrentPage(1)
      setFilterByGenre('FilterByGenre' + e.target.value)
   }
   return (
      <div className="select">
         <select defaultValue={''} onChange={e => handleGenre(e)}>
            <option value="" disabled>
               Filter by Genre:
            </option>
            <option value="All">All</option>
            {genres
               ?.sort((a, b) => {
                  if (a.name.toLowerCase() < b.name.toLowerCase()) return -1
                  if (a.name.toLowerCase() > b.name.toLowerCase()) return 1
                  return 0
               })
               .map(genre => {
                  return (
                     <option value={genre.name} key={genre.id}>
                        {genre.name}
                     </option>
                  )
               })}
         </select>
      </div>
   )
}

export default FilterGenres

import React from 'react'
import {useDispatch} from 'react-redux'
import {filterByApiOrDb} from '../../actions'

function FilterAPIorDB() {
   const dispatch = useDispatch()
   const handleChange = e => {
      dispatch(filterByApiOrDb(e.target.value))
   }
   return (
      <div>
         <select defaultValue={''} onChange={e => handleChange(e)}>
            <option value="" disabled>
               Filter by DB/API
            </option>
            <option value="all">Todos</option>
            <option value="api">Existentes</option>
            <option value="created">Creados</option>
         </select>
      </div>
   )
}

export default FilterAPIorDB

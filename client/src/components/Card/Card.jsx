import React from 'react'
import {Link} from 'react-router-dom'

function Card({name, image, genres, id}) {
   return (
      <div>
         <Link to={`/videogames/${id}`}>
            <h3>{name}</h3>
            <img src={image} alt="not found" width="250px" height="250px" />
            <h5>{genres}</h5>
         </Link>
      </div>
   )
}

export default Card

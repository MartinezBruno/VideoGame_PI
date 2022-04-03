import React from 'react'
import {Link} from 'react-router-dom'
import './Card.css'

function Card({name, image, genres, id}) {
   return (
      <div className="card">
         <Link to={`/videogames/${id}`} style={{textDecoration: 'none', color: 'white'}}>
            <h3>{name}</h3>
            <img src={image} alt={name} />
            <h5>{genres}</h5>
         </Link>
      </div>
   )
}

export default Card

import React from 'react'
import {Link} from 'react-router-dom'

function LandingPage() {
   return (
      <div className="landing-page">
         <h1>Welcome to my Videogame SPA</h1>
         <Link to="/home">
            <button>Ir al inicio</button>
         </Link>
      </div>
   )
}

export default LandingPage

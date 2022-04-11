import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getVideogames } from '../../actions'
import './LandingPage.css'
function LandingPage() {
   const dispatch = useDispatch()

   //Para que cargue mas rapido la pagina la primera vez que se cargue
   useEffect(() => {
      dispatch(getVideogames())
   }, [dispatch])
   return (
      <div className="landing-page">
         <div className="landing-button">
            <Link to="/home" style={{textDecoration:"none"}}>
               <p className="button">
                  Ir al inicio
                  <div className="icon">
                     <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M4 9h8v-3.586a1 1 0 0 1 1.707 -.707l6.586 6.586a1 1 0 0 1 0 1.414l-6.586 6.586a1 1 0 0 1 -1.707 -.707v-3.586h-8a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1z" />
                     </svg>
                  </div>
               </p>
            </Link>
         </div>
      </div>
   )
}

export default LandingPage

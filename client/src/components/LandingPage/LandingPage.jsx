import React from 'react'
import {Link} from 'react-router-dom'
import './LandingPage.css'
function LandingPage() {
   return (
      <>
         <div className="landing-page">
            <div className="landing-text">
               <p>Welcome to my Videogame SPA</p>
            </div>
         </div>
         <div className="landing-button">
            <Link to="/home">
               <button class="cssbuttons-io-button">
                  Ir al inicio
                  <div class="icon">
                     <svg
                        height="24"
                        width="24"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                     >
                        <path d="M0 0h24v24H0z" fill="none"></path>
                        <path
                           d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                           fill="currentColor"
                        ></path>
                     </svg>
                  </div>
               </button>
            </Link>
         </div>
      </>
   )
}

export default LandingPage

import React from 'react'
import loading from '../Images/loading.gif'

function Loader() {
   return (
      <div>
         <img src={loading} alt="loader" />
         <h1>Loading...</h1>
      </div>
   )
}

export default Loader

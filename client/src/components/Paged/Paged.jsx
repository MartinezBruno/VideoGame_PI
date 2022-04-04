import React from 'react'
import './Paged.css'

function Paged({ gamesPerPage, allVideoGames, paged }) {
   const pageNumbers = [] //Cantidad de paginas
   for (let i = 1; i <= Math.ceil(allVideoGames / gamesPerPage); i++) {
      pageNumbers.push(i)
   }
   return (
      <nav className="paged">
         {pageNumbers?.map(number => (
            <button onClick={() => paged(number)} key={number}>
               {number}
            </button>
         ))}
      </nav>
   )
}

export default Paged

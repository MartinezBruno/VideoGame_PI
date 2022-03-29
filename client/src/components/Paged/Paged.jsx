import React from 'react'

function Paged({gamesPerPage, allVideoGames, paged}) {
   const pageNumbers = [] //Cantidad de paginas
   for (let i = 1; i <= Math.ceil(allVideoGames / gamesPerPage); i++) {
      pageNumbers.push(i)
   } 
   return (
      <nav>
         <ul>
            {pageNumbers?.map(number => (
               <button onClick={() => paged(number)} key={number}>
                  {number}
               </button>
            ))} 
         </ul>
      </nav>
   )
}

export default Paged

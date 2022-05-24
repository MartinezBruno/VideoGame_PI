import React from 'react'
import './Paged.css'

function Paged({ gamesPerPage, allVideoGames, paged, currentPage }) {
  const pageNumbers = [] //Cantidad de paginas
  for (let i = 1; i <= Math.ceil(allVideoGames / gamesPerPage); i++) {
    pageNumbers.push(i)
  }
  const handlePrev = () => {
    if (currentPage > 1) {
      let currentPagePrev = currentPage - 1
      return paged(currentPagePrev)
    }
    alert('No hay mas paginas')
  }
  const handleNext = () => {
    if (currentPage < pageNumbers.length) {
      let currentPageNext = currentPage + 1
      return paged(currentPageNext)
    }
    alert('No hay mas paginas')
  }
  return (
    <nav className='paged'>
      <button onClick={handlePrev}>Prev Page</button>
      <span style={{ color: 'white' }}>
        Pagina actual {currentPage} de {pageNumbers.length}
      </span>
      {/* {pageNumbers?.map((number) => (
        <button onClick={() => paged(number)} key={number}>
          {number}
        </button>
      ))} */}
      <button onClick={handleNext}>Next Page</button>
    </nav>
  )
}

export default Paged

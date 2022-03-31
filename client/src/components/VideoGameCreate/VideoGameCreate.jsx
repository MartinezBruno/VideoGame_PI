import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getGenres, platformsOptions, postVideoGame } from '../../actions'

const validation = input => {
   let errors = {}
   if (!input.name) {
      errors.name = 'Name is required'
   }
   if (!input.description) {
      errors.description = 'Description is required'
   }
   if (!input.released) {
      errors.released = 'Released is required'
   }
   if (!input.rating) {
      errors.rating = 'Rating is required'
   }
   return errors
}

const deleteCheckbox = (input, check) => {
   if (input.includes(check)) {
      let arr = input.filter(item => item !== check)
      return arr
   } else {
      let arr = input.concat(check)
      return arr
   }
}

function VideoGameCreate() {
   const dispatch = useDispatch()
   const genres = useSelector(state => state.genres)
   const [errors, setErrors] = useState({})
   const [input, setInput] = useState({
      name: '',
      description: '',
      released: '',
      rating: 0,
      genres: [],
      platforms: [],
   })

   const handlePlatforms = e => {
      setInput({
         ...input,
         platforms: deleteCheckbox(input.platforms, e.target.value),
      })
      setErrors(
         validation({
            ...input,
            platforms: e.target.value,
         }),
      )
   }
   const handleGenres = e => {
      setInput({
         ...input,
         genres: deleteCheckbox(input.genres, e.target.value),
      })
      setErrors(
         validation({
            ...input,
            genres: e.target.value,
         }),
      )
   }
   const handleOnChange = e => {
      setInput({
         ...input,
         [e.target.name]: e.target.value,
      })
      setErrors(
         validation({
            ...input,
            [e.target.name]: e.target.value,
         }),
      )
   }
   const handleSubmit = e => {
      e.preventDefault()
      dispatch(postVideoGame(input))
      alert('Video Game Created! \n Vuelve al inicio para ver los cambios')
      setInput({
         name: '',
         description: '',
         released: '',
         rating: 0,
         genres: [],
         platforms: [],
      })
   }
   useEffect(() => {
      dispatch(getGenres())
   }, [dispatch])

   return (
      <div>
         <div>
            <Link to="/home">
               <button>Home</button>
            </Link>
         </div>
         <div>
            <h1>Create a new videogame</h1>
         </div>
         <form onSubmit={e => handleSubmit(e)}>
            <div>
               <label htmlFor="name" className="label-form">
                  Name
               </label>
               <input
                  type="text"
                  id="name"
                  name="name"
                  value={input.value}
                  onChange={e => handleOnChange(e)}
               />
               {errors.name && <p className="error">{errors.name}</p>}
            </div>
            <div>
               <label htmlFor="rating" className="label-form">
                  Rating
               </label>
               <input
                  type="number"
                  id="rating"
                  name="rating"
                  value={input.rating}
                  onChange={e => handleOnChange(e)}
               />
               {errors.rating && <p className="error">{errors.rating}</p>}
            </div>
            <div>
               <label htmlFor="released" className="label-form">
                  Released
               </label>
               <input
                  type="text"
                  id="released"
                  name="released"
                  value={input.released}
                  onChange={e => handleOnChange(e)}
               />
               {errors.released && <p className="error">{errors.released}</p>}
            </div>
            <div>
               <h3>Platforms</h3>
               <div>
                  {platformsOptions.map(platform => (
                     <div key={platform.id}>
                        <input
                           type="checkbox"
                           value={platform.name}
                           onChange={e => handlePlatforms(e)}
                        />
                        {platform.name}
                     </div>
                  ))}
                  {errors.platforms && <p>{errors.platforms}</p>}
               </div>
            </div>
            <div>
               <h3>Genres</h3>
               <div>
                  {genres.map(genre => (
                     <div key={genre.id}>
                        <input
                           type="checkbox"
                           value={genre.name}
                           onChange={e => handleGenres(e)}
                        />
                        {genre.name}
                     </div>
                  ))}
                  {errors.genres && <p>{errors.genres}</p>}
               </div>
            </div>
            <div>
               <label htmlFor="description" className="label-form">
                  Description
               </label>
               <textarea
                  id="description"
                  name="description"
                  type="text"
                  value={input.description}
                  onChange={e => handleOnChange(e)}
               />
               {errors.description && <p>{errors.description}</p>}
            </div>
            <div>
               {input.name &&
               !errors.name &&
               !errors.rating &&
               !errors.description &&
               !errors.platforms &&
               !errors.genres ? (
                  <div className="bn-container">
                     <button className="bn31" type="submit">
                        Create
                     </button>
                  </div>
               ) : (
                  <h2 style={{color: 'red'}}>Campos obligatorios</h2>
               )}
            </div>
         </form>
      </div>
   )
}

export default VideoGameCreate

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { getGenres, getPlatforms, LoaderToTrue, postVideoGame } from '../../actions'
import './VideoGameCreate.css'

const validation = input => {
   let errors = {}
   if (!input.name) errors.name = 'Name is required'
   if (!input.description) errors.description = 'Description is required'
   if (!input.released) errors.released = 'Released is required'
   if (input.rating > 5) errors.rating = 'Rating must be less than 5'
   if (input.rating < 0) errors.rating = 'Rating must be greater than 0'
   if (input.platforms.length === 0) errors.platforms = 'Platforms is required'
   if (input.genres.length === 0) errors.genres = 'Genres is required'

   return errors
}

function VideoGameCreate() {
   const dispatch = useDispatch()
   const history = useHistory()
   const genres = useSelector(state => state.genres)
   const platforms = useSelector(state => state.platforms)
   const [errors, setErrors] = useState({})
   const [input, setInput] = useState({
      name: '',
      description: '',
      released: '',
      rating: '',
      genres: [],
      platforms: [],
   })
   const handleAddPlatform = e => {
      if (input.platforms.includes(e.target.value)) return
      setInput({ ...input, platforms: [...input.platforms, e.target.value] })
      setErrors(validation({ ...input }))
   }
   const handleRemovePlatform = e => {
      e.preventDefault()
      setInput({
         ...input,
         platforms: input.platforms.filter(p => p !== e.target.name),
      })
      setErrors(validation({ ...input }))
   }
   const handleAddGenre = e => {
      if (input.genres.includes(e.target.value)) return
      setInput({
         ...input,
         genres: [...input.genres, e.target.value],
      })
      setErrors(validation({ ...input }))
   }
   const handleRemoveGenre = e => {
      e.preventDefault()
      setInput({
         ...input,
         genres: input.genres.filter(g => g !== e.target.name),
      })
      setErrors(validation({ ...input }))
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
      setInput({
         name: '',
         description: '',
         released: '',
         rating: '',
         image: "",
         genres: [],
         platforms: [],
      })
      alert('Video Game Created!\nAhora serás redireccionado al inicio de la pagina')
      history.push('/home')
   }
   useEffect(() => {
      dispatch(getGenres())
      dispatch(getPlatforms())
      return () => {
         dispatch(LoaderToTrue())
      }
   }, [dispatch])

   return (
      <div className="form">
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
                  Name:
               </label>
               <input
                  type="text"
                  id="name"
                  name="name"
                  value={input.value}
                  onChange={handleOnChange}
                  autoComplete="off"
               />
               {errors.name && <p className="error">{errors.name}</p>}
            </div>
            <div>
               <label htmlFor="image">Image:</label>
               <input type="text" name="image" value={input.image} onChange={handleOnChange}/>
            </div>
            <div>
               <label htmlFor="rating" className="label-form">
                  Rating:
               </label>
               <input
                  type="number"
                  id="rating"
                  name="rating"
                  value={input.rating}
                  onChange={handleOnChange}
                  autoComplete="off"
               />
               {errors.rating && <p className="error">{errors.rating}</p>}
            </div>
            <div>
               <label htmlFor="released" className="label-form">
                  Released:
               </label>
               <input
                  type="text"
                  id="released"
                  name="released"
                  value={input.released}
                  onChange={handleOnChange}
                  autoComplete="off"
               />
               {errors.released && <p className="error">{errors.released}</p>}
            </div>
            <div>
               <select className="select" defaultValue={''} onChange={handleAddPlatform}>
                  <option value="" disabled>
                     Select a platform
                  </option>
                  {platforms.map(p => {
                     return (
                        <option key={p} value={p}>
                           {p}
                        </option>
                     )
                  })}
               </select>
               <div className="added">
                  {input.platforms?.map(p => (
                     <button key={p} name={p} onClick={handleRemovePlatform}>
                        {p}
                     </button>
                  ))}
               </div>
               {errors.platforms && <p className="error">{errors.platforms}</p>}
            </div>
            <div>
               <select className="select" defaultValue={''} onChange={handleAddGenre}>
                  <option value="" disabled>
                     Select a genre
                  </option>
                  {genres.map(g => {
                     return (
                        <option key={g.name} value={g.name}>
                           {g.name}
                        </option>
                     )
                  })}
               </select>
               <div className="added">
                  {input.genres?.map(g => (
                     <button key={g} name={g} onClick={handleRemoveGenre}>
                        {g}
                     </button>
                  ))}
               </div>
               {errors.genres && <p className="error">{errors.genres}</p>}
            </div>
            <div>
               <label htmlFor="description" className="label-form">
                  Description:
               </label>
               <textarea
                  id="description"
                  name="description"
                  type="text"
                  value={input.description}
                  onChange={handleOnChange}
                  autoComplete="off"
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
                     <button id="send" type="submit">
                        Create
                     </button>
                  </div>
               ) : (
                  <h2 style={{ color: 'red' }}>Campos obligatorios</h2>
               )}
            </div>
         </form>
      </div>
   )
}

export default VideoGameCreate

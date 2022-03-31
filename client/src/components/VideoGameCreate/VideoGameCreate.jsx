import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link, useHistory} from 'react-router-dom'
import {getGenres, postVideoGame, getVideogames} from '../../actions'

const validation = input => {
   let errors = {}
   if (!input.name) errors.name = 'Name is required'
   else if (!input.description) errors.description = 'Description is required'
   else if (!input.released) errors.released = 'Released is required'
   else if (!input.rating) errors.rating = 'Rating is required'
   else if (!input.platforms) errors.platforms = 'Platforms is required'
   else if (!input.genres) errors.genres = 'Genres is required'

   return errors
}

function VideoGameCreate() {
   const dispatch = useDispatch()
   const history = useHistory()
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
   const allVideoGames = useSelector(state => state.allVideogames)
   const allPlatforms = allVideoGames.map(p => p.platforms)
   const platforms = [...new Set(allPlatforms.flat())]

   const handleAddPlatform = e => {
      setInput({...input, platforms: [...input.platforms, e.target.value]})
      setErrors(validation({...input}))
   }
   const handleRemovePlatform = e => {
      e.preventDefault()
      setInput({
         ...input,
         platforms: input.platforms.filter(p => p !== e.target.name),
      })
   }
   const handleAddGenre = e => {
      setInput({
         ...input,
         genres: [...input.genres, e.target.value],
      })
      setErrors(validation({...input}))
   }
   const handleRemoveGenre = e => {
      e.preventDefault()
      setInput({
         ...input,
         genres: input.genres.filter(g => g !== e.target.name),
      })
      setErrors(validation({...input}))
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
         genres: [],
         platforms: [],
      })
      alert('Video Game Created!\nVuelve al inicio para ver los cambios')
      history.push('/home')
   }
   useEffect(() => {
      dispatch(getGenres())
      dispatch(getVideogames())
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
               <select defaultValue={''} onChange={handleAddPlatform}>
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
               {input.platforms.map(p => (
                  <button key={p} onClick={handleRemovePlatform} name={p}>
                     {p}
                     <span> X</span>
                  </button>
               ))}
               {errors.platforms && <p className="error">{errors.platforms}</p>}
            </div>
            <div>
               <select defaultValue={''} onChange={e => handleAddGenre(e)}>
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
               {input.genres.map(g => (
                  <button key={g} onClick={e => handleRemoveGenre(e)} name={g}>
                     {g}
                     <span>X</span>
                  </button>
               ))}
               {errors.genres && <p className="error">{errors.genres}</p>}
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

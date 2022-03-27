const axios = require('axios')
const {Genre} = require('../db')
const {API_KEY} = process.env
const apiGenresUrl = `https://api.rawg.io/api/genres?key=${API_KEY}`

const getApiGenres = async (req, res) => {
   try {
      let genresFromApi = (await axios.get(apiGenresUrl)).data.results
      let genres = genresFromApi.map(g => {
         return {
            id: g.id,
            name: g.name,
         }
      })
      genres.forEach(g => {
         Genre.findOrCreate({
            where: {
               name: g.name,
            },
         })
      })
      res.json(genres)
   } catch (error) {
      console.log(error)
   }
}

const newGenre = async (req, res) => {
   const {genre} = req.body
   try {
      const newGenre = await Genre.create({
         name: genre,
      })
      res.json(newGenre)
   } catch (error) {
      console.log(error)
   }
}

module.exports = {
   getApiGenres,
   newGenre,
}

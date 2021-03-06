const axios = require('axios')
const { Genre } = require('../db')
const { API_KEY } = process.env
const apiGenresUrl = `https://api.rawg.io/api/genres?key=${API_KEY}`

const getGenres = async (req, res, next) => {
   try {
      let genresFromApi = await axios.get(apiGenresUrl)
      genresFromApi = genresFromApi.data.results
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
      res.status(200).send(genres)
   } catch (error) {
      next(error)
   }
}

module.exports = {
   getGenres,
}

const axios = require('axios')
const {Videogame, Genre} = require('../db')
const {API_KEY} = process.env
const apiGamesUrl = `https://api.rawg.io/api/games?key=${API_KEY}`

//Traigo Informacion desde la API
const getApiGames = async () => {
   let gamesFromApi = []
   const allGames = [apiGamesUrl]
   for (let i = 0; i < 5; i++) {
      //Each page contains 20 games (20x5 = 100)
      const perPage = await axios.get(`${allGames[i]}`)
      allGames.push(perPage.data.next)
      const gameData = perPage.data.results.map(el => {
         return {
            id: el.id,
            name: el.name,
            released: el.released,
            image: el.background_image,
            rating: el.rating,
            platforms: el.platforms.map(p => p.platform.name.toLowerCase()),
            genres: el.genres.map(g => g.name),
         }
      })

      gamesFromApi = gamesFromApi.concat(gameData)
   }
   // console.log(gamesFromApi.length, 'Juegos desde la api')
   return gamesFromApi
}

const getDbGames = async () => {
   return await Videogame.findAll({
      include: {
         model: Genre,
         attributes: ['name'],
         through: {
            attributes: [],
         },
      },
   })
}

const getAllGames = async () => {
   const apiGames = await getApiGames()
   const dbGames = await getDbGames()
   const totalGames = dbGames.concat(apiGames)
   return totalGames
}

module.exports = {
   getAllGames,
}

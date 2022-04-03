const {Videogame, Genre} = require('../db')
const {API_KEY} = process.env
const axios = require('axios')
const {getAllGames} = require('./utils')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

//Obtengo todos los videojuegos o busco uno si se pasa el name
const getAll = async (req, res, next) => {
   const {name} = req.query
   try {
      if (name) {
         const dbGames = await Videogame.findAll({
            where: {
               name: {
                  [Op.like]: `%${name}%`,
               },
            },
            include: {
               model: Genre,
            },
         })

         let dbResponse = dbGames.map(v => {
            return {
               id: v.id,
               name: v.name,
               description: v.description,
               released: v.released,
               rating: v.rating,
               platforms: v.platforms,
               genres: v.genres.map(g => g.name),
            }
         })

         const apiGames = (
            await axios.get(
               `https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`,
            )
         ).data.results

         let apiResponse = apiGames.map(v => {
            return {
               id: v.id,
               name: v.name,
               image: v.background_image,
               released: v.released,
               rating: v.rating,
               platforms: v.platforms?.map(p => p.platform.name),
               genres: v.genres?.map(g => g.name),
            }
         })
         let response = dbResponse.concat(apiResponse).splice(0, 15)
         console.log(response.length)
         return res.status(200).send(response)
      } else {
         try {
            const allGames = await getAllGames()
            res.json(allGames)
         } catch (error) {
            next(error)
         }
      }
   } catch (error) {
      console.error(error)
      res.status(404).send({msg: 'Videogames not found'})
   }
}

const getById = async (req, res, next) => {
   const {id} = req.params
   let numeric = /^[0-9]+$/ //Uso para verificar que la id contenga solo valores numericos
   let idGame = id
   if (numeric.test(id)) {
      try {
         const apiResponse = await axios.get(
            `https://api.rawg.io/api/games/${id}?key=${API_KEY}`,
         )
         idGame = {
            id: apiResponse.data.id,
            name: apiResponse.data.name,
            description: apiResponse.data.description,
            image: apiResponse.data.background_image,
            released: apiResponse.data.released,
            rating: apiResponse.data.rating,
            platforms: apiResponse.data.platforms?.map(p => p.platform.name),
            genres: apiResponse.data.genres?.map(g => g.name),
         }
         res.status(200).send(idGame)
      } catch (error) {
         next(error)
      }
   } else {
      try {
         const dbResponse = await Videogame.findByPk(id, {include: Genre})
         idGame = {
            id: dbResponse.id,
            name: dbResponse.name,
            description: dbResponse.description,
            released: dbResponse.released,
            rating: dbResponse.rating,
            platforms: dbResponse.platforms,
            genres: dbResponse.genres.map(g => g.name),
         }
         res.status(200).json(idGame)
      } catch (error) {
         res.status(404).send({msg: 'ID Game not found'})
      }
   }
}

const postVideogame = async (req, res, next) => {
   try {
      const {name, description, released, rating, platforms, genres} = req.body
      const newVideoGame = await Videogame.create({
         name,
         description,
         released,
         rating,
         platforms,
      })
      let dbGenre = await Genre.findAll({where: {name: genres}})
      newVideoGame.addGenre(dbGenre)
      // res.send({msg: 'Videogame created'})
      res.status(201).send(newVideoGame)
   } catch (error) {
      next(error)
   }
}

module.exports = {
   getAll,
   getById,
   postVideogame,
}

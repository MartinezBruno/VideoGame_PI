const {Router} = require('express')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router()

const getVideogames = require('./videogames')
const getVideogameDetails = require('./videogame-details')
const getGenres = require('./genres')

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/videogames', getVideogames)
router.use('/videogame', getVideogameDetails)
router.use('/genres', getGenres)

module.exports = router

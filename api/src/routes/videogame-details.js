const express = require('express')
const router = express.Router()
const {getById, postVideogame} = require('../controllers/videogames')

router.get('/:id', getById)

router.post('/', postVideogame)

module.exports = router

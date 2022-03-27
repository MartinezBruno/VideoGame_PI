const express = require('express')
const router = express.Router()
const {getAll, getById, postVideogame} = require('../controllers/videogames')

router.get('/', getAll)

router.get('/:id', getById)

router.post('/', postVideogame)

module.exports = router

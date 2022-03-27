const express = require('express')
const router = express.Router()
const {getApiGenres, newGenre} = require('../controllers/genres')

router.get('/', getApiGenres)

router.post('/', newGenre)

module.exports = router

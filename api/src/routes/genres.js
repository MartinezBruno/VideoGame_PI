const express = require('express')
const router = express.Router()
const { getGenres } = require('../controllers/genres')


router.get('/', getGenres)

module.exports = router

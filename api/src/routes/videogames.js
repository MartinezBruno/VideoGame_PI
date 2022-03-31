const express = require('express')
const router = express.Router()
const {getAll} = require('../controllers/videogames')

router.get('/', getAll)

module.exports = router

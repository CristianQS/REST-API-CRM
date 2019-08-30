const express = require('express')
const router = express.Router()

const userController = require('../controllers/user')

router.use('/users', userController)

module.exports = router
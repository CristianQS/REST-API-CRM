const express = require('express')
const router = express.Router()

const userController = require('../controllers/users/index')

router.use('/users', userController)

module.exports = router
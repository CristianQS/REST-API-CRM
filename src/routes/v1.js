const express = require('express')
const router = express.Router()

const authController = require('../controllers/auth')
const userController = require('../controllers/user')

router.use('/users', userController)
router.use('/auth', authController)

module.exports = router
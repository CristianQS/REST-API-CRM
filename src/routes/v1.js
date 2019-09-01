const express = require('express')
const router = express.Router()
const { authorization } = require('../helpers/auth/index')

const authController = require('../controllers/auth')
const userController = require('../controllers/user')

router.use('/users', authorization, userController)
router.use('/auth', authController)

module.exports = router
const express = require('express')
const router = express.Router()
const { authorizeAdmin, authorization } = require('../helpers/auth/index')

const authController = require('../controllers/auth')
const userController = require('../controllers/user')

router.use('/users', authorizeAdmin, userController)
router.use('/auth', authController)

module.exports = router
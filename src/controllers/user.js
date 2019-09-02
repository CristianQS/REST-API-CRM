const { getAllUser } = require('../services/users/getUsers')
const { createUser } = require('../services/users/createUser')
const { updateUser } = require('../services/users/updateUser')
const { updateRoleUser } = require('../services/users/updateRoleUser')
const { deleteUser } = require('../services/users/deleteUser')

const express = require('express')
const router = express.Router()

router.get('/', getAllUser)
router.post('/', createUser)
router.put('/:id', updateUser)
router.patch('/:id', updateRoleUser)
router.delete('/:id', deleteUser)

module.exports = router
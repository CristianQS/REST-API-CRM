const express = require('express')
const router = express.Router()

const { getAllCustomer } = require('../services/customers/getAllCustomer')
const { getCustomerById } = require('../services/customers/getCustomerById')
const { createCustomer } = require('../services/customers/createCustomer')
const { updateCustomer } = require('../services/customers/updateCustomer')
const { deleteCustomer } = require('../services/customers/deleteCustomer')

router.get('/', getAllCustomer)
router.get('/:id', getCustomerById)
router.post('/', createCustomer)
router.put('/:id', updateCustomer)
router.delete('/:id', deleteCustomer)

module.exports = router
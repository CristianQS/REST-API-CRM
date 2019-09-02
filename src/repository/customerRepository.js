const Customer = require('../models/customer')

module.exports.customerRepository = () => ({
  find: (params) => Customer.find(params),
  findOne: (params) => Customer.findOne(params),
  findById: (id) => Customer.findById(id),
  create: (body) => Customer.create(body),
  update: (id, body, options) => Customer.findByIdAndUpdate(id, body, options),
  delete: (id) => Customer.findByIdAndRemove(id)
})
const User = require('../models/user')

module.exports.userRepository = () => ({
  find: (params) => User.find(params),
  findOne: (params) => User.findOne(params),
  findById: (id) => User.findById(id),
  create: (body) => User.create(body),
  update: (id, body, options) => User.findByIdAndUpdate(id, body, options),
  delete: (id) => User.findByIdAndRemove(id)
})
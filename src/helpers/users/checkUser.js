const User = require('../../models/user')
const { Role } = require('../../models/role')

module.exports.checkUserExists = async (email) => {
  let user = await User.find({email})
  return user ? true : false
}

module.exports.checkUserIsAdmin = async (email) => {
  let user = await User.find({email})
  return user[0].role === Role.ADMIN ? true : false
}
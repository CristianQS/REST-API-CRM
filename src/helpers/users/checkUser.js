const User = require('../../models/user')

module.exports.checkUser = async (email) => {
  let user = await User.find({email})
  return user ? true : false
}
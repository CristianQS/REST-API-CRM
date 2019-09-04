const { userRepository } = require('../../repository/userRepository')
const { decodeToken } = require('../../helpers/jwt/index')
const { AUTH_HEADER } = require('../../helpers/auth/constants')

module.exports.getUserAuth = async (req) => {
  const header = req.headers[AUTH_HEADER].split(' ')
  let decoded = decodeToken(header[1])
  let user = await userRepository().find({email:decoded.email})
  return user[0]
}
const jwt = require('jsonwebtoken')
const { SECRET_TOKEN, EXPIRE_TIME } = require('./constants')

module.exports.generateToken = (payload) => {
  return jwt.sign(payload, SECRET_TOKEN, { expiresIn: EXPIRE_TIME })
}

module.exports.verifyToken = (token) => {
  return jwt.verify(token, SECRET_TOKEN)
}
module.exports.decodeToken = (token) => {
  return jwt.decode(token)
}
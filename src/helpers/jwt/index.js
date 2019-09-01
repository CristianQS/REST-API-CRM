const jwt = require('jsonwebtoken')
const { checkUser } = require('../users/checkUser')
const { SECRET_TOKEN, EXPIRE_TIME } = require('./constants')

module.exports.generateToken = (payload) => {
  return jwt.sign(payload, SECRET_TOKEN, { expiresIn: EXPIRE_TIME })
}

module.exports.verifyToken = (token, req, res, next) => {
  return jwt.verify(token, SECRET_TOKEN, (err,decoded) => {
    if (err) return false
    if(!checkUser(decoded.email)) return false
    return true  
  })
}
module.exports.decodeToken = (token) => {
  return jwt.decode(token)
}
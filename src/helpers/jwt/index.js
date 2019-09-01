const jwt = require('jsonwebtoken')
const { checkUserExists, checkUserIsAdmin } = require('../users/checkUser')
const { SECRET_TOKEN, EXPIRE_TIME } = require('./constants')

module.exports.generateToken = (payload) => {
  return jwt.sign(payload, SECRET_TOKEN, { expiresIn: EXPIRE_TIME })
}

module.exports.verifyToken = (token, req, res, next) => {
  return jwt.verify(token, SECRET_TOKEN, async (err,decoded) => {
    if (err) return false
    let verify = await checkUserExists(decoded.email)
    if(!verify) return false
    return true  
  })
}

module.exports.verifyIsAdminToken = (token, req, res, next) => {
  return jwt.verify(token, SECRET_TOKEN, async (err,decoded) => {
    if (err) return false
    let verify = await checkUserIsAdmin(decoded.email)
    if(!verify) return false
    return true  
  })
}
module.exports.decodeToken = (token) => {
  return jwt.decode(token)
}
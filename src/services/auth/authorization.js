const { verifyToken } = require('../../helpers/jwt/index')

const { sendError } = require('../../services/errors')
const { AUTH_HEADER, SECRET } = require('../constants')

module.exports.authorization = (req, res, next) => {
  const token = req.headers[AUTH_HEADER]
  return verifyToken(token)
}
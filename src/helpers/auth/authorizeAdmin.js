const { verifyIsAdminToken } = require('../jwt/index')
const { AUTH_HEADER } = require('./constants')
const { sendError } = require('../http/index')
const { UNAUTHORIZED, UNSECURE_HEADER_TYPE } = require('../http/constants')

module.exports = async (req, res, next) => {
  if (req.headers[AUTH_HEADER] === undefined || req.headers[AUTH_HEADER].length === 0){
    return sendError(res, UNSECURE_HEADER_TYPE).unsecureType()
  } 
  const header = req.headers[AUTH_HEADER].split(' ')
  if (header[0] === 'Bearer' ) {
    let verify = await verifyIsAdminToken(header[1])
    if (!verify) return sendError(res, UNAUTHORIZED).unsecureType()
    next()
  } else {
    sendError(res, UNSECURE_HEADER_TYPE).unsecureType()
  }
}
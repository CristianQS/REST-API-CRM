const { sendError } = require('../http/index')
const { UNSECURE_HEADER_TYPE } = require('../http/constants')
const { APPLICATION_JSON, CONTENT_TYPE_HEADER } = require('./constants')

const secureContentType = (headers) => headers[CONTENT_TYPE_HEADER] === APPLICATION_JSON

module.exports = (req, res, next) => {
  if (req.headers[CONTENT_TYPE_HEADER]) {
    if (!secureContentType(req.headers)) return sendError(res, UNSECURE_HEADER_TYPE).unsecureType()
  }

  next()
}
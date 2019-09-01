const { sendError } = require('../../helpers/http/index')
const { API_HEADER, APPLICATION_JSON, 
      CONTENT_TYPE_HEADER } = require('./constants')
const tokensList = require('../tokens')

const secureAPIToken = (headers) => tokensList.includes(headers[API_HEADER])
const secureContentType = (headers) => headers[CONTENT_TYPE_HEADER] === APPLICATION_JSON

module.exports = (req, res, next) => {
  
  if (!secureAPIToken(req.headers)) return sendError(res).unsecureAPI()
  if (!secureContentType(req.headers)) return sendError(res).unsecureType()

  next()
}
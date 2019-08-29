const bodyParser = require('body-parser')
const morgan = require('morgan')
const helmet = require('helmet')

module.exports = {
  bodyParser: bodyParser.json(),
  morgan: morgan('tiny'),
  helmet: helmet()
}
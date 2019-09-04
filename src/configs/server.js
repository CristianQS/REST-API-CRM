const bodyParser = require('body-parser')
const morgan = require('morgan')
const helmet = require('helmet')
const dotenv = require('dotenv').config()


module.exports = {
  bodyParser: bodyParser.json({limit: process.env.LIMIT_REQUEST, extended: true}),
  morgan: morgan('tiny'),
  helmet: helmet()
}
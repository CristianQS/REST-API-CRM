const mongoose = require('mongoose')

module.exports.connectDb = () => {
  return mongoose.connect(`mongodb://${process.env.MONGO_URI}:${process.env.MONGO_PORT}/`+
  `${process.env.DB_NAME}`, { useNewUrlParser: true })
}
const mongoose = require('mongoose')

module.exports.connectDb = () => {
  return mongoose.connect(`mongodb://localhost:27017/api`, { useNewUrlParser: true })
}
const mongoose = require('mongoose')

module.exports.connectDb = () => {
  if(process.env.NODE_ENV === 'production') {
    return mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME_PROD}:${process.env.DB_PASSWORD_PROD}`+
    `@apicrm-jmu6p.mongodb.net/test?retryWrites=true&w=majority`, { useNewUrlParser: true })
  }
  return mongoose.connect(`mongodb://${process.env.MONGO_URI}:${process.env.MONGO_PORT}/`+
  `${process.env.DB_NAME}`, { useNewUrlParser: true })
}
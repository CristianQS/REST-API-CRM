const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CustomerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    default: ''
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  lastTimeModified: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

const Customer = mongoose.model('Customer',CustomerSchema)

module.exports = Customer

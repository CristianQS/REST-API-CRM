const { customerRepository } = require('../../repository/customerRepository')

const { uploadImage } = require('../../helpers/aws/s3/uploadImage')

const { userRepository } = require('../../repository/userRepository')
const { decodeToken } = require('../../helpers/jwt/index')
const { AUTH_HEADER } = require('../../helpers/auth/constants')

const { sendError, sendSuccess } = require('../../helpers/http/index')
const { SERVER_ERROR,REQUIRED_FIELD_MISSING_NAME, 
        REQUIRED_FIELD_MISSING_EMAIL, CUSTOMER_NOT_FOUND,  
        PUT_SUCCESS } = require('../../helpers/http/constants')


module.exports.updateCustomer = async (req, res, next) => {
  try {
    const customerId = req.params.id
    const newUpdateCustomer = req.body

    if (newUpdateCustomer.name === '') return sendError(res, REQUIRED_FIELD_MISSING_NAME).missingField()
    if (newUpdateCustomer.email === '') return sendError(res, REQUIRED_FIELD_MISSING_EMAIL).missingField()

    let isEmailExists = await customerRepository().findById(customerId)
    if (!isEmailExists) return sendError(res, CUSTOMER_NOT_FOUND).notFound()

      const header = req.headers[AUTH_HEADER].split(' ')
      let decoded = decodeToken(header[1])
      let user = await userRepository().find({email:decoded.email})

      newUpdateCustomer['lastTimeModified'] = user[0]._id

      if(newUpdateCustomer['photo']) {
        let urlPhoto = await uploadImage(newUpdateCustomer.photo, newUpdateCustomer.email)
        newUpdateCustomer['photo'] = urlPhoto
      }

      let updatedCustomer = await customerRepository().update(customerId, newUpdateCustomer, 
        { new: true })

      if (updatedCustomer) {
        return sendSuccess(res,PUT_SUCCESS, updatedCustomer).success()  
      } else {
        return sendError(res,SERVER_ERROR).internal()
      }
  } catch (error) {
      return sendError(res,SERVER_ERROR).internal()
  }
}
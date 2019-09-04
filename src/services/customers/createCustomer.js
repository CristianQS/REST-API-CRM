const { customerRepository } = require('../../repository/customerRepository')
const { uploadImage } = require('../../helpers/aws/s3/uploadImage')
const { getUserAuth } = require('../../helpers/users/getUserAuth')
const { sendError, sendSuccess } = require('../../helpers/http/index')
const { SERVER_ERROR, REQUIRED_FIELD_MISSING_NAME, REQUIRED_FIELD_MISSING_EMAIL,
        CUSTOMER_ALREAY_EXISTS, POST_SUCCESS } = require('../../helpers/http/constants')

module.exports.createCustomer = async (req,res,next) => {
  try {
      const newCustomer = req.body
      if (newCustomer.name === undefined || newCustomer.name === '') return sendError(res, REQUIRED_FIELD_MISSING_NAME).missingField()
      if (newCustomer.email === undefined || newCustomer.email === '') return sendError(res, REQUIRED_FIELD_MISSING_EMAIL).missingField()

      let isEmailExists = await customerRepository().findOne({"email": newCustomer.email})
      if (isEmailExists) return sendError(res, CUSTOMER_ALREAY_EXISTS).entityExists()
    
      let user = await getUserAuth(req)
      newCustomer['createdBy'] = user._id
      newCustomer['lastTimeModified'] = user._id

      if(newCustomer['photo']) {
        let urlPhoto = await uploadImage(newCustomer.photo, newCustomer.email)
        newCustomer['photo'] = urlPhoto
      }
      let createdCustomer = await customerRepository().create(newCustomer)

      if (createdCustomer) {
          return sendSuccess(res, POST_SUCCESS, createdCustomer).created()
      } else {
          return sendError(res,SERVER_ERROR).internal()
      }
  } catch (error) {
      return sendError(res,SERVER_ERROR).internal()
  }
}
const { customerRepository } = require('../../repository/customerRepository')
const { uploadImage } = require('../../helpers/aws/s3/uploadImage')
const { getUserAuth } = require('../../helpers/users/getUserAuth')
const { sendError, sendSuccess } = require('../../helpers/http/index')
const { SERVER_ERROR,REQUIRED_FIELD_MISSING_NAME, CUSTOMER_NOT_FOUND,
        REQUIRED_FIELD_MISSING_EMAIL,PUT_SUCCESS } = require('../../helpers/http/constants')

module.exports.updateCustomer = async (req, res, next) => {
  try {
    if (Object.getOwnPropertyNames(req.body).length === 0 ) return sendError(res,BAD_PARAMETERS).badRequest()

    const customerId = req.params.id
    const newUpdateCustomer = req.body

    if (newUpdateCustomer.name === '') return sendError(res, REQUIRED_FIELD_MISSING_NAME).missingField()
    if (newUpdateCustomer.email === '') return sendError(res, REQUIRED_FIELD_MISSING_EMAIL).missingField()

    let isEmailExists = await customerRepository().findById(customerId)
    if (!isEmailExists) return sendError(res, CUSTOMER_NOT_FOUND).notFound()

    let user = await getUserAuth(req)
    newUpdateCustomer['lastTimeModified'] = user._id

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
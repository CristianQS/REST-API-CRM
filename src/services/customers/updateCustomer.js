const { customerRepository } = require('../../repository/customerRepository')
const { uploadImage } = require('../../helpers/aws/s3/uploadImage')
const { getUserAuth } = require('../../helpers/users/getUserAuth')
const { sendError, sendSuccess } = require('../../helpers/http/index')
const { SERVER_ERROR,REQUIRED_FIELD_MISSING_NAME, CUSTOMER_NOT_FOUND, BAD_PARAMETERS,
        REQUIRED_FIELD_MISSING_EMAIL,PUT_SUCCESS, REQUIRED_FIELD_MISSING_SURNAME } = require('../../helpers/http/constants')

module.exports.updateCustomer = async (req, res, next) => {
  try {

    if (!checkCustomerBody(req)) return sendError(res, BAD_PARAMETERS).badRequest()

    const customerId = req.params.id
    const newUpdateCustomer = req.body

    if (newUpdateCustomer.name === '') return sendError(res, REQUIRED_FIELD_MISSING_NAME).missingField()
    if (newUpdateCustomer.surname === '') return sendError(res, REQUIRED_FIELD_MISSING_SURNAME).missingField()
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

function checkCustomerBody (req) {
  let body = Object.keys(req.body).filter((key) => key === 'name' || 
  key === 'surname' || key === 'email' || key === 'photo')
  if (body.length === 0 || body.length !== Object.keys(req.body).length) return false
  return true
}
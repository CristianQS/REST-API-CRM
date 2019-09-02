const { customerRepository } = require('../../repository/customerRepository')
const { sendError, sendSuccess } = require('../../helpers/http/index')
const { SERVER_ERROR,REQUIRED_FIELD_MISSING_NAME, 
        REQUIRED_FIELD_MISSING_EMAIL, CUSTOMER_ALREAY_EXISTS,  
        PUT_SUCCESS } = require('../../helpers/http/constants')

module.exports.updateCustomer = async (req, res, next) => {
  try {
      const customerId = req.params.id
      const { name, email } = req.body

      if (name === undefined || name === '') return sendError(res, REQUIRED_FIELD_MISSING_NAME).missingField()
      if (email === undefined || email === '') return sendError(res, REQUIRED_FIELD_MISSING_EMAIL).missingField()

      let isEmailExists = await customerRepository().findOne({"email": email})

      if (isEmailExists) return sendError(res, CUSTOMER_ALREAY_EXISTS).entityExists()

      let updateCustomer = await customerRepository().update(customerId, req.body, 
        { new: true })

      if (updateCustomer) {
        return sendSuccess(res,PUT_SUCCESS, updateCustomer).success()  
      } else {
        return sendError(res,SERVER_ERROR).internal()
      }
  } catch (error) {
      return sendError(res,SERVER_ERROR).internal()
  }
}
const { customerRepository } = require('../../repository/customerRepository')
const { sendError, sendSuccess } = require('../../helpers/http/index')
const { SERVER_ERROR, REQUIRED_FIELD_MISSING_NAME, REQUIRED_FIELD_MISSING_EMAIL,
        CUSTOMER_ALREAY_EXISTS, POST_SUCCESS } = require('../../helpers/http/constants')

module.exports.createCustomer = async (req,res,next) => {
  try {
      const { name, email } = req.body
      if (name === undefined || name === '') return sendError(res, REQUIRED_FIELD_MISSING_NAME).missingField()
      if (email === undefined || email === '') return sendError(res, REQUIRED_FIELD_MISSING_EMAIL).missingField()

      let isEmailExists = await customerRepository().findOne({"email": email})

      if (isEmailExists) return sendError(res, CUSTOMER_ALREAY_EXISTS).entityExists()

      let newCustomer = await customerRepository().create(req.body)

      if (newCustomer) {
          newCustomer
          return sendSuccess(res, POST_SUCCESS, newCustomer).created()
      } else {
          return sendError(res,SERVER_ERROR).internal()
      }
  } catch (error) {
      return sendError(res,SERVER_ERROR).internal()
  }
}
const { sendError, sendSuccess } = require('../../helpers/http/index')
const { SERVER_ERROR, REQUIRED_FIELD_MISSING_NAME, REQUIRED_FIELD_MISSING_EMAIL,
        CUSTOMER_ALREAY_EXISTS, POST_SUCCESS, } = require('../../helpers/http/constants')


module.exports.createCustomer = async (req,res,next) => {
  try {
      const { name, email } = req.body;
      if (name === undefined || name === '') return sendError(res, REQUIRED_FIELD_MISSING_NAME)
      if (email === undefined || email === '') return sendError(res, REQUIRED_FIELD_MISSING_EMAIL)

      let isEmailExists = await Customer.findOne({"email": email})

      if (isEmailExists) return sendError(res, CUSTOMER_ALREAY_EXISTS).entityExists()

      let newCustomer = await Customer.create(req.body)

      if (newCustomer) {
          return sendSuccess(res, POST_SUCCESS, newCustomer)
      } else {
          return sendError(res,SERVER_ERROR).internal()
      }
  } catch (error) {
      return sendError(res,SERVER_ERROR).internal()
  }
}
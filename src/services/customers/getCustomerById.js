const { sendError, sendSuccess } = require('../../helpers/http/index')
const { SERVER_ERROR, CUSTOMER_NOT_FOUND, GET_SUCCESS} = require('../../helpers/http/constants')

module.exports.getCustomerById = async (req,res,next) => {
  try {

      let customer = await Customer.find(req.params.id);

      if (customer.length > 0) return sendSuccess(res, GET_SUCCESS, customers)

      return sendError(res, CUSTOMER_NOT_FOUND).notFound()
  } catch (error) {
      return sendError(res,SERVER_ERROR).internal()
  }
}
const { customerRepository } = require('../../repository/customerRepository')
const { sendError, sendSuccess } = require('../../helpers/http/index')
const { SERVER_ERROR, CUSTOMER_NOT_FOUND } = require('../../helpers/http/constants')

module.exports.deleteCustomer = async (req, res, next) => {
  try {
      let customer = await customerRepository().delete(req.params.id)
      if (customer) return sendSuccess(res).noContent()
    
      return sendError(res, CUSTOMER_NOT_FOUND).notFound()

  } catch (error) {
      return sendError(res,SERVER_ERROR).internal()
  }
}
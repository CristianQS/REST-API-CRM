const { customerRepository } = require('../../repository/customerRepository')
const { sendError, sendSuccess } = require('../../helpers/http/index')
const { CUSTOMER_NOT_FOUND, GET_SUCCESS} = require('../../helpers/http/constants')

module.exports.getCustomerById = async (req,res,next) => {
  try {
      let customer = await customerRepository().findById(req.params.id)

      if (customer) return sendSuccess(res, GET_SUCCESS, customer).success()

  } catch (error) {
    return sendError(res, CUSTOMER_NOT_FOUND).notFound()
  }
}
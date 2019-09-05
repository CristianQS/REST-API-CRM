const { customerRepository } = require('../../repository/customerRepository')
const { deleteImage } = require('../../helpers/aws/s3/deleteImage')
const { sendError, sendSuccess } = require('../../helpers/http/index')
const { SERVER_ERROR, CUSTOMER_NOT_FOUND } = require('../../helpers/http/constants')

module.exports.deleteCustomer = async (req, res, next) => {
  try {
      let customer = await customerRepository().delete(req.params.id)
      if (customer) {
        deleteImage(customer.photo)
        return sendSuccess(res).noContent()
      }
    
      return sendError(res, CUSTOMER_NOT_FOUND).notFound()

  } catch (error) {
      return sendError(res,SERVER_ERROR).internal()
  }
}
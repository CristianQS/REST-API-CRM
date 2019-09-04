const { userRepository } = require('../../repository/userRepository')
const { sendError, sendSuccess } = require('../../helpers/http/index')
const { SERVER_ERROR, USER_NOT_FOUND, GET_SUCCESS} = require('../../helpers/http/constants')

module.exports.getUserById = async (req,res,next) => {
  try {
      let user = await userRepository().findById(req.params.id)

      if (user) return sendSuccess(res, GET_SUCCESS, user).success()

      return sendError(res, USER_NOT_FOUND).notFound()
  } catch (error) {
      return sendError(res,SERVER_ERROR).internal()
  }
}
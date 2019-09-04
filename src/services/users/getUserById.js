const { userRepository } = require('../../repository/userRepository')
const { sendError, sendSuccess } = require('../../helpers/http/index')
const {  USER_NOT_FOUND, GET_SUCCESS} = require('../../helpers/http/constants')

module.exports.getUserById = async (req,res,next) => {
  try {
      let user = await userRepository().findById(req.params.id)
      if (user) return sendSuccess(res, GET_SUCCESS, user).success()

  } catch (error) {
    return sendError(res, USER_NOT_FOUND).notFound()
  }
}
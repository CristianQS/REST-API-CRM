const { userRepository } = require('../../repository/userRepository')
const { sendError, sendSuccess } = require('../../helpers/http/index')
const { SERVER_ERROR,USER_NOT_FOUND ,DELETE_SUCCESS } = require('../../helpers/http/constants')

const deleteUser = async (req, res) => {
  try {
      let user = await userRepository().delete(req.params.id)

      if (user) return sendSuccess(res, DELETE_SUCCESS).success()
      
      return sendError(res, USER_NOT_FOUND).notFound()

  } catch (error) {
      return sendError(res, SERVER_ERROR).internal()
  }
}

module.exports = {
  deleteUser: deleteUser
}
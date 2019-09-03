const { userRepository } = require('../../repository/userRepository')
const { sendError, sendSuccess } = require('../../helpers/http/index')
const { SERVER_ERROR,USER_NOT_FOUND } = require('../../helpers/http/constants')

const deleteUser = async (req, res) => {
  try {
      let user = await userRepository().delete(req.params.id)

      if (user) return sendSuccess(res).noContent()
      
      return sendError(res, USER_NOT_FOUND).notFound()

  } catch (error) {
      return sendError(res, SERVER_ERROR).internal()
  }
}

module.exports = {
  deleteUser: deleteUser
}
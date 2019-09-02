const { userRepository } = require('../../repository/userRepository')
const { sendError, sendSuccess } = require('../../helpers/http/index')
const { SERVER_ERROR, REQUIRED_FIELD_MISSING_NAME, 
        REQUIRED_FIELD_MISSING_EMAIL, USER_NOT_FOUND, 
        PUT_SUCCESS } = require('../../helpers/http/constants')

const updateUser = async (req, res) => {
  try {
      const userId = req.params.id
      const { username, email } = req.body

      if (username === undefined || username === '') return sendError(res, REQUIRED_FIELD_MISSING_NAME).missingField()
      if (email === undefined || email === '') return sendError(res, REQUIRED_FIELD_MISSING_EMAIL).missingField()

      let isUserExists = await userRepository().findById(userId)

      if (!isUserExists) return sendError(res, USER_NOT_FOUND)

      let updateUser = await userRepository().update(userId, req.body, { new: true })

      if (updateUser) {
        return sendSuccess(res, PUT_SUCCESS, updateUser).success()
      } else {
        return sendError(res, SERVER_ERROR).internal()
      }
  } catch (error) {
      return sendError(res, SERVER_ERROR).internal()
  }
}

module.exports = {
    updateUser: updateUser
}
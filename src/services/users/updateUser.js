const User = require('../../models/user')
const { sendError, sendSuccess } = require('../../utils/http/index')
const { SERVER_ERROR, REQUIRED_FIELD_MISSING_NAME, 
        REQUIRED_FIELD_MISSING_EMAIL, USER_NOT_FOUND, 
        PUT_SUCCESS } = require('../../utils/http/constants')

const updateUser = async (req, res) => {
  try {
      const userId = req.params.id

      const { username, email } = req.body

      if (username === undefined || username === '') return sendError(res, REQUIRED_FIELD_MISSING_NAME).missingField()
      if (email === undefined || email === '') return sendError(res, REQUIRED_FIELD_MISSING_EMAIL).missingField()

      let isUserExists = await User.findById(userId);

      if (!isUserExists) return sendError(res, USER_NOT_FOUND)

      let updateUser = await User.findByIdAndUpdate(userId, req.body, {
          new: true
      });

      if (updateUser) {
        return sendSuccess(res, PUT_SUCCESS, updateUser)
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
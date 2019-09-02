const { userRepository } = require('../../repository/userRepository')
const { Role } = require('../../models/role')
const { sendError, sendSuccess } = require('../../helpers/http/index')
const { SERVER_ERROR, BAD_PARAMETERS, USER_NOT_FOUND, ROLE_NOT_FOUND,
        PUT_SUCCESS } = require('../../helpers/http/constants')

const updateRoleUser = async (req, res) => {
  try {
      const userId = req.params.id
      let check = Object.entries(req.body)
      if (check.length > 1) return sendError(res, BAD_PARAMETERS ).badRequest()

      const role = req.body.role
      if (role === undefined) return sendError(res, BAD_PARAMETERS ).badRequest()
      if (Role[role] === undefined) return sendError(res, ROLE_NOT_FOUND ).badRequest()

      let isUserExists = await userRepository().findById(userId)

      if (!isUserExists) return sendError(res, USER_NOT_FOUND).notFound()
      let updateUser = await userRepository().update(userId, {role: role},{new:true})

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
    updateRoleUser: updateRoleUser
}
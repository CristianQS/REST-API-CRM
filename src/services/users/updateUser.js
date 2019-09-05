const { userRepository } = require('../../repository/userRepository')
const { sendError, sendSuccess } = require('../../helpers/http/index')
const { SERVER_ERROR, REQUIRED_FIELD_MISSING_NAME, 
        REQUIRED_FIELD_MISSING_EMAIL, USER_NOT_FOUND, 
        PUT_SUCCESS, REQUIRED_FIELD_MISSING_PASSWORD,
        BAD_PARAMETERS, NOT_REQUIRED_FIELD_ROLE  } = require('../../helpers/http/constants')

const updateUser = async (req, res) => {
  try {
    if(!checkUserBody(req)) return sendError(res,BAD_PARAMETERS).badRequest()

    const userId = req.params.id
    const { username,password, email, role } = req.body
    
    if (role) return sendError(res,NOT_REQUIRED_FIELD_ROLE).badRequest()
    if (username === '') return sendError(res, REQUIRED_FIELD_MISSING_NAME).missingField()
    if (password === '') return sendError(res, REQUIRED_FIELD_MISSING_PASSWORD ).missingField()
    if (email === '') return sendError(res, REQUIRED_FIELD_MISSING_EMAIL).missingField()


    let isUserExists = await userRepository().findById(userId)
    if (!isUserExists) return sendError(res, USER_NOT_FOUND).notFound()

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


function checkUserBody (req) {
  let body = Object.keys(req.body).filter((key) => key === 'username' || 
  key === 'password' || key === 'email' || key === 'role' )
  if (body.length === 0 || body.length !== Object.keys(req.body).length) return false
  return true
}
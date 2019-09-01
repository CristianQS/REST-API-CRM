const { generateToken } = require('../../helpers/jwt/index')
const User = require('../../models/user')
const { sendError, sendSuccess } = require('../../helpers/http/index')
const { USER_NOT_FOUND, AUTH_FAILED, AUTH_SUCCESS,
        SERVER_ERROR } = require('../../helpers/http/constants')

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    let user = await User.findOne({ email: email })

    if (user.length === 0) return sendError(res, USER_NOT_FOUND).notFound()
    if (user.email === email && user.password === password) {
      let payload = { email: user.email}
      let token = generateToken(payload)
      return sendSuccess(res,AUTH_SUCCESS,token).success()
    }
    return sendError(res,AUTH_FAILED ).badRequest()
  } catch (error) {
    return sendError(res, SERVER_ERROR).internal()
  }
}

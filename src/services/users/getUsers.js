const User = require('../../models/user')
const { sendError, sendSuccess } = require('../../helpers/http/index')
const { SERVER_ERROR, USER_NOT_FOUND, 
        GET_SUCCESS } = require('../../helpers/http/constants')

const getAllUser = async (req, res) => {
  try {

    let users = await User.find({});

    if (users.length > 0) return sendSuccess(res, GET_SUCCESS, users).success()
    return sendError(res, USER_NOT_FOUND).notFound()

} catch (error) {
    return sendError(res, SERVER_ERROR).internal()
}
}

module.exports = {
  getAllUser: getAllUser
}
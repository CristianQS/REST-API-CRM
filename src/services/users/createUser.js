const { userRepository } = require('../../repository/userRepository')
const { sendError, sendSuccess } = require('../../helpers/http/index')
const { Role } = require('../../models/role')
const { SERVER_ERROR, REQUIRED_FIELD_MISSING_USERNAME, 
        REQUIRED_FIELD_MISSING_EMAIL, USER_ALREAY_EXISTS, 
        POST_SUCCESS, REQUIRED_FIELD_MISSING_PASSWORD,
        REQUIRED_FIELD_MISSING_ROLE } = require('../../helpers/http/constants')

const createUser = async (req, res) => {
    try {
        const { username, password, email, role } = req.body
        if (username === undefined || username === '') return sendError(res, REQUIRED_FIELD_MISSING_USERNAME).missingField()
        if (password === undefined || password === '') return sendError(res, REQUIRED_FIELD_MISSING_PASSWORD ).missingField()
        if (email === undefined || email === '') return sendError(res, REQUIRED_FIELD_MISSING_EMAIL).missingField()
        if (role === undefined) return sendError(res, REQUIRED_FIELD_MISSING_ROLE ).missingField()
        if (Role[role] === undefined) return sendError(res, ROLE_NOT_FOUND).badRequest()

        let isEmailExists = await userRepository().findOne({"email": email})
        if (isEmailExists) return sendError(res, USER_ALREAY_EXISTS).entityExists()

        let newUser = await userRepository().create(req.body)

        if (newUser) {
            return sendSuccess(res, POST_SUCCESS, newUser).created()
        } else {
            return sendError(res,SERVER_ERROR).internal()
        }
    } catch (error) {
        return sendError(res,SERVER_ERROR).internal()
    }
}

module.exports = {
  createUser: createUser
}
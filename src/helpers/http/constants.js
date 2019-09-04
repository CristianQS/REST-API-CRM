//2xx
module.exports.GET_SUCCESS = 'Fetched successfully'
module.exports.POST_SUCCESS = 'Created successfully'
module.exports.PUT_SUCCESS = 'Modified successfully'
module.exports.AUTH_SUCCESS = 'Authenticated successfully'

// 4xx Errors
module.exports.USER_NOT_FOUND = 'No user found in the system'
module.exports.ROLE_NOT_FOUND = 'No role found in the system'
module.exports.CUSTOMER_NOT_FOUND = 'No customer found in the system'
module.exports.BAD_PARAMETERS = 'Bad parameters'
module.exports.REQUIRED_FIELD_MISSING_EMAIL = 'Missing email field'
module.exports.REQUIRED_FIELD_MISSING_PASSWORD = 'Missing password field'
module.exports.REQUIRED_FIELD_MISSING_NAME = 'Missing name field'
module.exports.REQUIRED_FIELD_MISSING_USERNAME = 'Missing username field'
module.exports.REQUIRED_FIELD_MISSING_ROLE = 'Missing role field'
module.exports.CUSTOMER_ALREAY_EXISTS = 'Customer already exists'
module.exports.USER_ALREAY_EXISTS = 'User already exists'
module.exports.AUTH_FAILED = 'Authentication fail'
module.exports.UNSECURE_HEADER_TYPE = 'Missing or invalid content type header'
module.exports.UNAUTHORIZED = 'Not Authorized'

// 5xx Errors
module.exports.SERVER_ERROR = 'Something went wrong, Please try again'

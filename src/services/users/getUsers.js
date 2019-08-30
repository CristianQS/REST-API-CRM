const User = require('../../models/User')

const getAllUser = async (req, res) => {
  try {

    let users = await User.find({});

    if (users.length > 0) {
        return res.status(200).json({
            'message': 'users fetched successfully',
            'data': users
        })
    }

    return res.status(404).json({
        'code': 'BAD_REQUEST_ERROR',
        'description': 'No users found in the system'
    })
} catch (error) {
    return res.status(500).json({
        'code': 'SERVER_ERROR',
        'description': 'something went wrong, Please try again'
    })
}
}

module.exports = {
  getAllUser: getAllUser
}
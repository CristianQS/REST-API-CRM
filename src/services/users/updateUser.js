const User = require('../../models/user')

const updateUser = async (req, res) => {
  try {
      const userId = req.params.id

      const { username, email } = req.body

      if (username === undefined || username === '') {
          return res.status(422).json({
              'code': 'REQUIRED_FIELD_MISSING',
              'description': 'username is required',
              'field': 'username'
          })
      }

      if (email === undefined || email === '') {
          return res.status(422).json({
              'code': 'REQUIRED_FIELD_MISSING',
              'description': 'email is required',
              'field': 'email'
          })
      }


      let isUserExists = await User.findById(userId);

      if (!isUserExists) {
          return res.status(404).json({
              'code': 'BAD_REQUEST_ERROR',
              'description': 'No user found in the system'
          })
      }

      let updateUser = await User.findByIdAndUpdate(userId, req.body, {
          new: true
      });

      if (updateUser) {
          return res.status(200).json({
              'message': 'user updated successfully',
              'data': updateUser
          })
      } else {
          throw new Error('something went worng');
      }
  } catch (error) {

      return res.status(500).json({
          'code': 'SERVER_ERROR',
          'description': 'something went wrong, Please try again'
      })
  }
}

module.exports = {
    updateUser: updateUser
}
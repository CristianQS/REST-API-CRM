const User = require('../../models/user')

const deleteUser = async (req, res) => {
  try {
      let user = await User.findByIdAndRemove(req.params.id);
      if (user) {
          return res.status(204).json({
              'message': `user with id ${req.params.id} deleted successfully`
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
  deleteUser: deleteUser
}
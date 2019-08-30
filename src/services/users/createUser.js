const User = require('../../models/User')

const createUser = async (req, res) => {
    try {
        const { name, email } = req.body
        
        if (name === undefined || name === '') {
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
        let isEmailExists = await User.findOne({"email": email})

        if (isEmailExists) {
          return  res.status(409).send({ 
            'code': 'ENTITY_ALREAY_EXISTS', 
            'error': 'User already exists'
          })
        }

        let newCustomer = await Customer.create(req.body)

        if (newCustomer) {
          return res.status(200).json({
              'message': 'user updated successfully',
              'data': updateUser
          })
        } else {
            throw new Error('something went worng')
        }
    } catch (error) {
        return res.status(500).json({
          'code': 'SERVER_ERROR',
          'description': 'something went wrong, Please try again'
        })
    }
}

module.exports = {
  createUser: createUser
}
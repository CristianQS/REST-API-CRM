const app = require('../../app')
const chai = require('chai')
const request = require('supertest')
const expect = chai.expect

const { AUTH_HEADER } = require('../../src/helpers/auth/constants')
const { generateToken } = require('../../src/helpers/jwt/index')
const { Role } = require('../../src/models/role')
const { GET_SUCCESS,POST_SUCCESS, UNAUTHORIZED,
        REQUIRED_FIELD_MISSING_EMAIL, USER_ALREAY_EXISTS, 
        PUT_SUCCESS } = require('../../src/helpers/http/constants')

const getToken = (payload) => 'Bearer ' + generateToken(payload)
const BasicUser = {email:'jason@gmail.com'}
const AdminUser = {email:'bruce@gmail.com'}
const newAdminUser = { username: "Alfred", password: "jenkins",
                  email: "alfred@gmail.com", role: "ADMIN" }
let newAdminUserId = 0

describe('Users Endpoints Tests', function() { 
  describe('# GET /v1/users/', function() { 
    it('An ADMIN should get users ', function(done) { 
      request(app).get('/v1/users/')
      .set('Content-type','application/json')
      .set( AUTH_HEADER , getToken(AdminUser))
      .end(function(err, res) { 
        expect(res.statusCode).to.equal(200)
        expect(res.body.data).to.be.an('array')
        expect(res.body.message).to.be.equal(GET_SUCCESS)
        done()
      })
    })

    it('A BASIC User should not get users', function(done) { 
      request(app).get('/v1/users/')
      .set('Content-type','application/json')
      .set( AUTH_HEADER , getToken(BasicUser))
      .end(function(err, res) { 
        expect(res.statusCode).to.equal(415)
        expect(res.body.error).to.be.equal(UNAUTHORIZED)
        done()
      })
    })
  })

  describe('# POST /v1/users/', function() { 
    it('An ADMIN should create a user ', function(done) { 
      request(app).post('/v1/users/')
      .set('Content-type','application/json')
      .set(AUTH_HEADER , getToken(AdminUser))
      .send(newAdminUser)
      .end(function(err, res) { 
        expect(res.statusCode).to.equal(201)
        expect(res.body.data).to.be.an('object')
        expect(res.body.message).to.be.equal(POST_SUCCESS)
        newAdminUserId = res.body.data._id
        done()
      })
    })

    it('user already exits', function(done) { 
      request(app).post('/v1/users/')
      .set('Content-type','application/json')
      .set(AUTH_HEADER , getToken(AdminUser))
      .send(newAdminUser)
      .end(function(err, res) { 
        expect(res.statusCode).to.equal(409)
        expect(res.body.error).to.be.equal(USER_ALREAY_EXISTS)
        done()
      })
    })
    
    it('without email in the body', function(done) { 
      const { username, password, role } = newAdminUser
      request(app).post('/v1/users/')
      .set('Content-type','application/json')
      .set(AUTH_HEADER , getToken(AdminUser))
      .send({username,password,role})
      .end(function(err, res) { 
        expect(res.statusCode).to.equal(422)
        expect(res.body.error).to.be.equal(REQUIRED_FIELD_MISSING_EMAIL)
        done()
      })
    })

    it('A BASIC User should not create a user', function(done) { 
      request(app).post('/v1/users/')
      .set('Content-type','application/json')
      .set( AUTH_HEADER , getToken(BasicUser))
      .send(newAdminUser)
      .end(function(err, res) { 
        expect(res.statusCode).to.equal(415)
        expect(res.body.error).to.be.equal(UNAUTHORIZED)
        done()
      })
    })
  })

  describe('# PUT /v1/users/:id', function() { 
    it('An ADMIN should modified a user', function(done) { 
      newAdminUser.username = 'pepito'

      request(app).put(`/v1/users/${newAdminUserId}`)
      .set('Content-type','application/json')
      .set(AUTH_HEADER , getToken(AdminUser))
      .send({ username: 'pepito'})
      .end(function(err, res) { 
        let updatedUser = mapUser(res.body.data)
        expect(res.statusCode).to.equal(200)
        expect(updatedUser).eql(newAdminUser)
        expect(res.body.message).to.be.equal(PUT_SUCCESS)
        done()
      })
    })
   
    it('A BASIC User should not create a user', function(done) { 
      request(app).put(`/v1/users/${newAdminUserId}`)
      .set('Content-type','application/json')
      .set( AUTH_HEADER , getToken(BasicUser))
      .send({ username: 'pepito'})
      .end(function(err, res) { 
        expect(res.statusCode).to.equal(415)
        expect(res.body.error).to.be.equal(UNAUTHORIZED)
        done()
      })
    })
  })

  describe('# PATCH /v1/users/:id/role', function() { 
    it('An ADMIN should modified a user', function(done) { 
      newAdminUser.role = Role.BASIC

      request(app).patch(`/v1/users/${newAdminUserId}/role`)
      .set('Content-type','application/json')
      .set(AUTH_HEADER , getToken(AdminUser))
      .send({ role : Role.BASIC })
      .end(function(err, res) { 
        let updatedUser = mapUser(res.body.data)
        expect(res.statusCode).to.equal(200)
        expect(updatedUser).eql(newAdminUser)
        expect(res.body.message).to.be.equal(PUT_SUCCESS)
        done()
      })
    })
   
    it('A BASIC User should not create a user', function(done) { 
      request(app).patch(`/v1/users/${newAdminUserId}/role`)
      .set('Content-type','application/json')
      .set( AUTH_HEADER , getToken(BasicUser))
      .send({ role : Role.BASIC })
      .end(function(err, res) { 
        expect(res.statusCode).to.equal(415)
        expect(res.body.error).to.be.equal(UNAUTHORIZED)
        done()
      })
    })
  })

  describe('# DELETE /v1/users/:id', function() { 
    it('An ADMIN should delete a user', function(done) { 
      request(app).delete(`/v1/users/${newAdminUserId}`)
      .set('Content-type','application/json')
      .set(AUTH_HEADER , getToken(AdminUser))
      .end(function(err, res) { 
        expect(res.statusCode).to.equal(204)
        expect(res.body).to.be.empty
        done()
      })
    })
   
    it('A BASIC User should not create a user', function(done) { 
      request(app).delete(`/v1/users/${newAdminUserId}`)
      .set('Content-type','application/json')
      .set( AUTH_HEADER , getToken(BasicUser))
      .end(function(err, res) { 
        expect(res.statusCode).to.equal(415)
        expect(res.body.error).to.be.equal(UNAUTHORIZED)
        done()
      })
    })
  })
})

const mapUser = (data) => {
  return  { username: data.username, 
    password: data.password, email: data.email, 
    role: data.role 
  }
}
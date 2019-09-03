const app = require('../../app')
const chai = require('chai')
const request = require('supertest')
const expect = chai.expect

const { AUTH_HEADER } = require('../../src/helpers/auth/constants')
const { generateToken } = require('../../src/helpers/jwt/index')
const { GET_SUCCESS,POST_SUCCESS, UNAUTHORIZED,
        REQUIRED_FIELD_MISSING_EMAIL, USER_ALREAY_EXISTS } = require('../../src/helpers/http/constants')

const getToken = (payload) => 'Bearer ' + generateToken(payload)
const BasicUser = {email:'jason@gmail.com'}
const AdminUser = {email:'bruce@gmail.com'}
const newAdminUser = { username: "Alfred", password: "jenkins",
                  email: "alfred@gmail.com", role: "ADMIN" }

describe('Users Endpoints Tests', function() { 
  describe('# GET /v1/users/', function() { 
    it('should get users an ADMIN', function(done) { 
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

    it('should not get users a BASIC User', function(done) { 
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
    it('should create a user an ADMIN', function(done) { 
      request(app).post('/v1/users/')
      .set('Content-type','application/json')
      .set(AUTH_HEADER , getToken(AdminUser))
      .send(newAdminUser)
      .end(function(err, res) { 
        expect(res.statusCode).to.equal(201)
        expect(res.body.data).to.be.an('object')
        expect(res.body.message).to.be.equal(POST_SUCCESS)
        done()
      })
    })

    it('user already exits', function(done) { 
      request(app).post('/v1/users/')
      .set('Content-type','application/json')
      .set(AUTH_HEADER , getToken(AdminUser))
      .send(AdminUser)
      .end(function(err, res) { 
        expect(res.statusCode).to.equal(422)
        expect(res.body.data).to.be.an('object')
        expect(res.body.message).to.be.equal(USER_ALREAY_EXISTS)
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

    it('should not create a user a BASIC User', function(done) { 
      request(app).get('/v1/users/')
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
})
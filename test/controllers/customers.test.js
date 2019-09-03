const app = require('../../app')
const chai = require('chai')
const request = require('supertest')
const expect = chai.expect

const { AUTH_HEADER } = require('../../src/helpers/auth/constants')
const { generateToken } = require('../../src/helpers/jwt/index')
const { GET_SUCCESS, POST_SUCCESS, UNSECURE_HEADER_TYPE,
        REQUIRED_FIELD_MISSING_EMAIL, CUSTOMER_ALREAY_EXISTS, 
        PUT_SUCCESS, } = require('../../src/helpers/http/constants')

const getToken = (payload) => 'Bearer ' + generateToken(payload)
const User = { email:'jason@gmail.com' }
const newCustomer = { name: "Jesus", surname: "Cristo",
    email: "jesus@gmail.com", photo: ""
}
let newCustomerId = 0

describe('Customers Endpoints Tests', function() { 
  describe('# GET /v1/customers/', function() { 
    it('should get customers ', function(done) { 
      request(app).get('/v1/customers/')
      .set('Content-type','application/json')
      .set( AUTH_HEADER , getToken(User))
      .end(function(err, res) { 
        expect(res.statusCode).to.equal(200)
        expect(res.body.data).to.be.an('array')
        expect(res.body.message).to.be.equal(GET_SUCCESS)
        done()
      })
    })

    it('should not get customers', function(done) { 
      request(app).get('/v1/customers/')
      .set('Content-type','application/json')
      .end(function(err, res) { 
        expect(res.statusCode).to.equal(415)
        expect(res.body.error).to.be.equal(UNSECURE_HEADER_TYPE)
        done()
      })
    })
  })

  describe('# POST /v1/customers/', function() { 
    it('should create a user ', function(done) { 
      request(app).post('/v1/customers/')
      .set('Content-type','application/json')
      .set(AUTH_HEADER , getToken(User))
      .send(newCustomer)
      .end(function(err, res) { 
        expect(res.statusCode).to.equal(201)
        expect(res.body.data).to.be.an('object')
        expect(res.body.message).to.be.equal(POST_SUCCESS)
        newCustomerId = res.body.data._id
        done()
      })
    })

    it('customer already exits', function(done) { 
      request(app).post('/v1/customers/')
      .set('Content-type','application/json')
      .set(AUTH_HEADER , getToken(User))
      .send(newCustomer)
      .end(function(err, res) { 
        expect(res.statusCode).to.equal(409)
        expect(res.body.error).to.be.equal(CUSTOMER_ALREAY_EXISTS)
        done()
      })
    })
    
    it('without email in the body', function(done) { 
      const { name, surname } = newCustomer
      request(app).post('/v1/customers/')
      .set('Content-type','application/json')
      .set(AUTH_HEADER , getToken(User))
      .send({ name, surname })
      .end(function(err, res) { 
        expect(res.statusCode).to.equal(422)
        expect(res.body.error).to.be.equal(REQUIRED_FIELD_MISSING_EMAIL)
        done()
      })
    })

    it('should not create a customer', function(done) { 
      request(app).post('/v1/customers/')
      .set('Content-type','application/json')
      .end(function(err, res) { 
        expect(res.statusCode).to.equal(415)
        expect(res.body.error).to.be.equal(UNSECURE_HEADER_TYPE)
        done()
      })
    })
  })

  describe('# PUT /v1/customers/:id', function() { 
    it('should modified a customer', function(done) { 
      newCustomer.name = 'pepito'
      request(app).put(`/v1/customers/${newCustomerId}`)
      .set('Content-type','application/json')
      .set(AUTH_HEADER , getToken(User))
      .send({ name: 'pepito'})
      .end(function(err, res) { 
        let updatedCustomer = mapCustomer(res.body.data)
        expect(res.statusCode).to.equal(200)
        expect(updatedCustomer).eql(newCustomer)
        expect(res.body.message).to.be.equal(PUT_SUCCESS)
        done()
      })
    })
   
    it('should not modify a customer', function(done) { 
      request(app).put(`/v1/customers/${newCustomerId}`)
      .set('Content-type','application/json')
      .send({ name: 'pepito'})
      .end(function(err, res) { 
        expect(res.statusCode).to.equal(415)
        expect(res.body.error).to.be.equal(UNSECURE_HEADER_TYPE)
        done()
      })
    })
  })

  describe('# DELETE /v1/customers/:id', function() { 
    it('should not delete a customer', function(done) { 
      request(app).delete(`/v1/customers/${newCustomerId}`)
      .set('Content-type','application/json')
      .end(function(err, res) { 
        expect(res.statusCode).to.equal(415)
        expect(res.body.error).to.be.equal(UNSECURE_HEADER_TYPE)
        done()
      })
    })

    it('should delete a customer', function(done) { 
      request(app).delete(`/v1/customers/${newCustomerId}`)
      .set('Content-type','application/json')
      .set(AUTH_HEADER , getToken(User))
      .end(function(err, res) { 
        expect(res.statusCode).to.equal(204)
        expect(res.body).to.be.empty
        done()
      })
    })
   
  })
})

const mapCustomer = (data) => {
  console.log(data)
  return  { name: data.name, 
    surname: data.surname ,
    email: data.email , photo: data.photo,
  }
}
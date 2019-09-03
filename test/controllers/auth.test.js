const app = require('../../app')
const chai = require('chai')
const request = require('supertest')

const expect = chai.expect

describe('Auth Endpoints Tests', function() { 
  describe('# POST /v1/auth/', function() { 
    it('should get authntication', function(done) { 
      request(app).post('/v1/auth/')
      .set('Content-type','application/json')
      .send({
        "email": "bruce@gmail.com",
        "password": "Batman"
      })
      .end(function(err, res) { 
        expect(res.statusCode).to.equal(200)
        expect(res.body).to.be.an('object')
        expect(res.body.message).to.be.equal("Authenticated successfully")
        done()
      })
    })

    it('call authentication without body', function(done) { 
      request(app).post('/v1/auth/')
      .end(function(err, res) { 
        expect(res.statusCode).to.equal(415)
        done()
      })
    })

    it('authenticate a user who does not exists', function(done) { 
      request(app).post('/v1/auth/')
      .set('Content-type','application/json')
      .send({
        "email": "jo@gmail.com",
        "password": "Batman"
      })
      .end(function(err, res) { 
        expect(res.statusCode).to.equal(404)
        expect(res.body).to.be.an('object')
        done()
      })
    })
    it('authenticate a user who does not exists', function(done) { 
      request(app).post('/v1/auth/')
      .set('Content-type','application/json')
      .send({
        "email": "bruce@gmail.com",
        "password": "Barman"
      })
      .end(function(err, res) { 
        expect(res.statusCode).to.equal(400)
        expect(res.body).to.be.an('object')
        done()
      })
    })
  })
})
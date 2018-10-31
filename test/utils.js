let chai = require('chai')
let chaiHttp = require('chai-http')

let server = require('../index')
let should = chai.should()

chai.use(chaiHttp)

function testRegisterUser(done,user, shouldFail=false, cb=null) {
  chai.request(server)
    .post('/api/auth/register')
    .set('content-type', 'application/json')
    .send(user)
    .end((err, res) => {
      if (shouldFail) {
        res.should.have.status(400)
      } else {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.auth.should.be.eql(true)
      }

      if (cb !== null) cb(res.body)
    })
  done()
}

function testLoginUser(done,username, password, shouldFail=false, cb=null) {
  chai.request(server)
    .post('/api/auth/login')
    .set('content-type', 'application/json')
    .send({username: 'sayantan', password: 'secretpwd'})
    .end((err, res) => {
      res.should.have.status(200)
      res.body.should.be.a('object')
      res.body.should.have.property('auth').eql(true)
      res.body.should.have.property('user_id')

      if (cb !== null) cb(res.body)
    })
  done()
}

module.exports = {
  testRegisterUser,
  testLoginUser
}

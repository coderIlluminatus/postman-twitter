//During the test the env variable is set to test
process.env.NODE_ENV = 'test'

let mongoose = require("mongoose")
let User = require('../user/User')

//Require the dev-dependencies
let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../index')
let should = chai.should()

let testRegisterUser = require('./utils').testRegisterUser,
    testLoginUser = require('./utils').testLoginUser


chai.use(chaiHttp)

var userTokens = {
  sayantan: null,
  argha: null
}


//Our parent block
describe('User', () => {
  before((done) => {
    // register/login argha and sayantan and make their tokens available
    testRegisterUser(() => {},
                     {name: 'Sayantan', username: 'sayantan', password: 'secretpwd'},
                     shouldFail=false,
                     cb=(userobj) => { userTokens.sayantan = userobj }
                    )
    testRegisterUser(() => {},
                     {name: 'Argha', username: 'argha', password: 'secretpwd'},
                     shouldFail=false,
                     cb=(userobj) => { userTokens.argha = userobj }
                    )

    setTimeout(done, 1000)
  })
  /*
   * Test register
   */

  it('sayantan should follow argha', done => {
    chai.request(server)
      .post(`/api/user/${userTokens.argha.user_id}/follow`)
      .set('Authorization', `Bearer ${userTokens.sayantan.token}`)
      .send()
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.from.should.be.eql(userTokens.sayantan.user_id)
        res.body.to.should.be.eql(userTokens.argha.user_id)
        done()
      })
  })

  it('sayantan should unfollow argha', done => {
    chai.request(server)
      .post(`/api/user/${userTokens.argha.user_id}/unfollow`)
      .set('Authorization', `Bearer ${userTokens.sayantan.token}`)
      .send()
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.ok.should.be.eql(1)
        done()
      })
  })
})

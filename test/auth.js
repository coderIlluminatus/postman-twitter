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


//Our parent block
describe('Auth', () => {
  before((done) => { //Before each test we empty the database
    User.deleteMany({}, (err) => {
      done()
    })
  })
  /*
   * Test register
   */

  it('this should register sayantan',
     done => testRegisterUser(done, {name: 'Sayantan',
                                     username: 'sayantan',
                                     password: 'secretpwd'
                                    }
                             )
    )

  it('this should register argha',
     done => testRegisterUser(done, {name: 'Argha',
                                     username: 'argha',
                                     password: 'secretpwd'
                                    }
                             )
    )

  it('this registration should fail',
     done => testRegisterUser(done, {name: 'randomuser',
                                     username: null,
                                     password: ''
                                    },
                              shouldFail=true
                             )
    )

  it('this should login sayantan',
     done => testLoginUser(done, 'sayantan', 'secretpwd')
    )

  it('this should login argha',
     done => testLoginUser(done, 'argha', 'secretpwd')
    )

  it('this login should fail',
     done => testLoginUser(done, 'randomuser', 'wrongpassword', shouldFail=true)
    )
})

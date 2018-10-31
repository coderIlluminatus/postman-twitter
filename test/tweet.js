//During the test the env variable is set to test
process.env.NODE_ENV = 'test'

let mongoose = require("mongoose")
let Tweet = require('../tweet/Tweet')

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

var tweet = null

//Our parent block
describe('Tweet', () => {
  before((done) => {
    // empty the tweet collection
    Tweet.deleteMany({})

    // register/login argha and sayantan and make their tokens available
    testRegisterUser(() => {},
                     {name: 'Sayantan', username: 'sayantan', password: 'secretpwd'},
                     shouldFail=false,
                     cb=(userobj) => { userTokens.sayantan = userobj }
                    )
    setTimeout(done, 1000)
  })
  /*
   * Test register
   */

  it('create a tweet', done => {
    let tweetText = 'here is a new tweet'
    chai.request(server)
      .post(`/api/tweet/new`)
      .set('Authorization', `Bearer ${userTokens.sayantan.token}`)
      .set('content-type', 'application/json')
      .send({text: tweetText})
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.createdBy.should.be.eql(userTokens.sayantan.user_id)
        res.body.text.should.be.eql(tweetText)
        tweet = res.body
        done()
      })
  })

  it('read a tweet', done => {
    chai.request(server)
      .get(`/api/tweet/${tweet._id}`)
      .set('Authorization', `Bearer ${userTokens.sayantan.token}`)
      .set('content-type', 'application/json')
      .send()
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.createdBy.should.be.eql(userTokens.sayantan.user_id)
        res.body._id.should.be.eql(tweet._id)
        done()
      })
  })

  it('delete a tweet', done => {
    chai.request(server)
      .delete(`/api/tweet/${tweet._id}`)
      .set('Authorization', `Bearer ${userTokens.sayantan.token}`)
      .set('content-type', 'application/json')
      .send()
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('message')
        done()
      })
  })

  it('accessing non-existent tweet should fail', done =>  {
    chai.request(server)
      .get(`/api/tweet/${tweet._id}`)
      .set('Authorization', `Bearer ${userTokens.sayantan.token}`)
      .set('content-type', 'application/json')
      .send()
      .end((err, res) => {
        res.should.have.status(404)
        res.body.should.be.a('object')
        res.body.should.have.property('error')
        done()
      })
  })
})

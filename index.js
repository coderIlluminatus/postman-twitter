/**
 * This is the main file
 */

const express = require('express'),
      mongoose = require('mongoose'),
      app = express(),
      config = require('./config')




global.__root = __dirname + '/'

app.get('/api/status', (req, res) => {
  res.status(200).send("I'm alive!")
})


const AuthController = require(__root + 'auth/AuthController')
app.use('/api/auth', AuthController)

const UserController = require(__root + 'user/UserController')
app.use('/api/user', UserController)

const TweetController = require(__root + 'tweet/TweetController')
app.use('/api/tweet', TweetController)


mongoose.connect(config.dbURL, {useNewUrlParser: true})

app.listen(config.port || 3000, () => {
  console.log('Starting on port 3000')
})

module.exports = app

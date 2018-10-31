/**
 * This is the main file
 */

const express = require('express'),
      mongoose = require('mongoose'),
      app = express(),
      config = require('./config')




global.__root = __dirname + '/'

app.get('/', (req, res) => {
  res.send(`
<a href="https://documenter.getpostman.com/view/2547817/RzZ3N3Ui" title="Postman Collection">
<img src="https://res.cloudinary.com/postman/image/upload/w_152,h_56,c_fit,f_auto,t_team_logo/v1/team/768118b36f06c94b0306958b980558e6915839447e859fe16906e29d683976f0"
alt="Postman Collection" />
</a>
<a href="https://github.com/coderIlluminatus/postman-twitter" title="Github Repo">
<img src="https://www.bvoh.com/wp-content/uploads/2016/04/github-logo.jpg"
alt="Github repo" />
</a>

<br>
Click on Postman logo to view the API collection.
<br>
Click the Github logo to visit the repo.
`)
})

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

let port = config.port || 3000

app.listen(port, () => {
  console.log(`Starting on port ${port}`)
})

module.exports = app

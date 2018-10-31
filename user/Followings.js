const mongoose = require('mongoose')

const FollowerSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
})
mongoose.model('Follower', FollowerSchema)

module.exports = mongoose.model('Follower')

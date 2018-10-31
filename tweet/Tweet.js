// TODO Create mongoose schema here

var mongoose = require('mongoose')
var TweetSchema = new mongoose.Schema({
  createdBy: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  createdAt :{
    type: Date,
    default: Date.now
  },
  nLikes: {
    type: Number,
    default: 0
  },
  isRetweet: {
    type: Boolean,
    default: false
  },
  isReply: {
    type: Boolean,
    default: false
  },
  replies: {
    type: [{
      type: String
    }],
    default: []
  }
})

mongoose.model('Tweet', TweetSchema)

module.exports = mongoose.model('Tweet')

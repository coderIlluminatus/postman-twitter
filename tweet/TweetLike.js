// TODO User - Tweet map
// Similar to user follows
const mongoose = require('mongoose')

const TweetLikeSchema = new mongoose.Schema({
  tweetId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
})
mongoose.model('TweetLike', TweetLikeSchema)

module.exports = mongoose.model('TweetLike')

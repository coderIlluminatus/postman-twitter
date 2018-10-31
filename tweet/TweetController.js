// TODO Everything
var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser')

var VerifyToken = require(__root + 'auth/VerifyToken')

const Tweet = require('./Tweet')
const TweetLike = require('./TweetLike')

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())
router.use(VerifyToken)

router.post('/new', (req, res) => {

  Tweet.create(
    {
      createdBy: req.userId,
      text: req.body.text
    },
    (err, entry) => {
      if (err)
        return res.status(500).json({
          error: "Failed to mark the entry",
          message: err,
        })

      res.status(200).json(entry)
    }
  )
})

router.get('/:id', (req, res) => {
  Tweet.findById(req.params.id, (err, tweet) => {
    if (err || !tweet)
      return res.status(404).json({
        error: 'Failed to find tweet'
      })

    res.status(200).json(tweet)
  })
})

router.delete('/:id', (req, res) => {

  Tweet.deleteOne({
    _id: req.params.id,
    createdBy: req.userId
  }, err => {
    if (err) {
      res.status(404).json({
        error: 'Failed to find tweet'
      })
    } else {
      res.status(200).json({
        message: 'Successfully deleted!'
      })
    }
  })
})

router.post('/:id/retweet', (req, res) => {
  Tweet.findById(req.params.id, (err, tweet) => {
    if (err)
      return res.status(404).json({
        error: 'Failed to find tweet'
      })

    Tweet.create(
      {
        createdBy: req.userId,
        text: tweet.text,
        isRetweet: true
      },
      (err, newT) => {
        res.status(200).json(newT)
      }
    )
  })
})

router.post('/:id/like', (req, res) => {
  Tweet.findById(req.params.id, (err, tweet) => {
    if (err)
      return res.status(404).json({
        error: 'Failed to find tweet'
      })


    TweetLike.create(
      {
        tweetId: req.params.id,
        userId: req.userId
      },
      (err, like) => {
        if (err) {
          res.status(400).json({message: 'Bad request'})
          return
        }
        tweet.nLikes++
        tweet.save()
        res.status(200).json(like)
      }
    )

    // TweetLike.findOneAndUpdate(
    //   {tweetId: req.params.id, userId: req.userId},
    //   {tweetId: req.params.id, userId: req.userId},
    //   {upsert: true},
    //   (err, query) => {
    //     console.log(query, err)
    //     res.status(200).json(
    //       {tweetId: req.params.id, userId: req.userId},
    //     )
    //   }
    // )
  })

})

router.post('/:id/unlike', (req,res) => {
  Tweet.findById(req.params.id, (err, tweet) => {
    if (err)
      return res.status(404).json({
        error: 'Failed to find tweet'
      })

    TweetLike.deleteOne(
      {
        tweetId: req.params.id,
        userId: req.userId
      },
      (err, like) => {
        if (err) {
          res.status(400).json({message: 'Bad request'})
          return
        }

        tweet.nLikes--
        tweet.save()
        res.status(200).json(like)
      }
    )
  })

})

router.post('/:id/reply', (req, res) => {
  Tweet.create(
    {
      createdBy: req.userId,
      text: req.body.text,
      isReply: true
    },
    (err, reply) => {
      if (err)
        return res.status(500).json({
          error: "Failed to create the reply",
          message: err,
        })

      Tweet.findById(req.params.id, (err, originalTweet) => {
        if (err)
          return res.status(500).json({
            error: "Failed to find original tweet",
            message: err,
          })

        originalTweet.replies.push(reply._id)
        originalTweet.save()
        res.status(200).json(reply)
      })

    }
  )

})

module.exports = router

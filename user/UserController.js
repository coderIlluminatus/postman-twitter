var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser')

var VerifyToken = require(__root + 'auth/VerifyToken')

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())
router.use(VerifyToken)
var User = require('./User')
const Follower = require('./Followings')

router.post('/:id/follow', (req, res) => {
  // TODO validations
  // if already follows, don't follow
  // or some unique constraint on database

  // TODO entry to database
  console.log('follow:', req.userId, req.params.id)
  Follower.create(
    {
      from: req.userId,
      to: req.params.id,
    },
    (err, entry) => {
      if (err)
        return res.status(500).json({
          error: "Failed to mark the entry"
        })

      res.status(200).json(entry)
    }
  )
})

router.post('/:id/unfollow', (req, res) => {
  // TODO validations

  // TODO entry to database
  Follower.deleteOne(
    {
      from: req.userId,
      to: req.params.id,
    },
    (err, entry) => {
      if (err)
        return res.status(500).json({
          error: "Failed to mark the entry"
        })

      res.status(200).json(entry)
    }
  )
})


module.exports = router

const express = require('express')
const jwt = require('jsonwebtoken')
const db = require('../db')
const router = express.Router()

router.post('/authenticate', (req, res) => {
  const username = req.body.username
  const password = req.body.password

  db.getUser(username, (err, user) => {
    if (err) console.error(err);

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found' })
      console.log('Authentication failed. User not found');
    } else if (user) {

      if (user.password != password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.'})
        console.log('Authentication failed. Wrong password.');
      } else {
        console.log('Authentication proceeding . . .');
        let token = jwt.sign(user, 'deepneuralnetworks', {
          expiresIn: '1440m'
        })
        res.json({
          success: true,
          message: 'New user token',
          token: token
        })
      }
    }
  })
})

module.exports = router

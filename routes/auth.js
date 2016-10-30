const express = require('express')
const jwt = require('jsonwebtoken')
const db = require('../db')
const router = express.Router()

router.post('/authenticate', (req, res) => {
  const username = req.body.username
  const password = req.body.password
  if (!username || !password) {
    return res.json({ success: false, message: 'INVALID BODY: username or password field was empty'})
  }
  const authFailMessage = 'Authentication failed. Invalid username or password'

  db.getUser(username, (err, user) => {
    if (err) console.error(err);

    if (!user) {
      res.json({ success: false, message: authFailMessage })
    } else if (user) {

      if (user.password != password) {
        res.json({ success: false, message: authFailMessage })
      } else {
        let token = jwt.sign(user, 'bh09h98HFeaf32adSfasd#adfas', {
          expiresIn: '1440m'
        })
        res.json({
          success: true,
          message: 'New user token',
          id_token: token
        })
      }
    }
  })
})

module.exports = router

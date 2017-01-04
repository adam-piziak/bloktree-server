const express = require('express')
const router = express.Router()
const db = require('../db')
const user = require('../user.js')

router.post('/create', (req, res) => {
  const username = req.body.username
  const password = req.body.password
  db.createUser(username, password, (err, success) => {
    if (err) {
      res.json({ err, success: false })
    } else {
      res.json({ success: true })
    }
  })
})

router.post('/check', (req, res) => {
  const username = req.body.username
  db.getUser(username, (err, success) => {
    if (err) {
      res.json({err, success: false})
    } else if (success) {
      res.json({success: true})
    } else {
      res.json({exists: false, success: false})
    }
  })
})

router.post('/delete', (req, res) => {
  const id = user.id
  db.deleteUser(id, (err, success) => {
    if (err) {
      res.json({success: false, error: 'Sorry. There was an problem deleting your account'})
    } else {
      res.json({success: true })
    }
  })
})

module.exports = router

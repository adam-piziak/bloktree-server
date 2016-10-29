const express = require('express')
const router = express.Router()
const db = require('../db')

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

router.post('/delete', (req, res) => {
  
})

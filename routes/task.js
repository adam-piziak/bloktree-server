const express = require('express')
const router = express.Router()
const db = require('../db')

router.post('/create', (req, res) => {
  db.createTask(USER_ID, req.body.task, (err, success) => {
    if (err){
      res.json({success: false})
    } else {
      res.json({success: true})
    }
  })
})

router.post('/edit', (req, res) => {
  db.editTask(USER_ID, req.body.edit, (err, success) => {
    if (err) {
      res.json({ success: false })
    } else {
      res.json({ success: true })
    }
  })
})

router.post('/delete', (req, res) => {
  db.deleteTask(USER_ID, req.body.taskId, (err, success) => {
    if (err) {
      res.json({ success: false })
    } else {
      res.json({ success: true })
    }
  })
})

module.exports = router

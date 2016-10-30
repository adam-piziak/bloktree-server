const express = require('express')
const router = express.Router()
const db = require('../db')
const user = require('../user')

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

router.post('/getAll', (req, res) => {
  db.getAllTasks((err, tasks) => {
    if (err) {
      console.error(err)
      res.json({success: false, error: err})
    }
    else {
      console.log(tasks)
      res.json({success: true, tasks})
    }
  })
})

module.exports = router

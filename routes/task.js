const express = require('express')
const router = express.Router()
const db = require('../db')
const user = require('../user')

router.post('/create', (req, res) => {
  db.createTask(req.body.unit, (err, success) => {
    if (err){
      res.json({success: false})
    } else {
      res.json({success: true})
    }
  })
})

router.post('/edit', (req, res) => {
  db.editTask(req.body.edit, (error, success) => {
    if (error) {
      console.log(error)
      res.json({ success: false, error })
    } else {
      res.json({ success: true })
    }
  })
})

router.post('/delete', (req, res) => {
  db.deleteTask(req.body.taskId, (err, success) => {
    if (err) {
      res.json({ success: false })
    } else {
      res.json({ success: true })
    }
  })
})

router.post('/getAll', (req, res) => {
  console.log('client requesting all tasks')
  db.getAllTasks((err, tasks) => {
    if (err) {
      console.error(err)
      res.json({success: false, error: err})
    }
    else {
      res.json({success: true, tasks})
    }
  })
})

router.post('/makeGroup', (req, res) => {
  db.task.makeGroup(req.body.id, (err) => {
    if (err) {
      res.json({ success: false, error: err })
    } else {
      res.json({ success: true })
    }
  })
})

module.exports = router

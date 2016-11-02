const express = require('express')
const router = express.Router()
const db = require('../db')
const user = require('../user')

router.post('/create', (req, res) => {
  const project = {
    name: req.body.project.name,
    color: req.body.project.color
  }
  db.project.create(project, (err, success) => {
    if (err) {
      res.json({
        success: false,
        error: 'Server error occured while attempting to create project'
      })
    } else {
      res.json({
        success: true
      })
    }
  })
})

router.post('/edit', (req, res) => {
  const edit = req.body.edit
  db.project.edit(edit, (err) => {
    if (err) {
      res.json({
        success: false,
        error: 'Server error occured while attempting to edit project'
      })
    } else {
      res.json({
        success: true
      })
    }
  })
})

router.post('/delete', (req, res) => {
  const projectId = req.body.projectId
  db.project.delete(projectId, (err) => {
    if (err) {
      res.json({
        success: false,
        error: 'Server error occured while attempting to delete project'
      })
    } else {
      res.json({
        success: true
      })
    }
  })
})

router.post('/getAll', (req, res) => {
  db.project.getAll((err, projects) => {
    if (err) {
      res.json({
        success: false,
        error: 'Server error occured while attempting to retrieve all projects'
      })
    } else {
      res.json({
        success: true,
        projects
      })
    }
  })
})


module.exports = router

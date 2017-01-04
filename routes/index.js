const express = require('express')
const router = express.Router()
const checkToken = require('../middleware/auth/checkToken')
const path = require('path')
const bodyParser = require('body-parser')

const auth = require('./auth')
const task = require('./task')
const project = require('./project')
const user = require('./user')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))

router.use('/', auth)
router.use('/user', user)
router.use(checkToken) // Make sure valid token is provided before proceeding
router.use('/task', task)
router.use('/project', project)


router.use((req, res) => {
  res.status(404).sendFile(__dirname + '/views/404.html')
})
router.use((error, req, res, next) => {
  res.status(500).send('<h1>500: Internal Server Error </h1>' + error)
})

module.exports = router

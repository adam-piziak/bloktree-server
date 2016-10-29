const express = require('express')
const router = express.Router()

const task = require('task')

router.use('/task', task)

module.exports = router

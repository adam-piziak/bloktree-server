const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const jwt = require('jsonwebtoken')
const db = require('./db');
const routes = require('./routes')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 3000

let USERNAME = undefined
let USER_ID = undefined

// FOR DEVELOPMENT ONLY, DISABLE FOR PRODUCTION //
app.use(cors()) // Allow for cross origin requests
//////////////////////////////////////////////////

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})

app.post('/authenticate', (req, res) => {
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

app.use((req, res, next) => {
  let token = req.body.token || req.query.token || req.headers['x-access-token']

  if (token) {
    jwt.verify(token, 'bh09h98HFeaf32adSfasd#adfas', (err, decoded) => {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' })
      } else {
        if (!USERNAME && !USER_ID) {
          USERNAME = decoded.username
          USER_ID = decoded.id
        }
        req.decoded = decoded
        next()
      }
    })
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided'
    })
  }
})

app.post('/deleteUser', (req, res) => {
  db.deleteUser(USER_ID, (err, success) => {
    if (err)
      res.json({ success: false})
    else
      res.json({ success: true })
  })
})

app.post('/getAllTasks', (req, res) => {
  db.getAllTasks(USER_ID, (err, tasks) => {
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

app.post('/createTask', (req, res) => {
  db.createTask(USER_ID, req.body.task, (err, success) => {
    if (err){
      res.json({success: false})
      console.error(err)
    } else {
      res.json({success: true})
    }
  })
})

app.post('/editTask', (req, res) => {
  db.editTask(USER_ID, req.body.edit, (err, success) => {
    if (err) {
      res.json({ success: false })
    } else {
      res.json({ success: true })
    }
  })
})

app.post('/deleteTask', (req, res) => {
  db.deleteTask(USER_ID, req.body.taskId, (err, success) => {
    if (err) {
      res.json({ success: false })
    } else {
      res.json({ success: true })
    }
  })
})

app.use('/', routes)

app.use((req, res) => {
  res.status(404).sendFile(__dirname + '/views/404.html')
})
app.use((error, req, res, next) => {
  res.status(500).send('<h1>500: Internal Server Error </h1>' + error)
})
app.listen(port, () => {
  console.log(`App started on 127.0.0.1:` + port)
})

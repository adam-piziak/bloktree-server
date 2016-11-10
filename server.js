const express = require('express')
const routes = require('./routes')
const path = require('path')
const cors = require('cors') // FOR DEVELOPMENT ONLY, DISABLE FOR PRODUCTION //

const app = express()
const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'public')))

// FOR DEVELOPMENT ONLY, DISABLE FOR PRODUCTION //
app.use(cors()) // Allow for cross origin requests
//////////////////////////////////////////////////

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})
app.get('/tasks', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})
app.get('/projects', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})
app.use('/', routes)

app.use((req, res) => {
  res.status(404).sendFile(__dirname + '/views/index.html')
})

app.listen(port, () => {
  console.log(`App started on 127.0.0.1:` + port)
})

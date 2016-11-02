const express = require('express')
const routes = require('./routes')
const cors = require('cors') // FOR DEVELOPMENT ONLY, DISABLE FOR PRODUCTION //

const app = express()
const port = process.env.PORT || 3000

// FOR DEVELOPMENT ONLY, DISABLE FOR PRODUCTION //
app.use(cors()) // Allow for cross origin requests
//////////////////////////////////////////////////

app.use('/', routes)

app.listen(port, () => {
  console.log(`App started on 127.0.0.1:` + port)
})

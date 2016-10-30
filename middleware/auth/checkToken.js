const jwt = require('jsonwebtoken')
const user = require('../../user')

verify = (req, res, next) => {
  let token = req.body.token || req.query.token || req.headers['x-access-token']

  if (token) {
    jwt.verify(token, 'bh09h98HFeaf32adSfasd#adfas', (err, decoded) => {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' })
      } else {
        user.username = decoded.username
        user.id = decoded.id
        // req.decoded = decoded
        next()
      }
    })
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided'
    })
  }
}

module.exports = verify

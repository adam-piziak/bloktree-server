verify = (req, res, next) => {
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
}

module.exports = verify

const authStateValidation = (req, res, next) => {
  const receivedState = req.body.state
  const actualState = req.session.state
  
  if(receivedState !== actualState) {
    res.status(401).end()
    return
  }
  next()
}

module.exports = authStateValidation
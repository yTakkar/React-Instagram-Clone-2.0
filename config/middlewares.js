module.exports.variables = (req, res, next) => {
  let loggedIn = req.session.id ? true : false
  res.locals.loggedIn = loggedIn
  res.locals.session = req.session
  next()
}

module.exports.LoggedIn = (req, res, next) =>
  !req.session.id ? res.redirect('/login'): next()

module.exports.NotLoggedIn = (req, res, next) =>
  req.session.id ? res.redirect('/'): next()

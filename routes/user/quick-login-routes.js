// ALL THE QUICK LOGIN-RELATED ROUTES ARE HANDLED BY THIS FILE

const app = require('express').Router()

// QUICK LOGIN = USER ONLY HAVE TO PROVIDE PASSWORD, USERNAME IS STORED IN COOKIE

// REMOVE QUICK LOGIN
app.post('/remove-quick-login', (req, res) => {
  let users = JSON.parse(req.cookies.users),
    filtered = users.filter(u => u.id != req.body.id)

  res.cookie('users', `${JSON.stringify(filtered)}`)
  res.json('Hello, World!!')
})

// CLEAR ALL QUICK LOGINS
app.post('/clear-all-quick-logins', (req, res) => {
  res.clearCookie('users')
  res.json('Hello, World!!')
})

module.exports = app

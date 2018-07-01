// ALL ROUTES OF A NOT LOGGEDIN USER IS HANDLED BY THIS FILE.
// ALSO THE PAGE IS RESPONSIBLE FOR RENDERING REACT FOR A LOGGEDIN USER.

const app = require('express').Router(),
  mw = require('../config/Middlewares')

// WELCOME ROUTE
app.get('/welcome', mw.NotLoggedIn, (req, res) => {
  let options = { title: 'Welcome' }
  res.render('welcome', { options })
})

// 404 ROUTE
app.get('/404', mw.LoggedIn, (req, res) => {
  let options = { title: 'Oops!! Error' }
  res.render('404', { options })
})

// HELP ROUTE
app.get('/help', (req, res) => {
  let options = { title: 'Help' }
  res.render('help', { options })
})

// DEVELOPER ROUTE
app.get('/developer', (req, res) => {
  let options = { title: 'Developer' }
  res.render('developer', { options })
})

// ABOUT ROUTE
app.get('/about', (req, res) => {
  let options = { title: 'About' }
  res.render('about', { options })
})

// ROUTE FOR LOGGED IN USER [REACT IS RENDERED BY THIS ROUTE]
app.get('*', mw.LoggedIn, (req, res) => {
  let options = { title: '📸' }
  res.render('app', { options })
})

module.exports = app

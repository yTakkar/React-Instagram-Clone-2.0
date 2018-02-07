const
  app = require('express').Router(),
  mw = require('../config/middlewares')

app.get('/welcome', mw.NotLoggedIn, (req, res) => {
  let options = { title: 'Welcome' }
  res.render('welcome', { options })
})

app.get('/404', mw.LoggedIn, (req, res) => {
  let options = { title: 'Oops!! Error' }
  res.render('404', { options })
})

app.get('/help', (req, res) => {
  let options = { title: 'Help' }
  res.render('help', { options })
})

app.get('/developer', (req, res) => {
  let options = { title: 'Developer' }
  res.render('developer', { options })
})

app.get('/about', (req, res) => {
  let options = { title: 'About' }
  res.render('about', { options })
})

app.get('*', mw.LoggedIn, (req, res) => {
  let options = { title: '📸' }
  res.render('app', { options })
})

module.exports = app

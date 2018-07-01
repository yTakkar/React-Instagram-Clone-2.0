/**
 * @author Faiyaz Shaikh <www.shtakkar@gmail.com>
 * GitHub repo: https://github.com/yTakkar/React-Instagram-Clone-2.0
 */

// MAIN ENTRY OF OUR APP

// Initializes dotenv
require('dotenv').config()

// Require Dependencies
const express = require('express'),
  app = express(),
  {
    env: { PORT, SESSION_SECRET_LETTER },
  } = process,
  { rainbow } = require('handy-log'),
  favicon = require('serve-favicon'),
  { join } = require('path'),
  hbs = require('express-handlebars'),
  bodyParser = require('body-parser'),
  validator = require('express-validator'),
  session = require('client-sessions'),
  cookieParser = require('cookie-parser')

// Project Files
const { variables } = require('./config/Middlewares')
const AppRoutes = require('./app-routes')

// View engine
app.engine(
  'hbs',
  hbs({
    extname: 'hbs',
  })
)
app.set('view engine', 'hbs')

// Middlewares
app.use(favicon(join(__dirname, '/dist/images/favicon/favicon.png')))
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
)
app.use(validator())
app.use(express.static(join(__dirname, '/dist')))
app.use(
  session({
    cookieName: 'session',
    secret: SESSION_SECRET_LETTER,
    duration: 24 * 60 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
  })
)
app.use(cookieParser())

// Middleware for some local variables to be used in the template
app.use(variables)

// App routes
AppRoutes(app)

// Listening to PORT
app.listen(PORT, () => rainbow('App running..'))

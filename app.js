// MAIN ENTRY OF OUR APP

// Initializes dotenv
require('dotenv').config()

// Require Dependencies
const express = require('express'),
  app = express(),
  http = require('http'),
  {
    env: { PORT, SESSION_SECRET_LETTER },
  } = process,
  { rainbow } = require('handy-log'),
  favicon = require('serve-favicon'),
  { join } = require('path'),
  fs = require('fs'),
  hbs = require('express-handlebars'),
  bodyParser = require('body-parser'),
  validator = require('express-validator'),
  session = require('client-sessions'),
  cookieParser = require('cookie-parser')

// Project Files
const { variables } = require('./config/Middlewares')
const AppRoutes = require('./app-routes')
const { initSocket } = require('./config/Socket')

const parsedPort = Number(PORT)
const port = Number.isFinite(parsedPort) && parsedPort > 0 ? parsedPort : 8000
const sessionSecret = SESSION_SECRET_LETTER || 'dev-secret-change-me'

if (!SESSION_SECRET_LETTER) {
  console.warn('SESSION_SECRET_LETTER is not set. Using a fallback value.')
}
if (!PORT || !Number.isFinite(parsedPort) || parsedPort <= 0) {
  console.warn('PORT is not set or invalid. Falling back to 8000.')
}

// View engine
app.engine(
  'hbs',
  hbs({
    extname: 'hbs',
  })
)
app.set('view engine', 'hbs')

// Middlewares
const faviconPath = join(__dirname, 'dist', 'images', 'favicon', 'old', 'instagram.png')
if (fs.existsSync(faviconPath)) {
  app.use(favicon(faviconPath))
} else {
  console.warn('Favicon not found. Skipping favicon middleware.')
}
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
    secret: sessionSecret,
    duration: 24 * 60 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
  })
)
app.use(cookieParser())

// Middleware for some local variables to be used in the template
app.use(variables)

// App routes
AppRoutes(app)

// Create HTTP server and initialize Socket.io
const server = http.createServer(app)
try {
  initSocket(server)
} catch (error) {
  console.error('Socket initialization failed:', error.message)
}

server.on('error', (error) => {
  console.error('Server error:', error.message)
})

let shuttingDown = false
const shutdown = (reason, error, exitCode = 1) => {
  if (shuttingDown) return
  shuttingDown = true

  if (error) {
    console.error(`[${reason}]`, error)
  } else {
    console.error(`[${reason}]`)
  }

  if (server && server.listening) {
    server.close(() => process.exit(exitCode))
    setTimeout(() => process.exit(exitCode), 5000).unref()
  } else {
    process.exit(exitCode)
  }
}

process.on('uncaughtException', (error) => shutdown('uncaughtException', error))
process.on('unhandledRejection', (error) => shutdown('unhandledRejection', error))
process.on('SIGTERM', () => shutdown('SIGTERM', null, 0))
process.on('SIGINT', () => shutdown('SIGINT', null, 0))

// Listening to PORT
server.listen(port, () => rainbow(`App running on port ${port}..`))

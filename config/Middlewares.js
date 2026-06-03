// MIDDLEWARES FOR EXPRESS

const db = require('./db')

/** FOR CREATING LOCAL VARIABLES */
const variables = (req, res, next) => {
  let loggedIn = req.session.id ? true : false
  res.locals.loggedIn = loggedIn
  res.locals.session = req.session
  next()
}

/** FOR LOGGED IN USERS ONLY */
const LoggedIn = (req, res, next) => {
  !req.session.id ? res.redirect('/login') : next()
}

/** FOR NOT-LOGGED IN USERS ONLY */
const NotLoggedIn = (req, res, next) => {
  req.session.id ? res.redirect('/') : next()
}

/** FOR AUTHENTICATED API REQUESTS (session or JWT) */
const AuthRequired = (req, res, next) => {
  // Check JWT token
  const authHeader = req.headers.authorization
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const { verifyToken } = require('./JWT')
    const token = authHeader.substring(7)
    const decoded = verifyToken(token)
    if (decoded) {
      req.session.id = decoded.id
      req.session.username = decoded.username
      req.session.role = decoded.role
      return next()
    }
  }
  // Fall back to session
  if (req.session && req.session.id) {
    return next()
  }
  return res.status(401).json({ mssg: 'Authentication required!' })
}

/** FOR ADMIN ONLY ROUTES */
const AdminOnly = async (req, res, next) => {
  try {
    // Check session-based admin flag first
    if (req.session.isadmin === true) {
      return next()
    }

    // Check JWT role
    if (req.session.role === 'admin') {
      return next()
    }

    // Check database role
    if (req.session.id) {
      const [user] = await db.query('SELECT role FROM users WHERE id=? LIMIT 1', [req.session.id])
      if (user && user.role === 'admin') {
        req.session.role = 'admin'
        return next()
      }
    }

    return res.status(403).json({ mssg: 'Admin access required!' })
  } catch (error) {
    return res.status(403).json({ mssg: 'Admin access required!' })
  }
}

module.exports = {
  variables,
  LoggedIn,
  NotLoggedIn,
  AuthRequired,
  AdminOnly,
}

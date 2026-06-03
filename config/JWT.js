/**
 * JWT Authentication Utility
 * 
 * Provides JWT token generation, verification, and Express middleware
 * for authenticating API requests alongside the existing session-based auth.
 */

const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET || 'instagram-clone-jwt-secret-key-2024'
const JWT_EXPIRES_IN = '7d'

/**
 * Generate a JWT token for a user
 * @param {Object} payload - User data to encode (id, username, role)
 * @returns {String} Signed JWT token
 */
const generateToken = (payload) => {
  return jwt.sign(
    {
      id: payload.id,
      username: payload.username,
      role: payload.role || 'user',
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  )
}

/**
 * Verify and decode a JWT token
 * @param {String} token - JWT token string
 * @returns {Object|null} Decoded payload or null if invalid
 */
const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}

/**
 * Express middleware: Authenticate via JWT or fall back to session
 * Checks Authorization header for Bearer token first,
 * then falls back to existing session-based auth.
 */
const authMiddleware = (req, res, next) => {
  // First check JWT token in Authorization header
  const authHeader = req.headers.authorization
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7)
    const decoded = verifyToken(token)
    if (decoded) {
      req.session.id = decoded.id
      req.session.username = decoded.username
      req.session.role = decoded.role
      return next()
    }
  }

  // Fall back to session-based auth
  if (req.session && req.session.id) {
    return next()
  }

  return res.status(401).json({ mssg: 'Authentication required!' })
}

module.exports = {
  generateToken,
  verifyToken,
  authMiddleware,
  JWT_SECRET,
}

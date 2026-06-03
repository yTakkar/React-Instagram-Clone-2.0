// ALL THE ADMIN-RELATED ROUTES ARE HANDLED BY THIS FILE

const app = require('express').Router(),
  db = require('../../../config/db'),
  User = require('../../../config/User')

// CHECKS IF USER IS ADMIN [REQ = PASSWORD]
// Supports both legacy password-based and role-based admin verification
app.post('/check-is-admin', async (req, res) => {
  try {
    let { password } = req.body
    let { id } = req.session
    let { ADMIN_PASSWORD } = process.env

    // Check 1: Role-based admin (from database)
    if (id) {
      const isAdmin = await User.isUserAdmin(id)
      if (isAdmin) {
        req.session.isadmin = true
        req.session.role = 'admin'
        return res.json({
          mssg: 'Hello admin!!',
          success: true,
        })
      }
    }

    // Check 2: Legacy password-based admin (fallback)
    if (password && password === ADMIN_PASSWORD) {
      req.session.isadmin = true
      // Also promote user role in DB if they know admin password
      if (id) {
        await db.query('UPDATE users SET role=? WHERE id=?', ['admin', id])
        req.session.role = 'admin'
      }
      return res.json({
        mssg: 'Hello admin!!',
        success: true,
      })
    }

    res.json({ mssg: 'Wrong password or insufficient privileges!!' })
  } catch (error) {
    db.catchError(error, res)
  }
})

// ADMIN LOGOUT
app.post('/admin-logout', async (req, res) => {
  req.session.isadmin = false
  res.json('Hello, World!!')
})

// CHECK ADMIN STATUS (for frontend to verify current admin state)
app.post('/check-admin-status', async (req, res) => {
  try {
    let { id } = req.session
    if (!id) {
      return res.json({ isAdmin: false })
    }

    const isAdmin = await User.isUserAdmin(id)
    const isSessionAdmin = req.session.isadmin === true

    res.json({
      isAdmin: isAdmin || isSessionAdmin,
      role: isAdmin ? 'admin' : 'user',
    })
  } catch (error) {
    res.json({ isAdmin: false })
  }
})

module.exports = app

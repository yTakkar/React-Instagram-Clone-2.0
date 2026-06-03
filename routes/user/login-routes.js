// ALL THE USER LOGIN-RELATED ROUTES ARE HANDLED BY THIS FILE

const app = require('express').Router(),
  db = require('../../config/db'),
  User = require('../../config/User'),
  mw = require('../../config/Middlewares'),
  { uniqBy } = require('lodash'),
  { generateToken } = require('../../config/JWT')

// USER LOGIN GET ROUTE
app.get('/login', mw.NotLoggedIn, (req, res) => {
  let options = {
    title: 'Login To Continue',
    users: req.cookies.users ? JSON.parse(req.cookies.users).slice(0, 15) : [],
  }
  res.render('login', { options })
})

// LOGS THE USER IN
app.post('/user/login', async (req, res) => {
  try {
    let {
      body: { username: rusername, password: rpassword },
      session,
    } = req

    req.checkBody('username', 'Username is empty!!').notEmpty()
    req.checkBody('password', 'Password field is empty!!').notEmpty()

    let errors = await req.getValidationResult()
    if (!errors.isEmpty()) {
      let array = []
      errors.array().forEach(e => array.push(e.msg))
      res.json({ mssg: array })
    } else {
      let result = await db.query(
        'SELECT id, password, email_verified, role, account_status from users WHERE username=? LIMIT 1',
        [rusername]
      )

      if (!result || result.length == 0) {
        res.json({ mssg: 'User not found!!' })
      } else {
        let [{ id, password, email_verified, role, account_status }] = result

        // Check account status
        if (account_status === 'locked') {
          return res.json({ mssg: 'Your account has been locked by admin. Please contact support.' })
        }
        if (account_status === 'deleted') {
          return res.json({ mssg: 'This account has been deleted.' })
        }

        let same = User.comparePassword(rpassword, password)
        if (!same) {
          res.json({ mssg: 'Wrong password!!' })
        } else {
          session.id = id
          session.username = rusername
          session.email_verified = email_verified
          session.isadmin = role === 'admin'
          session.role = role || 'user'

          await db.query('UPDATE users SET isOnline=? WHERE id=?', ['yes', id])

          // Generate JWT token
          const token = generateToken({ id, username: rusername, role: role || 'user' })

          res.json({
            mssg: `Welcome ${rusername}!!`,
            success: true,
            token,
            role: role || 'user',
          })
        }
      }
    }
  } catch (error) {
    db.catchError(error, res)
  }
})

// LOGS USER OUT
app.get('/logout', mw.LoggedIn, async (req, res) => {
  try {
    let { id, username } = req.session,
      user = { id, username },
      oldUsers = req.cookies.users ? JSON.parse(req.cookies.users) : [],
      users = []

    oldUsers.map(o => users.push(o))
    let final = uniqBy([user, ...users], 'id')
    res.cookie('users', `${JSON.stringify(final)}`)

    let u = {
      isOnline: 'no',
      lastOnline: new Date().getTime(),
    }
    await db.query('UPDATE users SET ? WHERE id=?', [u, id])

    let url = req.session.reset() ? '/login' : '/'
    res.redirect(url)
  } catch (error) {
    console.log(error)
  }
})

module.exports = app

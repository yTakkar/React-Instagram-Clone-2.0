// ALL THE USER PASSWORD-RELATED ROUTES ARE HANDLED BY THIS FILE

const app = require('express').Router(),
  db = require('../../config/db'),
  User = require('../../config/User'),
  mw = require('../../config/Middlewares')

// FORGOT PASSWORD
app.get('/forgot-password', mw.NotLoggedIn, (req, res) => {
  let options = { title: 'Forgot password' }
  res.render('forgotPassword', { options })
})

// RETRIVE PASSWORD
app.post('/user/password-retrieve', async (req, res) => {
  let { email } = req.body,
    [{ emailExists, id, username, email_verified }] = await db.query(
      'SELECT COUNT(email) AS emailExists, id, username, email_verified FROM users WHERE email=?',
      [email]
    )

  req.checkBody('email', 'Email is empty!!').notEmpty()
  req.checkBody('email', 'Invalid email!!').isEmail()

  let errors = await req.getValidationResult()
  if (!errors.isEmpty()) {
    let array = []
    errors.array().forEach(e => array.push(e.msg))
    res.json({ mssg: array })
  } else {
    if (emailExists == 0) {
      res.json({ mssg: 'No such user exists!!' })
    } else {
      req.session.id = id
      req.session.username = username
      req.session.email_verified = email_verified

      res.json({
        mssg: 'Successful',
        success: true,
      })
    }
  }
})

// USER PASSWORD CHANGE
app.post('/user/change-password', async (req, res) => {
  let { old, new_, new_a } = req.body,
    { id } = req.session,
    user_pass = await User.getWhat('password', id)

  req.checkBody('old', 'Old password is empty!!').notEmpty()
  req.checkBody('new_', 'New password field is empty!!').notEmpty()
  req.checkBody('new_a', 'New password field is empty!!').notEmpty()

  let errors = await req.getValidationResult()
  if (!errors.isEmpty()) {
    let array = []
    errors.array().forEach(e => array.push(e.msg))
    res.json({ mssg: array })
  } else {
    let same = await User.comparePassword(old, user_pass)

    if (!same) {
      res.json({ mssg: 'Incorrect password!!' })
    } else if (new_ != new_a) {
      res.json({ mssg: "New passwords don't match" })
    } else {
      let done = await User.change_password({ id, password: new_ })

      if (done) {
        res.json({
          mssg: 'Password changed!!',
          success: true,
        })
      } else {
        res.json({ mssg: 'Error changing the password!!' })
      }
    }
  }
})

module.exports = app

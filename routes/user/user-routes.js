// ALL THE USER-RELATED ROUTES ARE HANDLED BY THIS FILE

const app = require('express').Router(),
  db = require('../../config/db'),
  User = require('../../config/User'),
  mw = require('../../config/Middlewares')

// CHECKS IF USERNAME EXISTS WHEN REGISTERING
app.post('/user/username-checker', async (req, res) => {
  let [{ count }] = await db.query(
    'SELECT COUNT(username) AS count FROM users WHERE username=?',
    [req.body.value]
  )
  res.json(count)
})

// USER IS REDIRECTED TO THIS ROUTE AFTER REGISTERATION
app.get('/registered', mw.LoggedIn, async (req, res) => {
  let { id } = req.session,
    [{ email_verified }] = await db.query(
      'SELECT email_verified FROM users WHERE id=? LIMIT 1',
      [id]
    ),
    options = {
      title: 'Registered',
      mssg:
        'Email has been sent. Check your inbox and click on the provided link!!',
    }

  email_verified == 'yes'
    ? res.redirect('/')
    : res.render('registered', { options })
})

// USER EMAIL VERIFICATION
app.get('/deep/most/topmost/activate/:id', async (req, res) => {
  let {
      params: { id },
      session,
    } = req,
    { changedRows } = await db.query(
      'UPDATE users SET email_verified=? WHERE id=?',
      ['yes', id]
    ),
    mssg

  session.email_verified = 'yes'
  mssg = changedRows == 0 ? 'alr' : 'yes'

  res.redirect(`/email-verification/${mssg}`)
})

// USER DEACTIVATE ACCOUNT
app.post('/user/deactivate-account', async (req, res) => {
  let { id } = req.session,
    userPassword = await User.getWhat('password', id),
    { password } = req.body,
    samePassword = await User.comparePassword(password, userPassword)

  req.checkBody('password', 'Password is empty!!').notEmpty()

  let errors = await req.getValidationResult()
  if (!errors.isEmpty()) {
    let array = []
    errors.array().forEach(e => array.push(e.msg))
    res.json({ mssg: array })
  } else if (!samePassword) {
    res.json({ mssg: 'Wrong password!!' })
  } else {
    await User.deactivate(id, req, res)

    res.json({
      mssg: 'Deactivated your account successfully!!',
      success: true,
    })
  }
})

// REMOVES USER [ACTION DONE BY THE ADMIN]
app.post('/user/remove-user', async (req, res) => {
  let { user } = req.body
  let username = await User.getWhat('username', user)

  await User.deactivate(user, req, res)
  res.json({
    mssg: `Removed ${username}`,
    success: true,
  })
})

module.exports = app

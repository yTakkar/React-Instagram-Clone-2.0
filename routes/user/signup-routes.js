// ALL THE USER SIGNUP-RELATED ROUTES ARE HANDLED BY THIS FILE

const app = require('express').Router(),
  db = require('../../config/db'),
  dir = process.cwd(),
  mail = require('../../config/Mail'),
  User = require('../../config/User'),
  fs = require('fs'),
  { promisify } = require('util'),
  { success } = require('handy-log'),
  mw = require('../../config/Middlewares')

// USER SIGNUP GET ROUTE
app.get('/signup', mw.NotLoggedIn, (req, res) => {
  let options = { title: 'Signup For Free' }
  res.render('signup', { options })
})

const sendMailAndcreateDir = async (insertId, username, email, res) => {
  let mkdir = promisify(fs.mkdir)

  await mkdir(`${dir}/dist/users/${insertId}`)
  fs.createReadStream(`${dir}/dist/images/spacecraft.jpg`).pipe(
    fs.createWriteStream(`${dir}/dist/users/${insertId}/avatar.jpg`)
  )

  let url = `http://localhost:${
      process.env.PORT
    }/deep/most/topmost/activate/${insertId}`,
    options = {
      to: email,
      subject: 'Activate your Instagram account',
      html: `<span>Hello ${username}, You received this message because you created an account on Instagram.<span><br><span>Click on button below to activate your account and explore.</span><br><br><a href='${url}' style='border: 1px solid #1b9be9; font-weight: 600; color: #fff; border-radius: 3px; cursor: pointer; outline: none; background: #1b9be9; padding: 4px 15px; display: inline-block; text-decoration: none;'>Activate</a>`,
    }

  try {
    let m = await mail(options)
    success(m)

    res.json({
      mssg: `Hello, ${username}!!`,
      success: true,
    })
  } catch (error) {
    res.json({
      mssg: `Hello, ${username}. Mail could not be sent!!`,
      success: true,
    })
  }
}

// REGISTERS A USER
app.post('/user/signup', async (req, res) => {
  try {
    let {
      body: { username, firstname, surname, email, password },
      session,
    } = req

    db.c_validator('username', req)
    db.c_validator('firstname', req)
    db.c_validator('surname', req)

    req.checkBody('email', 'Email is empty!!').notEmpty()
    req.checkBody('email', 'Invalid email!!').isEmail()
    req.checkBody('password', 'Password field is empty').notEmpty()

    let errors = await req.getValidationResult()
    if (!errors.isEmpty()) {
      let array = []
      errors.array().forEach(e => array.push(e.msg))
      res.json({ mssg: array })
    } else {
      let [{ usernameCount }] = await db.query(
          'SELECT COUNT(username) as usernameCount from users WHERE username=?',
          [username]
        ),
        [{ emailCount }] = await db.query(
          'SELECT COUNT(email) as emailCount from users WHERE email=?',
          [email]
        )

      if (usernameCount == 1) {
        res.json({ mssg: 'Username already exists!!' })
      } else if (emailCount == 1) {
        res.json({ mssg: 'Email already exists!!' })
      } else {
        let newUser = {
          username,
          firstname,
          surname,
          email,
          password,
          joined: new Date().getTime(),
          email_verified: 'no',
          isOnline: 'yes',
        }
        let { insertId, affectedRows } = await User.create_user(newUser)

        if (affectedRows == 1) {
          session.id = insertId
          session.username = username
          session.email_verified = 'no'

          await sendMailAndcreateDir(insertId, username, email, res)
        } else {
          res.json({ mssg: 'An error occured creating your account!!' })
        }
      }
    }
  } catch (error) {
    db.catchError(error, res)
  }
})

module.exports = app

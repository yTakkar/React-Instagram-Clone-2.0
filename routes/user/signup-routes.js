// ALL THE USER SIGNUP-RELATED ROUTES ARE HANDLED BY THIS FILE

const app = require('express').Router(),
  db = require('../../config/db'),
  dir = process.cwd(),
  mail = require('../../config/Mail'),
  User = require('../../config/User'),
  fs = require('fs'),
  { promisify } = require('util'),
  { success } = require('handy-log'),
  mw = require('../../config/Middlewares'),
  { generateToken } = require('../../config/JWT')

// USER SIGNUP GET ROUTE
app.get('/signup', mw.NotLoggedIn, (req, res) => {
  let options = { title: 'Signup For Free' }
  res.render('signup', { options })
})

const sendMailAndcreateDir = async (insertId, username, email, res, token, role) => {
  let mkdir = promisify(fs.mkdir)
  let userDir = `${dir}/dist/users/${insertId}`

  if (!fs.existsSync(userDir)) {
    await mkdir(userDir)
  }
  fs.createReadStream(`${dir}/dist/images/spacecraft.jpg`).pipe(
    fs.createWriteStream(`${userDir}/avatar.jpg`)
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
      token,
      role,
    })
  } catch (error) {
    res.json({
      mssg: `Hello, ${username}. Mail could not be sent!!`,
      success: true,
      token,
      role,
    })
  }
}

// REGISTERS A USER
app.post('/user/signup', async (req, res) => {
  try {
    let {
      body: { username, firstname, surname, email, password, admin_password },
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
        let role = 'user'
        if (admin_password && admin_password === process.env.ADMIN_PASSWORD) {
          role = 'admin'
        } else if (admin_password && admin_password !== process.env.ADMIN_PASSWORD) {
          return res.json({ mssg: 'Invalid Admin Password!!' })
        }

        let newUser = {
          username,
          firstname,
          surname,
          nickname: '',
          email,
          password,
          bio: '',
          instagram: '',
          twitter: '',
          facebook: '',
          github: '',
          website: '',
          phone: '',
          joined: new Date().getTime().toString(),
          email_verified: 'no',
          isOnline: 'yes',
          lastOnline: '',
          role,
          cover_image: '',
          account_status: 'active',
        }
        let { insertId, affectedRows } = await User.create_user(newUser)

        if (affectedRows == 1) {
          session.id = insertId
          session.username = username
          session.email_verified = 'no'
          session.role = role

          // Generate JWT token
          const token = generateToken({ id: insertId, username, role })

          await sendMailAndcreateDir(insertId, username, email, res, token, role)
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

// ALL EDIT PROFILE-RELATED ROUTES ARE HANDLED BY THIS FILE

const app = require('express').Router(),
  db = require('../../../config/db'),
  mail = require('../../../config/Mail')

// RETURNS THE COUNT OF A GIVEN FIELD SUCH.
// EG. POST('/api/what-exists', { what: 'username', value: 'Takkar' })
app.post('/what-exists', async (req, res) => {
  let { what, value } = req.body
  let s = await db.query(
    `SELECT COUNT(${what}) AS count FROM users WHERE ${what}=?`,
    [value]
  )
  res.json(s[0].count)
})

// EDIT PROFILE [REQ = ...]
app.post('/edit-profile', async (req, res) => {
  let {
    username,
    firstname,
    surname,
    email,
    bio,
    twitter,
    instagram,
    facebook,
    github,
    website,
    phone,
    tags,
  } = req.body
  let { id } = req.session

  // filter illegal characters
  let replacer = /[^a-z0-9_.@$#]/g
  username = username.replace(replacer, '')
  firstname = firstname.replace(replacer, '')
  surname = surname.replace(replacer, '')

  db.c_validator('username', req)
  db.c_validator('firstname', req)
  db.c_validator('surname', req)

  req.checkBody('email', 'Email is empty').notEmpty()
  req.checkBody('email', 'Email is invalid').isEmail()

  let errors = await req.getValidationResult()
  if (!errors.isEmpty()) {
    let array = []
    errors.array().forEach(e => array.push(e.msg))
    res.json({ mssg: array })
  } else {
    req.session.username = username

    await db.query(
      'UPDATE users SET username=?, firstname=?, surname=?, email=?, bio=?, instagram=?, twitter=?, github=?, facebook=?, website=?, phone=? WHERE id=?',
      [
        username,
        firstname,
        surname,
        email,
        bio,
        instagram,
        twitter,
        github,
        facebook,
        website,
        phone,
        id,
      ]
    )

    await db.query(
      'UPDATE follow_system SET follow_by_username = ? WHERE follow_by=?',
      [username, id]
    ),
      await db.query(
        'UPDATE follow_system SET follow_to_username = ? WHERE follow_to=?',
        [username, id]
      ),
      await db.query('DELETE FROM tags WHERE user=?', [id])

    tags.forEach(async t => {
      let insertTag = {
        user: t.user,
        tag: t.tag,
      }
      await db.query('INSERT INTO tags SET ?', insertTag)
    })

    res.json({
      mssg: 'Profile updated!!',
      success: true,
    })
  }
})

// FOR RESENDING THE VERIFICATION LINK
app.post('/resend_vl', async (req, res) => {
  let { id } = req.session,
    [{ username, email }] = await db.query(
      'SELECT username, email FROM users WHERE id=?',
      [id]
    ),
    url = `http://localhost:${
      process.env.PORT
    }/deep/most/topmost/activate/${id}`,
    options = {
      to: email,
      subject: 'Activate your Instagam account',
      html: `<span>Hello ${username}, You received this message because you created an account on Instagram.<span><br><span>Click on button below to activate your account and explore.</span><br><br><a href='${url}' style='border: 1px solid #1b9be9; font-weight: 600; color: #fff; border-radius: 3px; cursor: pointer; outline: none; background: #1b9be9; padding: 4px 15px; display: inline-block; text-decoration: none;'>Activate</a>`,
    }

  try {
    await mail(options)
    res.json({ mssg: 'Verification link sent to your email!!' })
  } catch (error) {
    res.json({ mssg: 'Mail could not be sent!!' })
  }
})

// CHANGE ACCOUNT TYPE [REQ = TYPE]
app.post('/change-account-type', async (req, res) => {
  let { type } = req.body
  let { id } = req.session
  await db.query('UPDATE users SET account_type=? WHERE id=?', [type, id])
  res.json('Hello, World!!')
})

module.exports = app

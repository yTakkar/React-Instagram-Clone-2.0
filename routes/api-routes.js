const
  app = require('express').Router(),
  db = require('../config/db')

// FOR CHECKING IF IT'S A VALID USER
app.post('/is-user-valid', async (req, res) => {
  let
    { username } = req.body,
    [{ userCount }] = await db.query('SELECT COUNT(id) AS userCount FROM users WHERE username=? LIMIT 1', [username])
  res.json(userCount == 1 ? true : false)
})

// GETTING USER DETAILS
app.post('/get-user-details', async (req, res) => {
  let
    { username } = req.body,
    id = await db.getId(username),
    details = await db.query(
      'SELECT id, username, firstname, surname, email, bio, joined, email_verified, account_type, instagram, twitter, facebook, github, website, phone FROM users WHERE username=?',
      [ username ]
    ),
    tags = await db.query('SELECT user, tag FROM tags WHERE user=?', [ id ])

  res.json({
    details: details[0],
    tags
  })

})

// GETTING MUTUAL USERS
app.post('/get-mutual-users', async (req, res) => {
  let
    { username } = req.body,
    user = await db.getId(username),
    { id } = req.session,
    _mutuals = await db.mutualUsers(id, user),
    mutuals = []

  for (let m of _mutuals) {
    let mutualUsers = await db.mutualUsers(id, m.user)
    mutuals.push({ ...m, mutualUsersCount: mutualUsers.length })
  }

  res.json(mutuals)
})

module.exports = app

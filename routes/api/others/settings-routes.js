// ALL SETTINGS-RELATED ROUTES ARE HANDLED BY THIS FILE

const app = require('express').Router(),
  db = require('../../../config/db'),
  User = require('../../../config/User')

// BLOCK USER
app.post('/block', async (req, res) => {
  let respObj = {}

  try {
    let { user } = req.body,
      { id } = req.session,
      username = await User.getWhat('username', user),
      isBlocked = await User.isBlocked(id, user),
      blocked = {
        block_by: id,
        user,
        block_time: new Date().getTime(),
      }

    if (!isBlocked) {
      await db.query('INSERT INTO blocks SET ?', blocked)
      await db.query(
        'DELETE FROM follow_system WHERE follow_by=? AND follow_to=?',
        [user, id]
      )
      await db.query(
        'DELETE FROM follow_system WHERE follow_by=? AND follow_to=?',
        [id, user]
      )
      respObj = { mssg: `Blocked ${username}!!` }
    } else {
      respObj = { mssg: `Already blocked ${username}!!` }
    }
  } catch (error) {
    console.log(error)
    respObj = { mssg: 'An error occured!!' }
  }

  res.json(respObj)
})

// UNBLOCK USER
app.post('/unblock-user', async (req, res) => {
  try {
    await db.query('DELETE FROM blocks WHERE block_id=?', [req.body.block_id])
    res.json({ success: true })
  } catch (error) {
    db.catchError(error, res)
  }
})

// GET BLOCKED USERS
app.post('/get-blocked-users', async (req, res) => {
  let { id } = req.session,
    _blockedUsers = await db.query(
      'SELECT blocks.block_id, blocks.user, users.username, users.firstname, users.surname, blocks.block_time FROM blocks, users WHERE blocks.block_by = ? AND blocks.user = users.id ORDER BY blocks.block_time DESC',
      [id]
    ),
    blockedUsers = []

  for (let b of _blockedUsers) {
    let mutualFollowers = await User.mutualUsers(id, b.user)
    blockedUsers.push({
      ...b,
      mutualFollowersCount: mutualFollowers.length,
    })
  }

  res.json(blockedUsers)
})

module.exports = app

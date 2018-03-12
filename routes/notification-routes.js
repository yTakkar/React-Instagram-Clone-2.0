const
  app = require('express').Router(),
  db = require('../config/db'),
  User = require('../config/User')

app.post('/notify', async (req, res) => {
  let
    { to, type, post_id, group_id, user } = req.body,
    { id } = req.session,
    insert = {
      notify_by: id,
      notify_to: to,
      type,
      notify_time: new Date().getTime(),
      post_id,
      group_id,
      user
    }

  await db.query('INSERT INTO notifications SET ?', insert)
  res.json({ mssg: 'Notified!!' })
})

app.post('/get-notifications', async (req, res) => {
  let
    { id } = req.session,
    notifications = await db.query(
      'SELECT notifications.notify_id, notifications.notify_by, users.username AS notify_by_username, notifications.notify_time, notifications.post_id, notifications.group_id, notifications.type, notifications.user FROM notifications, users WHERE notifications.notify_to=? AND notifications.notify_by = users.id ORDER BY notifications.notify_time DESC',
      [ id ]
    ),
    array = []

  for (let n of notifications) {
    let
      isFollowing = await User.isFollowing(id, n.notify_by),
      user_username = n.user != 0 ? await db.getWhat('username', n.user) : ''

    array.push({
      ...n,
      isFollowing,
      user_username
    })
  }

  res.json(array)
})

app.post('/clear-notifications', async (req, res) => {
  let { id } = req.session
  db.query('DELETE FROM notifications WHERE notify_to=?', [ id ])
  res.json('Hello, World!!')
})

app.post('/get-unread-notifications', async (req, res) => {
  let
    { id } = req.session,
    [{ count }] = await db.query('SELECT COUNT(notify_id) AS count FROM notifications WHERE notify_to=? AND status=?', [ id, 'unread' ])
  res.json(count)
})

app.post('/read-notifications', async (req, res) => {
  let { id } = req.session
  await db.query('UPDATE notifications SET status=? WHERE notify_to=?', [ 'read', id ])
  res.json('Hello, World!!')
})

module.exports = app

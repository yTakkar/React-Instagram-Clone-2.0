// ALL CONVERSATIONS-RELATED ROUTES ARE HANDLED BY THIS FILE

const app = require('express').Router(),
  db = require('../../../config/db'),
  User = require('../../../config/User'),
  Mssg = require('../../../config/Message'),
  root = process.cwd(),
  { unlink } = require('fs'),
  { promisify } = require('util'),
  { orderBy } = require('lodash')

// CREATES A CONVERSATION [REQ = USER]
app.post('/create-new-conversation', async (req, res) => {
  let respObj = {}

  try {
    let { id } = req.session,
      { user } = req.body,
      username = await User.getWhat('username', user),
      [{ conExists }] = await db.query(
        'SELECT COUNT(con_id) AS conExists FROM conversations WHERE ((user_one=? AND user_two=?) OR (user_one=? AND user_two=?))',
        [id, user, user, id]
      )

    if (conExists == 0) {
      let conversation = {
        user_one: id,
        user_two: user,
        con_time: new Date().getTime(),
      }

      let { insertId } = await db.query(
        'INSERT INTO conversations SET ?',
        conversation
      )

      respObj = {
        success: true,
        mssg: `Conversation with ${username} created!!`,
        con_id: insertId,
      }
    } else {
      respObj = { mssg: `Conversation with ${username} already exists!!` }
    }
  } catch (error) {
    console.log(error)
    respObj = { mssg: 'An error occured!!' }
  }

  res.json(respObj)
})

// GET CONVERSATIONS OF THE SESSION USER
app.post('/get-conversations', async (req, res) => {
  let { id } = req.session,
    _cons = await db.query(
      'SELECT con_id, user_one, user_two FROM conversations WHERE user_one=? OR user_two=? ORDER BY con_time DESC',
      [id, id]
    ),
    cons = []

  for (let c of _cons) {
    let con_with = c.user_one == id ? c.user_two : c.user_one,
      con_with_username = await User.getWhat('username', con_with),
      con_with_firstname = await User.getWhat('firstname', con_with),
      con_with_surname = await User.getWhat('surname', con_with),
      lastMssgTime = await Mssg.getLastMssgTime(c.con_id),
      [{ unreadMssgs }] = await db.query(
        'SELECT COUNT(message_id) AS unreadMssgs FROM messages WHERE con_id=? AND mssg_to=? AND status=?',
        [c.con_id, id, 'unread']
      ),
      lastMssg = await Mssg.getLastMssg(c.con_id)

    cons.push({
      con_id: c.con_id,
      con_with,
      con_with_username,
      con_with_firstname,
      con_with_surname,
      unreadMssgs,
      lastMssg: {
        lastMssgTime,
        lastMessage: lastMssg ? lastMssg.message : '',
        lastMssgType: lastMssg ? lastMssg.type : '',
        lastMssgBy: lastMssg ? lastMssg.mssg_by : '',
      },
    })
  }

  let orderedCons = orderBy(cons, ['unreadMssgs'], ['desc'])
  res.json(orderedCons)
})

// GET CONVERSATION DETAILS [REQ = CON_ID]
app.post('/get-conversation-details', async (req, res) => {
  let { id } = req.session,
    { con_id } = req.body,
    [_con] = await db.query('SELECT * FROM conversations WHERE con_id=?', [
      con_id,
    ])

  let con_with = _con.user_one == id ? _con.user_two : _con.user_one,
    con_with_username = await User.getWhat('username', con_with),
    con_with_firstname = await User.getWhat('firstname', con_with),
    con_with_surname = await User.getWhat('surname', con_with),
    isOnline = await User.getWhat('isOnline', con_with),
    lastOnline = await User.getWhat('lastOnline', con_with)

  let con = {
    con_id,
    con_with,
    con_with_username,
    con_with_firstname,
    con_with_surname,
    isOnline: isOnline == 'yes' ? true : false,
    lastOnline,
  }

  res.json(con)
})

// GET CONVERSATION MESSAGES [REQ = CON_ID]
app.post('/get-conversation-messages', async (req, res) => {
  let messages = await db.query(
    'SELECT * FROM messages WHERE con_id = ? ORDER BY message_time',
    [req.body.con_id]
  )
  res.json(messages)
})

// UNSEND ALL MESSAGES [REQ = CON_ID]
app.post('/unsend-all-mssgs', async (req, res) => {
  try {
    let { con_id } = req.body,
      { id } = req.session,
      messages = await db.query(
        'SELECT message, type FROM messages WHERE con_id=? AND mssg_by=?',
        [con_id, id]
      ),
      deleteMessageFile = promisify(unlink)

    for (let m of messages) {
      if (m.type != 'text') {
        await deleteMessageFile(`${root}/dist/messages/${m.message}`)
      }
    }

    await db.query('DELETE FROM messages WHERE con_id=? AND mssg_by=?', [
      con_id,
      id,
    ])

    res.json({
      success: true,
      mssg: 'Deleted all your messages!!',
    })
  } catch (error) {
    db.catchError(error, res)
  }
})

// DELETE CONVERSATION [REQ = CON_ID]
app.post('/delete-conversation', async (req, res) => {
  try {
    await Mssg.deleteCon(req.body.con_id)
    res.json({
      success: true,
      mssg: 'Deleted conversation!!',
    })
  } catch (error) {
    db.catchError(error, res)
  }
})

// GET CONVERSATION ABOUT DETAILS [REQ = CON_ID]
app.post('/get-conversation-about', async (req, res) => {
  let { con_id, user } = req.body,
    [{ mssgsCount }] = await db.query(
      'SELECT COUNT(message_id) AS mssgsCount FROM messages WHERE con_id=?',
      [con_id]
    ),
    _media = await db.query(
      'SELECT message AS imgSrc, mssg_by FROM messages WHERE con_id=? AND type=? ORDER BY message_time DESC',
      [con_id, 'image']
    ),
    media = [],
    [{ con_time }] = await db.query(
      'SELECT con_time FROM conversations WHERE con_id=?',
      [con_id]
    ),
    mutualFollowers = await User.mutualUsers(req.session.id, user)

  for (let m of _media) {
    let mssg_by_username = await User.getWhat('username', m.mssg_by)
    media.push({ ...m, mssg_by_username })
  }

  res.json({
    mssgsCount,
    media,
    con_time,
    mutualFollowersCount: mutualFollowers.length,
  })
})

// GET UNREAD MESSAGES
app.post('/get-unread-messages', async (req, res) => {
  let [{ unreads }] = await db.query(
    'SELECT COUNT(message_id) AS unreads FROM messages WHERE mssg_to=? AND status=?',
    [req.session.id, 'unread']
  )
  res.json(unreads)
})

// READ MESSAGES OF A CONVERSATION [REQ = CON_ID]
app.post('/read-conversation', async (req, res) => {
  await db.query('UPDATE messages SET status=? WHERE con_id=? AND mssg_to=?', [
    'read',
    req.body.con_id,
    req.session.id,
  ])
  res.json('Hello, World!!')
})

// GET ONLINE USERS
app.post('/get-online-users', async (req, res) => {
  let { id } = req.session,
    _onlineUsers = await db.query(
      'SELECT follow_system.follow_to AS user, users.username, users.firstname, users.surname FROM follow_system, users WHERE follow_system.follow_by=? AND follow_system.follow_to = users.id AND users.isOnline = "yes"',
      [id]
    ),
    onlineUsers = []

  for (let u of _onlineUsers) {
    let mutualUsers = await User.mutualUsers(id, u.user)
    onlineUsers.push({
      ...u,
      mutualUsersCount: mutualUsers.length,
    })
  }

  res.json(onlineUsers)
})

module.exports = app

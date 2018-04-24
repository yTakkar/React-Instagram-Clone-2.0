// ALL MESSAGES/CONVERSATIONS-RELATED ROUTES ARE HANDLED BY THIS FILE

const
  app = require('express').Router(),
  db = require('../config/db'),
  User = require('../config/User'),
  Mssg = require('../config/Message'),
  root = process.cwd(),
  upload = require('multer')({
    dest: `${root}/public/temp/`
  }),
  { ProcessImage, DeleteAllOfFolder } = require('handy-image-processor'),
  { createReadStream, createWriteStream, unlink } = require('fs'),
  { promisify } = require('util'),
  { orderBy } = require('lodash'),
  UserConfig = require('../config/User')

// CREATES A CONVERSATION [REQ = USER]
app.post('/create-new-conversation', async (req, res) => {
  let
    { id } = req.session,
    { user } = req.body,
    username = await User.getWhat('username', user),
    firstname = await User.getWhat('firstname', user),
    surname = await User.getWhat('surname', user),
    [{ conExists }] = await db.query(
      'SELECT COUNT(con_id) AS conExists FROM conversations WHERE ((user_one=? AND user_two=?) OR (user_one=? AND user_two=?))',
      [ id, user, user, id ]
    )

  if(conExists == 0) {

    let conversation = {
      user_one: id,
      user_two: user,
      con_time: new Date().getTime()
    }

    let
      { insertId } = await db.query('INSERT INTO conversations SET ?', conversation),
      mutualFollowers = await User.mutualUsers(id, user)

    res.json({
      mssg: `Conversation with ${username} created!!`,
      success: true,
      con_id: insertId,
      mutualFollowersCount: mutualFollowers.length,
      firstname, surname
    })

  } else {
    res.json({ mssg: `Conversation with ${username} already exists!!` })
  }

})

// GET CONVERSATIONS OF THE SESSION USER
app.post('/get-conversations', async (req, res) => {
  let
    { id } = req.session,
    _cons = await db.query(
      'SELECT con_id, user_one, user_two FROM conversations WHERE user_one=? OR user_two=? ORDER BY con_time DESC',
      [ id, id ]
    ),
    cons = []

  for (let c of _cons) {
    let
      con_with = c.user_one == id ? c.user_two : c.user_one,
      con_with_username = await User.getWhat('username', con_with),
      con_with_firstname = await User.getWhat('firstname', con_with),
      con_with_surname = await User.getWhat('surname', con_with),
      lastMssgTime = await Mssg.getLastMssgTime(c.con_id),
      [{ unreadMssgs }] = await db.query(
        'SELECT COUNT(message_id) AS unreadMssgs FROM messages WHERE con_id=? AND mssg_to=? AND status=?',
        [ c.con_id, id, 'unread' ]
      ),
      lastMssg = await Mssg.getLastMssg(c.con_id),
      isOnline = await User.getWhat('isOnline', con_with),
      lastOnline = await User.getWhat('lastOnline', con_with)

    cons.push({
      ...c,
      con_with,
      con_with_username,
      con_with_firstname,
      con_with_surname,
      unreadMssgs,
      lastMssg: {
        lastMssgTime,
        lastMessage: lastMssg ? lastMssg.message : '',
        lastMssgType: lastMssg ? lastMssg.type : '',
        lastMssgBy: lastMssg ? lastMssg.mssg_by : ''
      },
      isOnline: isOnline == 'yes' ? true : false,
      lastOnline,
    })
  }

  let orderedCons = orderBy(cons, ['unreadMssgs'], ['desc'])
  res.json(orderedCons)
})

// GET CONVERSATION MESSAGES [REQ = CON_ID]
app.post('/get-conversation-messages', async (req, res) => {
  let messages = await db.query(
    'SELECT * FROM messages WHERE con_id = ? ORDER BY message_time',
    [ req.body.con_id ]
  )
  res.json(messages)
})

// TEXT MESSAGE [REQ = MESSAGE, CON_ID, CON_WITH]
app.post('/text-message', async (req, res) => {
  let
    { message, con_id, con_with } = req.body,
    newMessage = {
      con_id,
      mssg_by: req.session.id,
      mssg_to: con_with,
      message,
      type: 'text',
      message_time: new Date().getTime()
    }
  let { insertId } = await db.query('INSERT INTO messages SET ?', newMessage)
  res.json({ message_id: insertId })
})

// IMAGE MESSAGE [REQ = CON_ID, CON_WITH, MESSAGEFILE(FILE)]
app.post('/image-message', upload.single('messageFile'), async (req, res) => {
  let
    { con_id, con_with } = req.body,
    filename = `instagram_message_${new Date().getTime()}.jpg`,
    obj = {
      srcFile: req.file.path,
      destFile: `${root}/public/messages/${filename}`
    },
    message = {
      con_id,
      mssg_by: req.session.id,
      mssg_to: con_with,
      message: filename,
      type: 'image',
      message_time: new Date().getTime()
    }

  await ProcessImage(obj)
  DeleteAllOfFolder(`${root}/public/temp/`)

  let { insertId } = await db.query('INSERT INTO messages SET ?', message)

  res.json({
    message_id: insertId,
    filename
  })
})

// COMMENT STICKER [REQ = CON_ID, STICKER, CON_WITH]
app.post('/sticker-message', async (req, res) => {
  let
    { sticker, con_id, con_with } = req.body,
    filename = `instagram_message_${new Date().getTime()}.jpg`,
    message = {
      con_id,
      mssg_by: req.session.id,
      mssg_to: con_with,
      message: filename,
      type: 'sticker',
      message_time: new Date().getTime()
    }

  await createReadStream(`${root}/public/images/stickers/${sticker}`)
    .pipe(createWriteStream(`${root}/public/messages/${filename}`))

  let { insertId } = await db.query('INSERT INTO messages SET ?', message)

  res.json({
    message_id: insertId,
    filename
  })
})

// EDIT MESSAGE [REQ = MESSAGE, MESSAGE_ID]
app.post('/edit-message', async (req, res) => {
  let { message, message_id } = req.body
  await db.query('UPDATE messages SET message=? WHERE message_id=?', [ message, message_id ])
  res.json('Hello, World!!')
})

// DELETE MESSAGE [REQ = MESSAGE_ID, TYPE, MESSAGE]
app.post('/delete-message', async (req, res) => {
  let
    { message_id, type, message } = req.body,
    deleteMessageFile = promisify(unlink)

  await db.query('DELETE FROM messages WHERE message_id=?', [ message_id ])

  if (type == 'image' || type == 'sticker') {
    deleteMessageFile(`${root}/public/messages/${message}`)
  }

  res.json('H')
})

// UNSEND ALL MESSAGES [REQ = CON_ID]
app.post('/unsend-all-mssgs', async (req, res) => {
  let
    { con_id } = req.body,
    { id } = req.session,
    messages = await db.query('SELECT message, type FROM messages WHERE con_id=? AND mssg_by=?', [ con_id, id ]),
    deleteMessageFile = promisify(unlink)

  for (let m of messages) {
    if (m.type != 'text') {
      await deleteMessageFile(`${root}/public/messages/${m.message}`)
    }
  }

  await db.query('DELETE FROM messages WHERE con_id=? AND mssg_by=?', [ con_id, id ])
  res.json('Hello, World!!')
})

// DELETE CONVERSATION [REQ = CON_ID]
app.post('/delete-conversation', async (req, res) => {
  await Mssg.deleteCon(req.body.con_id)
  res.json('Hello, World!!')
})

// GET CONVERSATION DETAILS [REQ = CON_ID]
app.post('/get-conversation-details', async (req, res) => {
  let
    { con_id, user } = req.body,
    [{ mssgsCount }] = await db.query(
      'SELECT COUNT(message_id) AS mssgsCount FROM messages WHERE con_id=?',
      [ con_id ]
    ),
    _media = await db.query(
      'SELECT message AS imgSrc, mssg_by FROM messages WHERE con_id=? AND type=? ORDER BY message_time DESC',
      [ con_id, 'image' ]
    ),
    media = [],
    [{ con_time }] = await db.query('SELECT con_time FROM conversations WHERE con_id=?', [ con_id ]),
    mutualFollowers = await User.mutualUsers(req.session.id, user)

  for (let m of _media) {
    let mssg_by_username = await User.getWhat('username', m.mssg_by)
    media.push({ ...m, mssg_by_username, })
  }

  res.json({
    mssgsCount,
    media,
    con_time,
    mutualFollowersCount: mutualFollowers.length
  })
})

// GET UNREAD MESSAGES
app.post('/get-unread-messages', async (req, res) => {
  let
    [{ unreads }] = await db.query(
      'SELECT COUNT(message_id) AS unreads FROM messages WHERE mssg_to=? AND status=?',
      [ req.session.id, 'unread' ]
    )
  res.json(unreads)
})

// READ MESSAGES OF A CONVERSATION [REQ = CON_ID]
app.post('/read-conversation', async (req, res) => {
  await db.query(
    'UPDATE messages SET status=? WHERE con_id=? AND mssg_to=?',
    [ 'read', req.body.con_id, req.session.id ]
  )
  res.json('Hello, World!!')
})

// GET ONLINE USERS
app.post('/get-online-users', async (req, res) => {
  let
    { id } = req.session,
    _onlineUsers = await db.query(
      'SELECT follow_system.follow_to AS user, users.username, users.firstname, users.surname FROM follow_system, users WHERE follow_system.follow_by=? AND follow_system.follow_to = users.id AND users.isOnline = "yes"',
      [ id ]
    ),
    onlineUsers = []

  for (let u of _onlineUsers) {
    let mutualUsers = await UserConfig.mutualUsers(id, u.user)
    onlineUsers.push({ ...u, mutualUsersCount: mutualUsers.length })
  }

  res.json(onlineUsers)
})

module.exports = app

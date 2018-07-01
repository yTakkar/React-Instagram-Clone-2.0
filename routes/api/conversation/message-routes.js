// ALL CONVERSATIONS-RELATED ROUTES ARE HANDLED BY THIS FILE

const app = require('express').Router(),
  db = require('../../../config/db'),
  root = process.cwd(),
  upload = require('multer')({
    dest: `${root}/dist/temp/`,
  }),
  { ProcessImage, DeleteAllOfFolder } = require('handy-image-processor'),
  { createReadStream, createWriteStream, unlink } = require('fs'),
  { promisify } = require('util')

// TEXT MESSAGE [REQ = MESSAGE, CON_ID, CON_WITH]
app.post('/text-message', async (req, res) => {
  try {
    let { message, con_id, con_with } = req.body,
      newMessage = {
        con_id,
        mssg_by: req.session.id,
        mssg_to: con_with,
        message,
        type: 'text',
        message_time: new Date().getTime(),
      }
    let { insertId } = await db.query('INSERT INTO messages SET ?', newMessage)
    res.json({
      success: true,
      message_id: insertId,
    })
  } catch (error) {
    db.catchError(error, res)
  }
})

// IMAGE MESSAGE [REQ = CON_ID, CON_WITH, MESSAGEFILE(FILE)]
app.post('/image-message', upload.single('messageFile'), async (req, res) => {
  try {
    let { con_id, con_with } = req.body,
      filename = `instagram_message_${new Date().getTime()}.jpg`,
      obj = {
        srcFile: req.file.path,
        destFile: `${root}/dist/messages/${filename}`,
      },
      message = {
        con_id,
        mssg_by: req.session.id,
        mssg_to: con_with,
        message: filename,
        type: 'image',
        message_time: new Date().getTime(),
      }

    await ProcessImage(obj)
    DeleteAllOfFolder(`${root}/dist/temp/`)

    let { insertId } = await db.query('INSERT INTO messages SET ?', message)

    res.json({
      success: true,
      mssg: 'Messaged!!',
      message_id: insertId,
      filename,
    })
  } catch (error) {
    db.catchError(error, res)
  }
})

// COMMENT STICKER [REQ = CON_ID, STICKER, CON_WITH]
app.post('/sticker-message', async (req, res) => {
  try {
    let { sticker, con_id, con_with } = req.body,
      filename = `instagram_message_${new Date().getTime()}.jpg`,
      message = {
        con_id,
        mssg_by: req.session.id,
        mssg_to: con_with,
        message: filename,
        type: 'sticker',
        message_time: new Date().getTime(),
      }

    await createReadStream(`${root}/dist/images/stickers/${sticker}`).pipe(
      createWriteStream(`${root}/dist/messages/${filename}`)
    )

    let { insertId } = await db.query('INSERT INTO messages SET ?', message)

    res.json({
      success: true,
      mssg: 'Messaged!!',
      message_id: insertId,
      filename,
    })
  } catch (error) {
    db.catchError(error, res)
  }
})

// EDIT MESSAGE [REQ = MESSAGE, MESSAGE_ID]
app.post('/edit-message', async (req, res) => {
  try {
    let { message, message_id } = req.body
    await db.query('UPDATE messages SET message=? WHERE message_id=?', [
      message,
      message_id,
    ])
    res.json({
      success: true,
      mssg: 'Message updated!!',
    })
  } catch (error) {
    db.catchError(error, res)
  }
})

// DELETE MESSAGE [REQ = MESSAGE_ID, TYPE, MESSAGE]
app.post('/delete-message', async (req, res) => {
  try {
    let { message_id, type, message } = req.body
    let deleteMessageFile = promisify(unlink)

    await db.query('DELETE FROM messages WHERE message_id=?', [message_id])

    if (type == 'image' || type == 'sticker') {
      deleteMessageFile(`${root}/dist/messages/${message}`)
    }

    res.json({
      success: true,
      mssg: 'Deleted!!',
    })
  } catch (error) {
    db.catchError(error, res)
  }
})

module.exports = app

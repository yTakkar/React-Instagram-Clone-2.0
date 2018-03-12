const
  db = require('./db'),
  { promisify } = require('util'),
  { unlink } = require('fs')

// GET LAST MESSAGE TIME
const getLastMssgTime = con_id => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT MAX(message_time) AS ti FROM messages WHERE con_id = ?',
      [ con_id ]
    )
      .then(s => resolve(s[0].ti))
      .catch(e => reject(e))
  })
}

// GET LAST MESSAGE
const getLastMssg = con_id => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT MAX(message_id) AS last FROM messages WHERE con_id = ?',
      [ con_id ]
    )
      .then(s => {
        let [{ last }] = s

        db.query('SELECT message, type, mssg_by FROM messages WHERE message_id=?', [ last ])
          .then(l => resolve(l[0]))
          .catch(e => reject(e))

      })
      .catch(e => reject(e))

  })
}

// DELETES CONVERSATION
const deleteCon = async con_id => {
  let
    messages = await db.query('SELECT message, type FROM messages WHERE con_id=?', [ con_id ]),
    deleteMessageFile = promisify(unlink)

  for (let m of messages) {
    if (m.type != 'text') {
      await deleteMessageFile(`${root}/public/messages/${m.message}`)
    }
  }

  await db.query('DELETE FROM messages WHERE con_id=?', [ con_id ])
  await db.query('DELETE FROM conversations WHERE con_id=?', [ con_id ])
}

module.exports = {
  getLastMssgTime,
  getLastMssg,
  deleteCon
}

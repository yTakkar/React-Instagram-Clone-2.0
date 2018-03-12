const db = require('./mysql')

// FUNCTION TO QUERY MYSQL AND RETURN IT AS A PROMISE
const query = (q, data) => {
  return new Promise((resolve, reject) => {
    db.query(q, data, (err, res) => {
      err ? reject(err) : resolve(res)
    })
  })
}

// COMMON VALIDATOR
const c_validator = (field, req) => {
  let i = field.charAt(0).toUpperCase() + field.substr(1)
  req.checkBody(field, `${i} is empty!!`).notEmpty()
  req.checkBody(field, `${i} must be greater than 4`).isLength({ min: 4 })
  req.checkBody(field, `${i} must be less than 32`).isLength({ max: 32 })
}

// FUNCTION TO GET ID FROM USERNAME
const getId = username => {
  return new Promise((resolve, reject) => {
    query('SELECT id FROM users WHERE username=? LIMIT 1', [username])
      .then(s => resolve(s[0].id))
      .catch(e => reject(e))
  })
}

// RETURNS [WHAT] OF ID
const getWhat = (what, id) => {
  return new Promise((resolve, reject) => {
    query(`SELECT ${what} FROM users WHERE id=? LIMIT 1`, [ id ])
      .then(s => resolve(s[0][what]))
      .catch(e => reject(e))
  })
}

// GET AND INSERT HASHTAGS
const toHashtag = async (str, user, post) => {
  let hashtags = str.match(/[^|\s]?#[\d\w]+/g)

  if (hashtags) {
    for (let h of hashtags) {
      let hash = h.slice(1)
      if (hash.substr(0, 1) !== '#') {
        let newHashtag = {
          hashtag: hash,
          post_id: post,
          user: user,
          hashtag_time: new Date().getTime()
        }
        await query('INSERT INTO hashtags SET ?', newHashtag)
      }
    }
  }

}

// MENTION USERS
const mentionUsers = async (str, session, post, when) => {
  let users = str.match(/[^|\s]?@[\d\w]+/g)

  if (users) {
    for (let h of users) {
      let hash = h.slice(1)
      if (hash.substr(0, 1) !== '@') {
        let [{ userCount }] = await query('SELECT COUNT(id) AS userCount FROM users WHERE username=?', [ hash ])

        if (userCount == 1) {
          let
            id = await getId(hash),
            notify = {
              notify_by: session,
              notify_to: id,
              post_id: post,
              type: when == 'post' ? 'mention_post' : 'mention_comment',
              notify_time: new Date().getTime(),
            }

          if (id != session) {
            await query('INSERT INTO notifications SET ?', notify)
          }
        }

      }
    }
  }

}

module.exports = {
  query,
  c_validator,
  getId,
  getWhat,
  toHashtag,
  mentionUsers,
}

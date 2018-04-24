// HANDY FUNCTIONS FOR MYSQL

const db = require('./mysql')

/**
 * Query MySQL as a promise
 * @param {String} q MySQL Query
 * @param {Object} data Data needed by the query
 * @returns {<Promise>} Promise
 */
const query = (q, data) => {
  return new Promise((resolve, reject) => {
    db.query(q, data, (err, res) =>
      err ? reject(err) : resolve(res)
    )
  })
}

/**
 * Returns [what] of user ID
 *
 * eq. getWhat('username', id) => id's username
 *
 * @param {String} what Eq. Username
 * @param {String} id ID to be used to return [what]
 */
const getWhat = async (what, id) => {
  let s = await query(`SELECT ${what} FROM users WHERE id=? LIMIT 1`, [id])
  return s[0][what]
}

/**
 * Common validators esp. in signup, edit-profile
 * @param {String} field
 * @param {Object} req
 */
const c_validator = (field, req) => {
  let i = field.charAt(0).toUpperCase() + field.substr(1)
  req.checkBody(field, `${i} is empty!!`).notEmpty()
  req.checkBody(field, `${i} must be greater than 4`).isLength({ min: 4 })
  req.checkBody(field, `${i} must be less than 32`).isLength({ max: 32 })
}

/**
 * Insert hashtags when post is created
 * @param {String} str Text which will be used to get hashtags
 * @param {Number} user UserID
 * @param {Number} post PostID
 */
const toHashtag = async (str, user, post) => {
  let hashtags = str.match(/[^|\s]?#[\d\w]+/g)

  if (hashtags) {
    for (let h of hashtags) {
      let hash = h.slice(1)
      if (hash.substr(0, 1) !== '#') {
        let newHashtag = {
          hashtag: h,
          post_id: post,
          user: user,
          hashtag_time: new Date().getTime()
        }
        await query('INSERT INTO hashtags SET ?', newHashtag)
      }
    }
  }

}

/**
 * Returns boolean based on value. Useful when querying
 * @param {Number} value
 */
const tf = value =>
  value == 1 ? true : false

module.exports = {
  getWhat,
  query,
  c_validator,
  toHashtag,
  tf,
}

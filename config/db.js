/**
 * @author Faiyaz Shaikh <www.shtakkar@gmail.com>
 * GitHub repo: https://github.com/yTakkar/React-Instagram-Clone-2.0
 */

// HANDY FUNCTIONS FOR MYSQL

const db = require('./Mysql')

/**
 * Query MySQL as a promise
 * @param {String} q MySQL Query
 * @param {Object} data Data needed by the query
 * @returns {<Promise>} Promise
 */
const query = (q, data) => {
  return new Promise((resolve, reject) => {
    db.query(q, data, (err, res) => (err ? reject(err) : resolve(res)))
  })
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
          hashtag_time: new Date().getTime(),
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
const tf = value => (value == 1 ? true : false)

/**
 * Function for outputting error created by try-catch block on express routes
 *
 * @param {Error} error Error object
 * @param {Object} res Response object
 */
const catchError = (error, res) => {
  console.log(error)
  res.json({ mssg: 'An error occured!!' })
}

module.exports = {
  query,
  c_validator,
  toHashtag,
  tf,
  catchError,
}

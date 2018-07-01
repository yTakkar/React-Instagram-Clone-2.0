// HANDY METHODS FOR USER ROUTES

const db = require('./db'),
  bcrypt = require('bcrypt-nodejs'),
  { deletePost } = require('./Post'),
  { deleteGroup } = require('./Group'),
  { deleteCon } = require('./Message'),
  root = process.cwd(),
  { promisify } = require('util'),
  { rmdir } = require('fs'),
  { DeleteAllOfFolder } = require('handy-image-processor'),
  { intersectionBy } = require('lodash'),
  catchify = require('catchify')

/**
 * Returns ID of a user
 * @param {String} username Username
 */

const getId = async username => {
  let s = await db.query('SELECT id FROM users WHERE username=? LIMIT 1', [
    username,
  ])
  return s ? s[0].id : null
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
  let s = await db.query(`SELECT ${what} FROM users WHERE id=? LIMIT 1`, [id])
  return s[0][what]
}

/**
 * creates a new user
 * @param {Object} User User details
 */
const create_user = async user => {
  let hash = bcrypt.hashSync(user.password)
  user.password = hash
  let [e, s] = await catchify(db.query('INSERT INTO users SET ?', user))
  e ? console.log(e) : null
  return s
}

/** changes password */
const change_password = async ({ password, id }) => {
  let hash = bcrypt.hashSync(password)
  let [e] = await catchify(
    db.query('UPDATE users SET password=? WHERE id=?', [hash, id])
  )
  return e ? false : true
}

/**
 * compares password
 * @param {String} password Password
 * @param {String} hash Hash to be compared with password
 * @returns {Boolean} Boolean
 */
const comparePassword = (password, hash) => {
  let comp = bcrypt.compareSync(password, hash)
  return comp
}

/**
 * Returns whether session is following user
 * @param {Number} session Session ID
 * @param {Number} user User
 */
const isFollowing = async (session, user) => {
  let is = await db.query(
    'SELECT COUNT(follow_id) AS is_following FROM follow_system WHERE follow_by=? AND follow_to=? LIMIT 1',
    [session, user]
  )
  return db.tf(is[0].is_following)
}

/**
 * Returns whether User is fav_by's favorite
 * @param {Number} fav_by Favorite By
 * @param {Number} user User ID
 */
const favouriteOrNot = async (fav_by, user) => {
  let s = await db.query(
    'SELECT COUNT(fav_id) AS fav_count FROM favourites WHERE fav_by=? AND user=?',
    [fav_by, user]
  )
  return db.tf(s[0].fav_count)
}

/**
 * Returns whether User is blocked by user
 * @param {Number} block_by Block By
 * @param {Number} user User ID
 */
const isBlocked = async (block_by, user) => {
  let s = await db.query(
    'SELECT COUNT(block_id) AS block_count FROM blocks WHERE block_by=? AND user=?',
    [block_by, user]
  )
  return db.tf(s[0].block_count)
}

/**
 * Deactivates user
 * @param {user} user User to deactivate
 * @param {Object} req Express' Req object
 * @param {Object} res Express' Res Object
 */
const deactivate = async (user, req, res) => {
  let posts = await db.query('SELECT post_id FROM posts WHERE user=?', [user]),
    groups = await db.query('SELECT group_id FROM groups WHERE admin=?', [
      user,
    ]),
    cons = await db.query(
      'SELECT con_id FROM conversations WHERE user_one=? OR user_two=?',
      [user, user]
    ),
    dltDir = promisify(rmdir),
    QLusers = JSON.parse(req.cookies.users),
    filtered = QLusers.filter(u => u.id != user)

  // DELETE ALL POSTS
  posts.map(async p => {
    await deletePost({
      post: p.post_id,
      user,
      when: 'user',
    })
  })

  // DELETE ALL GROUPS
  groups.map(async g => {
    await deleteGroup(g.group_id)
  })
  await db.query('DELETE FROM group_members WHERE member=? OR added_by=?', [
    user,
    user,
  ])

  // DELETE ALL CONVERSATIONS
  cons.map(async c => {
    await deleteCon(c.con_id)
  })

  await db.query('DELETE FROM tags WHERE user=?', [user])
  await db.query('DELETE FROM favourites WHERE fav_by=? OR user=?', [
    user,
    user,
  ])
  await db.query('DELETE FROM follow_system WHERE follow_by=? OR follow_to=?', [
    user,
    user,
  ])
  await db.query(
    'DELETE FROM notifications WHERE notify_by=? OR notify_to=? OR user=?',
    [user, user, user]
  )
  await db.query('DELETE FROM profile_views WHERE view_by=? OR view_to=?', [
    user,
    user,
  ])
  await db.query(
    'DELETE FROM recommendations WHERE recommend_by=? OR recommend_to=? OR recommend_of=?',
    [user, user, user]
  )
  await db.query('DELETE FROM hashtags WHERE user=?', [user])

  DeleteAllOfFolder(`${root}/dist/users/${user}/`)
  await dltDir(`${root}/dist/users/${user}`)

  await db.query('DELETE FROM users WHERE id=?', [user])

  res.cookie('users', `${JSON.stringify(filtered)}`)
  req.session.reset()
}

/**
 * Returns mutual users
 * Returns mutual users of session & user
 * @param {Number} session Session ID
 * @param {Number} user User ID
 */
const mutualUsers = async (session, user) => {
  let myFollowings = await db.query(
      'SELECT follow_system.follow_id, follow_system.follow_to AS user, follow_system.follow_to_username AS username, users.firstname, users.surname FROM follow_system, users WHERE follow_system.follow_by=? AND follow_system.follow_to = users.id',
      [session]
    ),
    userFollowers = await db.query(
      'SELECT follow_system.follow_id, follow_system.follow_by AS user, follow_system.follow_by_username AS username, users.firstname, users.surname FROM follow_system, users WHERE follow_system.follow_to=? AND follow_system.follow_by = users.id',
      [user]
    ),
    mutuals = intersectionBy(myFollowings, userFollowers, 'user')

  return mutuals
}

/**
 * Mention users
 * @param {String} str Text which will be used to get mentioned users
 * @param {Number} session sessionID
 * @param {Number} post PostID
 * @param {String} when For fn to have knowledge when users were mentioned
 */
const mentionUsers = async (str, session, post, when) => {
  let users = str.match(/[^|\s]?@[\d\w]+/g)

  if (users) {
    for (let h of users) {
      let hash = h.slice(1)
      if (hash.substr(0, 1) !== '@') {
        let [{ userCount }] = await db.query(
          'SELECT COUNT(id) AS userCount FROM users WHERE username=?',
          [hash]
        )
        let id = await getId(hash)

        if (userCount == 1 && id != session) {
          await db.query('INSERT INTO notifications SET ?', {
            notify_by: session,
            notify_to: id,
            post_id: post,
            type: when == 'post' ? 'mention_post' : 'mention_comment',
            notify_time: new Date().getTime(),
          })
        }
      }
    }
  }
}

module.exports = {
  getId,
  getWhat,
  create_user,
  change_password,
  comparePassword,
  isFollowing,
  favouriteOrNot,
  isBlocked,
  deactivate,
  mutualUsers,
  mentionUsers,
}

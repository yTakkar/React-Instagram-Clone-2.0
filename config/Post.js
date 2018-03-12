// HANDY METHODS FOR POST ROUTES

const
  db = require('./db'),
  { unlink } = require('fs'),
  { promisify } = require('util'),
  root = process.cwd()

/**
 * Returns whther user liked the post
 * @param {Number} user User ID
 * @param {Number} post Post ID
 * @returns {Boolean} Boolean
 */
const likedOrNot = (user, post) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT COUNT(like_id) AS l FROM likes WHERE like_by=? AND post_id=?', [ user, post ])
      .then(s => resolve(s[0].l == 1 ? true : false) )
      .catch(e => reject(e))
  })
}

/**
 * Returns whether user bookmarked the post
 * @param {Number} user User ID
 * @param {Number} post Post ID
 * @returns {Boolean} Boolean
 */
const bookmarkedOrNot = (user, post) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT COUNT(bkmrk_id) AS b FROM bookmarks WHERE bkmrk_by=? AND post_id=?', [ user, post ])
      .then(s => resolve(s[0].b == 1 ? true : false) )
      .catch(e => reject(e))
  })
}

/**
 * Returns whether session is the owner of post
 * @param {Number} session Session ID
 * @param {Number} post Post ID
 * @returns {Boolean} Boolean
 */
const isPostMine = (session, post) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT user FROM posts WHERE post_id=?', [ post ])
      .then(s => resolve(s[0].user == session ? true : false))
      .catch(e => reject(e))
  })
}

/**
 * Returns whether session shares post to user
 * @param {Number} post Post ID
 * @param {Number} session Session ID [share_by]
 * @param {User} user User ID [share_to]
 * @returns {Boolean} Boolean
 */
const didIShare = (post, session, user) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT COUNT(share_id) AS post_share FROM shares WHERE share_by=? AND share_to=? AND post_id=?',
      [ session, user, post ]
    )
      .then(s => resolve(s[0].post_share == 1 ? true : false))
      .catch(e => reject(e))
  })
}

/**
 * Returns tags count, likes count, ...
 * @param {Number} post_id Post ID
 * @param {Number} group_id Group ID
 * @returns {Object} Tags Count, Likes Count, ...
 */
const getCounts = async (post_id, group_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let
        [{ tags_count }] = await db.query('SELECT COUNT(post_tag_id) AS tags_count FROM post_tags WHERE post_id=?', [post_id]),
        [{ likes_count }] = await db.query('SELECT COUNT(like_id) AS likes_count FROM likes WHERE post_id=?', [ post_id ]),
        [{ shares_count }] = await db.query('SELECT COUNT(share_id) AS shares_count FROM shares WHERE post_id=?', [ post_id ]),
        [{ comments_count }] = await db.query('SELECT COUNT(comment_id) AS comments_count FROM comments WHERE post_id=?', [ post_id ]),
        gn = await db.query('SELECT name FROM groups WHERE group_id=?', [group_id])

      resolve({
        tags_count,
        likes_count,
        shares_count,
        comments_count,
        group_name: group_id != 0 && group_id != null ? gn[0].name : ''
      })

    } catch (error) {
      reject(error)
    }

  })
}

/**
 * Deletes a post
 */
const deletePost = async ({post, when}) => {
  await db.query('DELETE FROM likes WHERE post_id=?', [ post ])
  await db.query('DELETE FROM post_tags WHERE post_id=?', [ post ])
  await db.query('DELETE FROM shares WHERE post_id=?', [ post ])
  await db.query('DELETE FROM bookmarks WHERE post_id=?', [ post ])
  await db.query('DELETE FROM notifications WHERE post_id=?', [ post ])
  await db.query('DELETE FROM hashtags WHERE post_id=?', [ post ])

  let
    [{ imgSrc }] = await db.query('SELECT imgSrc FROM posts WHERE post_id=?', [ post ]),
    comments = await db.query('SELECT commentSrc, type FROM comments WHERE post_id=?', [ post ]),
    deleteFile = promisify(unlink)

  await deleteFile(`${root}/public/posts/${imgSrc}`)

  comments.map(async c => {
    if (c.type != 'text') {
      await deleteFile(`${root}/public/comments/${c.commentSrc}`)
    }
  })
  await db.query('DELETE FROM comments WHERE post_id=?', [ post ])

  if (when == 'user') {
    await db.query('DELETE FROM posts WHERE post_id=?', [ post ])
  } else {
    await db.query('DELETE FROM posts WHERE post_id=?', [ post ])
  }

}

module.exports = {
  likedOrNot,
  bookmarkedOrNot,
  isPostMine,
  didIShare,
  getCounts,
  deletePost
}

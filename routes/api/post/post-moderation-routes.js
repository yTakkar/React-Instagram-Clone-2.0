// POST MODERATION ROUTES - Admin approval/rejection of posts

const app = require('express').Router(),
  db = require('../../../config/db'),
  Post = require('../../../config/Post'),
  User = require('../../../config/User'),
  mw = require('../../../config/Middlewares')

// NSFW keyword filter - basic content check
const NSFW_KEYWORDS = [
  'nsfw', 'xxx', 'porn', 'nude', 'naked', 'explicit',
  'gore', 'violence', 'abuse', 'drug', 'illegal',
]

const checkNSFW = (text) => {
  if (!text) return { isNSFW: false, flaggedWords: [] }
  const lower = text.toLowerCase()
  const flaggedWords = NSFW_KEYWORDS.filter(word => lower.includes(word))
  return {
    isNSFW: flaggedWords.length > 0,
    flaggedWords,
  }
}

// GET PENDING POSTS (Admin only)
app.post('/get-pending-posts', mw.AdminOnly, async (req, res) => {
  try {
    let posts = await db.query(
      'SELECT posts.post_id, posts.user, users.username, users.firstname, users.surname, posts.description, posts.imgSrc, posts.filter, posts.location, posts.type, posts.post_time, posts.status, posts.isNSFW, posts.nsfwTaggedByAuthor FROM posts, users WHERE posts.status=? AND posts.user = users.id ORDER BY posts.post_time DESC',
      ['pending']
    )

    let result = []
    for (let p of posts) {
      let { tags_count, likes_count, shares_count, comments_count } = await Post.getCounts(p.post_id)
      const nsfwCheck = checkNSFW(p.description)
      result.push({
        ...p,
        tags_count,
        likes_count,
        shares_count,
        comments_count,
        nsfw_flagged: nsfwCheck.isNSFW,
        nsfw_words: nsfwCheck.flaggedWords,
      })
    }

    res.json(result)
  } catch (error) {
    db.catchError(error, res)
  }
})

// APPROVE POST (Admin only) [REQ = POST_ID]
app.post('/approve-post', mw.AdminOnly, async (req, res) => {
  try {
    let { post_id } = req.body

    await db.query('UPDATE posts SET status=? WHERE post_id=?', ['approved', post_id])

    // Get post owner to notify
    let [post] = await db.query('SELECT user FROM posts WHERE post_id=?', [post_id])
    if (post) {
      await db.query('INSERT INTO notifications SET ?', {
        notify_by: req.session.id,
        notify_to: post.user,
        post_id: post_id,
        group_id: 0,
        type: 'post_approved',
        user: 0,
        notify_time: new Date().getTime(),
      })
    }

    res.json({
      success: true,
      mssg: 'Post approved!!',
    })
  } catch (error) {
    db.catchError(error, res)
  }
})

// REJECT POST (Admin only) [REQ = POST_ID, REASON]
app.post('/reject-post', mw.AdminOnly, async (req, res) => {
  try {
    let { post_id, reason } = req.body

    await db.query('UPDATE posts SET status=?, rejection_reason=? WHERE post_id=?', [
      'rejected',
      reason || 'Content violates community guidelines',
      post_id,
    ])

    // Notify post owner
    let [post] = await db.query('SELECT user FROM posts WHERE post_id=?', [post_id])
    if (post) {
      await db.query('INSERT INTO notifications SET ?', {
        notify_by: req.session.id,
        notify_to: post.user,
        post_id: post_id,
        group_id: 0,
        type: 'post_rejected',
        user: 0,
        notify_time: new Date().getTime(),
      })
    }

    res.json({
      success: true,
      mssg: 'Post rejected!!',
    })
  } catch (error) {
    db.catchError(error, res)
  }
})

// GET ALL POSTS FOR ADMIN (with all statuses)
app.post('/get-all-posts-admin', mw.AdminOnly, async (req, res) => {
  try {
    let { status, page } = req.body
    let limit = 20
    let offset = ((page || 1) - 1) * limit

    let whereClause = status ? 'AND posts.status=?' : ''
    let params = status
      ? [status, limit, offset]
      : [limit, offset]

    let posts = await db.query(
      `SELECT posts.post_id, posts.user, users.username, users.firstname, users.surname, posts.description, posts.imgSrc, posts.filter, posts.location, posts.type, posts.post_time, posts.status, posts.rejection_reason, posts.isNSFW, posts.nsfwTaggedByAuthor FROM posts, users WHERE posts.user = users.id ${whereClause} ORDER BY posts.post_time DESC LIMIT ? OFFSET ?`,
      params
    )

    let result = []
    for (let p of posts) {
      let { tags_count, likes_count, shares_count, comments_count } = await Post.getCounts(p.post_id)
      result.push({
        ...p,
        tags_count,
        likes_count,
        shares_count,
        comments_count,
      })
    }

    res.json(result)
  } catch (error) {
    db.catchError(error, res)
  }
})

// GET REJECTED POSTS FOR USER (so they can see why their posts were rejected)
app.post('/get-my-rejected-posts', async (req, res) => {
  try {
    let { id } = req.session
    let posts = await db.query(
      'SELECT post_id, description, imgSrc, filter, post_time, status, rejection_reason FROM posts WHERE user=? AND status=? ORDER BY post_time DESC',
      [id, 'rejected']
    )
    res.json(posts)
  } catch (error) {
    db.catchError(error, res)
  }
})

// TOGGLE NSFW STATUS (Admin only) [REQ = POST_ID, IS_NSFW]
app.post('/toggle-nsfw', mw.AdminOnly, async (req, res) => {
  try {
    let { post_id, isNSFW } = req.body
    await db.query('UPDATE posts SET isNSFW=? WHERE post_id=?', [isNSFW ? 1 : 0, post_id])
    res.json({ success: true, mssg: 'NSFW status updated!' })
  } catch (error) {
    db.catchError(error, res)
  }
})

// CHECK NSFW CONTENT [REQ = TEXT]
app.post('/check-nsfw', async (req, res) => {
  let { text } = req.body
  let result = checkNSFW(text)
  res.json(result)
})

module.exports = app

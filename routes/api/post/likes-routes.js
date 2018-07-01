// OTHER POST INTERACTIONS SUCH AS LIKING, TAGGING & BOOKMARKING IS HANDLED BY THIS FILE

const app = require('express').Router(),
  db = require('../../../config/db'),
  Post = require('../../../config/Post'),
  User = require('../../../config/User')

// POST LIKED OR NOT [REQ = POST]
app.post('/liked-or-not', async (req, res) => {
  let liked = await Post.likedOrNot(req.session.id, req.body.post)
  res.json(liked)
})

// LIKE POST [REQ = POST]
app.post('/like-post', async (req, res) => {
  try {
    let { post } = req.body,
      { id } = req.session,
      liked = await Post.likedOrNot(id, post),
      insert = {
        post_id: post,
        like_by: id,
        like_time: new Date().getTime(),
      }

    if (!liked) {
      await db.query('INSERT INTO likes SET ?', insert)
    }
    res.json({ success: true })
  } catch (error) {
    db.catchError(error, res)
  }
})

// UNLIKE POST [REQ = POST]
app.post('/unlike-post', async (req, res) => {
  try {
    await db.query('DELETE FROM likes WHERE post_id=? AND like_by=?', [
      req.body.post_id,
      req.session.id,
    ])
    res.json({ success: true })
  } catch (error) {
    db.catchError(error, res)
  }
})

// REMOVE LIKE [REQ = LIKE_ID]
app.post('/remove-like', async (req, res) => {
  let { like_id } = req.body
  await db.query('DELETE FROM likes WHERE like_id=?', [like_id])
  res.json(like_id)
})

// BOOKMARKED OR NOT [REQ = POST]
app.post('/bookmarked-or-not', async (req, res) => {
  let bookmarked = await Post.bookmarkedOrNot(req.session.id, req.body.post)
  res.json(bookmarked)
})

// BOOKMARK POST [REQ = POST]
app.post('/bookmark-post', async (req, res) => {
  try {
    let { post_id } = req.body,
      { id } = req.session,
      bookmarked = await Post.bookmarkedOrNot(id, post_id),
      insert = {
        bkmrk_by: id,
        post_id: post_id,
        bkmrk_time: new Date().getTime(),
      }

    if (!bookmarked) {
      await db.query('INSERT INTO bookmarks SET ?', insert)
    }

    res.json({
      success: true,
      mssg: 'Post bookmarked!!',
    })
  } catch (error) {
    db.catchError(error, res)
  }
})

// UNBOOKMARK POST [REQ = POST, USER]
app.post('/unbookmark-post', async (req, res) => {
  try {
    let { post, user } = req.body
    await db.query('DELETE FROM bookmarks WHERE post_id=? AND bkmrk_by=?', [
      post,
      user,
    ])
    res.json({ success: true })
  } catch (error) {
    db.catchError(error, res)
  }
})

// GET POST LIKES [REQ = POST]
app.post('/get-post-likes', async (req, res) => {
  let { post } = req.body,
    { id } = req.session,
    likes = await db.query(
      'SELECT likes.like_id, likes.like_by, users.username, users.firstname, users.surname, likes.post_id, likes.like_time FROM likes, users WHERE likes.post_id = ? AND likes.like_by = users.id ORDER BY likes.like_time',
      [post]
    ),
    array = []

  for (let l of likes) {
    array.unshift({
      ...l,
      isFollowing: await User.isFollowing(id, l.like_by),
    })
  }

  res.json({
    likes: array,
    isPostMine: await Post.isPostMine(id, post),
  })
})

module.exports = app

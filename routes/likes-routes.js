// OTHER POST INTERACTIONS SUCH AS LIKING, TAGGING & BOOKMARKING IS HANDLED BY THIS FILE

const
  app = require('express').Router(),
  db = require('../config/db'),
  Post = require('../config/Post'),
  User = require('../config/User')

// DELETE POST [REQ = POST]
app.post('/delete-post', async (req, res) => {
  await Post.deletePost({
    post: req.body.post,
    when: 'user'
  })
  res.json('Hello, World!!')
})

// POST LIKED OR NOT [REQ = POST]
app.post('/liked-or-not', async (req, res) => {
  let liked = await Post.likedOrNot(req.session.id, req.body.post)
  res.json(liked)
})

// LIKE POST [REQ = POST]
app.post('/like-post', async (req, res) => {
  let
    { post } = req.body,
    { id } = req.session,
    liked = await Post.likedOrNot(id, post),
    insert = {
      post_id: post,
      like_by: id,
      like_time: new Date().getTime()
    }

  if(!liked) {
    await db.query('INSERT INTO likes SET ?', insert)
  }

  res.json('Hello, World!!')
})

// UNLIKE POST [REQ = POST]
app.post('/unlike-post', async (req, res) => {
  await db.query('DELETE FROM likes WHERE post_id=? AND like_by=?', [ req.body.post, req.session.id ])
  res.json('Hello, World!!')
})

// REMOVE LIKE [REQ = LIKE_ID]
app.post('/remove-like', async (req, res) => {
  await db.query('DELETE FROM likes WHERE like_id=?', [ req.body.like_id ])
  res.json('Hello, World!!')
})

// BOOKMARKED OR NOT [REQ = POST]
app.post('/bookmarked-or-not', async (req, res) => {
  let bookmarked = await Post.bookmarkedOrNot(req.session.id, req.body.post)
  res.json(bookmarked)
})

// BOOKMARK POST [REQ = POST]
app.post('/bookmark-post', async (req, res) => {
  let
    { post } = req.body,
    { id } = req.session,
    bookmarked = await Post.bookmarkedOrNot(id, post),
    insert = {
      bkmrk_by: id,
      post_id: post,
      bkmrk_time: new Date().getTime()
    }

  if(!bookmarked) {
    await db.query('INSERT INTO bookmarks SET ?', insert)
  }

  res.json('Hello, World!!')
})

// UNBOOKMARK POST [REQ = POST, USER]
app.post('/unbookmark-post', async (req, res) => {
  let { post, user } = req.body
  await db.query('DELETE FROM bookmarks WHERE post_id=? AND bkmrk_by=?', [ post, user ])
  res.json('Hello, World!!')
})

// GET POST LIKES [REQ = POST]
app.post('/get-post-likes', async (req, res) => {
  let
    { post } = req.body,
    { id } = req.session,
    likes = await db.query(
      'SELECT likes.like_id, likes.like_by, users.username, users.firstname, users.surname, likes.post_id, likes.like_time FROM likes, users WHERE likes.post_id = ? AND likes.like_by = users.id ORDER BY likes.like_time',
      [ post ]
    ),
    array = []

  for (let l of likes) {
    array.unshift({
      ...l,
      isFollowing: await User.isFollowing(id, l.like_by)
    })
  }

  res.json({
    likes: array,
    isPostMine: await Post.isPostMine(id, post)
  })
})

module.exports = app

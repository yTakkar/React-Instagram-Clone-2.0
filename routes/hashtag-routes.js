const
  app = require('express').Router(),
  db = require('../config/db'),
  Post = require('../config/Post')

// GET USERS HASHTAGS
app.post('/get-users-hashtags', async (req, res) => {
  let
    { username } = req.body,
    id = await db.getId(username),
    hashtags = await db.query(
      'SELECT DISTINCT hashtag FROM hashtags WHERE user=? ORDER BY hashtag_time LIMIT 20',
      [ id ]
    )
  res.json(hashtags)
})

// GET GROUP HASHTAGS
app.post('/get-group-hashtags', async (req, res) => {
  let
    group_id = 11,
    groupPosts = await db.query(
      'SELECT post_id FROM posts WHERE group_id=? ORDER BY post_time DESC LIMIT 20',
      [ group_id ]
    ),
    hashtags = []

  for (let post of groupPosts) {
    let hash = await db.query(
      'SELECT DISTINCT hashtag FROM hashtags WHERE post_id=? ORDER BY hashtag_time DESC', [ post.post_id ]
    )
    hashtags = [ ...hash, ...hashtags ]
  }

  res.json(hashtags)
})

// GET POPULAR HASHTAGS
app.post('/get-popular-hashtags', async (req, res) => {
  let hashtags = await db.query(
    'SELECT hashtag, COUNT(hashtag) as c FROM hashtags GROUP BY hashtag ORDER BY c DESC LIMIT 10'
  )
  res.json(hashtags)
})

// GET HASHTAG POSTS
app.post('/get-hashtag-posts', async (req, res) => {
  let
    { hashtag } = req.body,
    _posts = await db.query(
      'SELECT posts.post_id, posts.user, users.username, users.firstname, users.surname, posts.description, posts.imgSrc, posts.filter, posts.location, posts.type, posts.group_id, posts.post_time FROM posts, users, hashtags WHERE hashtags.hashtag = ? AND posts.user = users.id AND hashtags.post_id = posts.post_id ORDER BY hashtags.hashtag_time DESC',
      [ hashtag ]
    ),
    posts = []

  for (let p of _posts) {
    let {
      tags_count, likes_count, shares_count, comments_count, group_name
    } = await Post.getCounts(p.post_id, p.group_id)

    posts.push({
      ...p,
      tags_count,
      likes_count,
      shares_count,
      comments_count,
      group_name
    })
  }

  res.json(posts)
})

module.exports = app

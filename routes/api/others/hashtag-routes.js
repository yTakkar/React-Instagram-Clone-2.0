// ALL HASHTAG-RELATED ROUTES ARE HANDLED BY THIS FILE

const app = require('express').Router(),
  db = require('../../../config/db'),
  User = require('../../../config/User'),
  Post = require('../../../config/Post'),
  Group = require('../../../config/Group')

// GET USERS HASHTAGS [REQ = USERNAME]
app.post('/get-users-hashtags', async (req, res) => {
  let id = await User.getId(req.body.username),
    hashtags = await db.query(
      'SELECT DISTINCT hashtag FROM hashtags WHERE user=? ORDER BY hashtag_time LIMIT 20',
      [id]
    )
  res.json(hashtags)
})

// GET GROUP HASHTAGS [REQ = GROUP_ID]
app.post('/get-group-hashtags', async (req, res) => {
  let groupPosts = await db.query(
      'SELECT post_id FROM posts WHERE group_id=? ORDER BY post_time DESC LIMIT 20',
      [req.body.group_id]
    ),
    hashtags = []

  for (let post of groupPosts) {
    let hash = await db.query(
      'SELECT DISTINCT hashtag FROM hashtags WHERE post_id=? ORDER BY hashtag_time DESC',
      [post.post_id]
    )
    hashtags = [...hash, ...hashtags]
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

// GET HASHTAG POSTS [REQ = HASHTAG]
app.post('/get-hashtag-posts', async (req, res) => {
  let _posts = await db.query(
      'SELECT posts.post_id, posts.user, users.username, users.firstname, users.surname, posts.description, posts.imgSrc, posts.filter, posts.location, posts.type, posts.group_id, posts.post_time FROM posts, users, hashtags WHERE hashtags.hashtag = ? AND posts.user = users.id AND hashtags.post_id = posts.post_id ORDER BY hashtags.hashtag_time DESC',
      [`#${req.body.hashtag}`]
    ),
    posts = []

  for (let p of _posts) {
    let {
      tags_count,
      likes_count,
      shares_count,
      comments_count,
    } = await Post.getCounts(p.post_id)
    let group_name = await Group.getWhatOfGrp('name', p.group_id)

    posts.push({
      ...p,
      tags_count,
      likes_count,
      shares_count,
      comments_count,
      group_name,
    })
  }

  res.json(posts)
})

module.exports = app

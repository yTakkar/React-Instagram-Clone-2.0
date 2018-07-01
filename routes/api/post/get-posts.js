const app = require('express').Router(),
  db = require('../../../config/db'),
  Group = require('../../../config/Group'),
  Post = require('../../../config/Post'),
  User = require('../../../config/User')

// GET USER POSTS [REQ = USERNAME]
app.post('/get-user-posts', async (req, res) => {
  let id = await User.getId(req.body.username),
    _posts = await db.query(
      'SELECT posts.post_id, posts.user, users.username, users.firstname, users.surname, posts.description, posts.imgSrc, posts.filter, posts.location, posts.type, posts.post_time FROM posts, users WHERE posts.user=? AND posts.user = users.id AND posts.type=? ORDER BY posts.post_time DESC',
      [id, 'user']
    ),
    posts = []

  for (let p of _posts) {
    let {
      tags_count,
      likes_count,
      shares_count,
      comments_count,
    } = await Post.getCounts(p.post_id)

    posts.push({
      ...p,
      tags_count,
      likes_count,
      shares_count,
      comments_count,
    })
  }

  res.json(posts)
})

// GET BOOKMARKED POSTS [REQ = USER]
app.post('/get-bookmarked-posts', async (req, res) => {
  let _posts = await db.query(
      'SELECT posts.post_id, posts.user, users.username, users.firstname, users.surname, posts.description, posts.imgSrc, posts.filter, posts.location, posts.type, posts.group_id, posts.post_time FROM posts, users, bookmarks WHERE bookmarks.bkmrk_by=? AND posts.user = users.id AND bookmarks.post_id = posts.post_id ORDER BY bookmarks.bkmrk_time DESC',
      [req.body.user]
    ),
    posts = []

  for (let p of _posts) {
    let {
        tags_count,
        likes_count,
        shares_count,
        comments_count,
      } = await Post.getCounts(p.post_id),
      group_name = await Group.getWhatOfGrp('name', p.group_id)

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

// GET TAGGED POSTS [REQ = USER]
app.post('/get-tagged-posts', async (req, res) => {
  let _posts = await db.query(
      'SELECT posts.post_id, posts.user, users.username, users.firstname, users.surname, posts.description, posts.imgSrc, posts.filter, posts.location, posts.type, posts.group_id, posts.post_time FROM post_tags, posts, users WHERE post_tags.user = ? AND post_tags.post_id = posts.post_id AND posts.user = users.id ORDER BY posts.post_time DESC',
      [req.body.user]
    ),
    posts = []

  for (let p of _posts) {
    let {
        tags_count,
        likes_count,
        shares_count,
        comments_count,
      } = await Post.getCounts(p.post_id),
      group_name = await Group.getWhatOfGrp('name', p.group_id)

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

// GET SHARED POSTS [REQ = USER]
app.post('/get-shared-posts', async (req, res) => {
  let _posts = await db.query(
      'SELECT posts.post_id, shares.share_id, posts.user, users.username, users.firstname, users.surname, shares.share_by, posts.description, posts.imgSrc, posts.filter, posts.location, posts.type, posts.group_id, posts.post_time, shares.share_time FROM shares, posts, users WHERE shares.share_to = ? AND shares.post_id = posts.post_id AND posts.user = users.id ORDER BY shares.share_time DESC',
      [req.body.user]
    ),
    posts = []

  for (let p of _posts) {
    let share_by_username = await User.getWhat('username', p.share_by),
      {
        tags_count,
        likes_count,
        shares_count,
        comments_count,
      } = await Post.getCounts(p.post_id),
      group_name = await Group.getWhatOfGrp('name', p.group_id)

    posts.push({
      ...p,
      share_by_username,
      tags_count,
      likes_count,
      shares_count,
      comments_count,
      group_name,
    })
  }

  res.json(posts)
})

// GET PHOTOS [REQ = USER]
app.post('/get-photos', async (req, res) => {
  let _photos = await db.query(
    'SELECT posts.post_id, posts.user, users.username, users.firstname, users.surname, posts.imgSrc AS imgsrc, posts.filter, posts.post_time FROM posts, users WHERE posts.user = ? AND posts.user = users.id AND posts.type = ? ORDER BY posts.post_time DESC',
    [req.body.user, 'user']
  )

  res.json(_photos)
})

// GET FEED
app.post('/get-feed', async (req, res) => {
  let _posts = await db.query(
      'SELECT posts.post_id, posts.user, users.username, users.firstname, users.surname, posts.description, posts.imgSrc, posts.filter, posts.location, posts.type, posts.group_id, posts.post_time FROM posts, users, follow_system WHERE follow_system.follow_by = ? AND follow_system.follow_to = posts.user AND posts.user = users.id ORDER BY posts.post_time DESC',
      [req.session.id]
    ),
    posts = []

  for (let p of _posts) {
    let {
        tags_count,
        likes_count,
        shares_count,
        comments_count,
      } = await Post.getCounts(p.post_id),
      group_name = await Group.getWhatOfGrp('name', p.group_id)

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

// GET POST BY [REQ = POST_ID]
app.post('/get-post', async (req, res) => {
  let { post_id } = req.body,
    _post = await db.query(
      'SELECT posts.post_id, posts.user, users.username, users.firstname, users.surname, posts.description, posts.imgSrc, posts.filter, posts.location, posts.type, posts.group_id, posts.post_time FROM posts, users WHERE posts.post_id = ? AND posts.user = users.id',
      [post_id]
    ),
    {
      tags_count,
      likes_count,
      shares_count,
      comments_count,
    } = await Post.getCounts(post_id),
    comments = await db.query(
      'SELECT comments.comment_id, comments.type, comments.text, comments.commentSrc, comments.comment_by, users.username AS comment_by_username, comments.post_id, comments.comment_time FROM comments, users WHERE comments.post_id = ? AND comments.comment_by = users.id ORDER BY comments.comment_time DESC',
      [post_id]
    ),
    group_name = await Group.getWhatOfGrp(
      'name',
      _post[0] ? _post[0].group_id : 0
    ),
    post = {
      ..._post[0],
      tags_count,
      likes_count,
      shares_count,
      comments_count,
      group_name,
      comments,
    }

  res.json(post)
})

module.exports = app

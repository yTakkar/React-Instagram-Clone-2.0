// ALL POST-RELATED ROUTES ARE HANDLED BY THIS FILE

const
  app = require('express').Router(),
  db = require('../config/db'),
  Group = require('../config/Group'),
  Post = require('../config/Post'),
  User = require('../config/User'),
  root = process.cwd(),
  upload = require('multer')({
    dest: `${root}/public/temp/`
  }),
  { ProcessImage, DeleteAllOfFolder } = require('handy-image-processor')

// POST [REQ = DESC, FILTER, LOCATION, TYPE, GROUP, IMAGE(FILE) ]
app.post('/post-it', upload.single('image'), async (req, res) => {
  let
    { id } = req.session,
    { desc, filter, location, type, group } = req.body,
    filename = `instagram_${new Date().getTime()}.jpg`,
    obj = {
      srcFile: req.file.path,
      destFile: `${root}/public/posts/${filename}`
    },
    insert = {
      user: id,
      description: desc,
      imgSrc: filename,
      filter,
      location,
      type,
      group_id: group,
      post_time: new Date().getTime()
    }

  await ProcessImage(obj)
  DeleteAllOfFolder(`${root}/public/temp/`)

  let
    { insertId } = await db.query('INSERT INTO posts SET ?', insert),
    firstname = await User.getWhat('firstname', id),
    surname = await User.getWhat('surname', id)

  await db.toHashtag(desc, id, insertId)
  await User.mentionUsers(desc, id, insertId, 'post')

  res.json({
    post_id: insertId,
    firstname,
    surname,
    filename,
  })
})

// TAGS USERS FOR A POST [REQ = TAGS, POST_ID]
app.post('/tag-post', (req, res) => {
  let { tags, post_id } = req.body
  tags.forEach(async t => {
    let tagInsert = {
      post_id: post_id,
      user: t.user
    }
    await db.query('INSERT INTO post_tags SET ?', tagInsert)
  })
  res.json(null)
})

// GET USER POSTS [REQ = USERNAME]
app.post('/get-user-posts', async (req, res) => {
  let
    id = await User.getId(req.body.username),
    _posts = await db.query(
      'SELECT posts.post_id, posts.user, users.username, users.firstname, users.surname, posts.description, posts.imgSrc, posts.filter, posts.location, posts.type, posts.post_time FROM posts, users WHERE posts.user=? AND posts.user = users.id AND posts.type=? ORDER BY posts.post_time DESC',
      [ id, 'user' ]
    ),
    posts = []

  for (let p of _posts) {
    let {
      tags_count, likes_count, shares_count, comments_count
    } = await Post.getCounts(p.post_id)

    posts.push({
      ...p,
      tags_count,
      likes_count,
      shares_count,
      comments_count
    })
  }

  res.json(posts)
})

// GET BOOKMARKED POSTS [REQ = USER]
app.post('/get-bookmarked-posts', async (req, res) => {
  let
    _posts = await db.query(
      'SELECT posts.post_id, posts.user, users.username, users.firstname, users.surname, posts.description, posts.imgSrc, posts.filter, posts.location, posts.type, posts.group_id, posts.post_time FROM posts, users, bookmarks WHERE bookmarks.bkmrk_by=? AND posts.user = users.id AND bookmarks.post_id = posts.post_id ORDER BY bookmarks.bkmrk_time DESC',
      [ req.body.user ]
    ),
    posts = []

  for (let p of _posts) {
    let
      {
        tags_count, likes_count, shares_count, comments_count,
      } = await Post.getCounts(p.post_id),
      group_name = await Group.getWhatOfGrp('name', p.group_id)

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

// GET TAGGED POSTS [REQ = USER]
app.post('/get-tagged-posts', async (req, res) => {
  let
    _posts = await db.query(
      'SELECT posts.post_id, posts.user, users.username, users.firstname, users.surname, posts.description, posts.imgSrc, posts.filter, posts.location, posts.type, posts.group_id, posts.post_time FROM post_tags, posts, users WHERE post_tags.user = ? AND post_tags.post_id = posts.post_id AND posts.user = users.id ORDER BY posts.post_time DESC',
      [ req.body.user ]
    ),
    posts = []

  for (let p of _posts) {
    let
      {
        tags_count, likes_count, shares_count, comments_count,
      } = await Post.getCounts(p.post_id),
      group_name = await Group.getWhatOfGrp('name', p.group_id)

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

// GET SHARED POSTS [REQ = USER]
app.post('/get-shared-posts', async (req, res) => {
  let
    _posts = await db.query(
      'SELECT posts.post_id, shares.share_id, posts.user, users.username, users.firstname, users.surname, shares.share_by, posts.description, posts.imgSrc, posts.filter, posts.location, posts.type, posts.group_id, posts.post_time, shares.share_time FROM shares, posts, users WHERE shares.share_to = ? AND shares.post_id = posts.post_id AND posts.user = users.id ORDER BY shares.share_time DESC',
      [ req.body.user ]
    ),
    posts = []

  for (let p of _posts) {
    let
      share_by_username = await User.getWhat('username', p.share_by),
      {
        tags_count, likes_count, shares_count, comments_count
      } = await Post.getCounts(p.post_id),
      group_name = await Group.getWhatOfGrp('name', p.group_id)

    posts.push({
      ...p,
      share_by_username,
      tags_count,
      likes_count,
      shares_count,
      comments_count,
      group_name
    })
  }

  res.json(posts)
})

// GET PHOTOS [REQ = USER]
app.post('/get-photos', async (req, res) => {
  let
    _photos = await db.query(
      'SELECT posts.post_id, posts.user, users.username, users.firstname, users.surname, posts.imgSrc AS imgsrc, posts.filter, posts.post_time FROM posts, users WHERE posts.user = ? AND posts.user = users.id AND posts.type = ? ORDER BY posts.post_time DESC',
      [ req.body.user, 'user' ]
    )

  res.json(_photos)
})

// GET FEED
app.post('/get-feed', async (req, res) => {
  let
    _posts = await db.query(
      'SELECT posts.post_id, posts.user, users.username, users.firstname, users.surname, posts.description, posts.imgSrc, posts.filter, posts.location, posts.type, posts.group_id, posts.post_time FROM posts, users, follow_system WHERE follow_system.follow_by = ? AND follow_system.follow_to = posts.user AND posts.user = users.id ORDER BY posts.post_time DESC',
      [ req.session.id ]
    ),
    posts = []

  for (let p of _posts) {
    let
      {
        tags_count, likes_count, shares_count, comments_count
      } = await Post.getCounts(p.post_id),
      group_name = await Group.getWhatOfGrp('name', p.group_id)

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

// GET GROUP POSTS [REQ = GROUP]
app.post('/get-group-posts', async (req, res) => {
  let
    _posts = await db.query(
      'SELECT posts.post_id, posts.user, users.username, users.firstname, users.surname, posts.description, posts.imgSrc, posts.filter, posts.location, posts.type, posts.group_id, groups.name AS group_name, posts.post_time FROM posts, groups, users WHERE posts.group_id=? AND posts.user = users.id AND posts.group_id = groups.group_id AND posts.type=? ORDER BY posts.post_time DESC',
      [ req.body.group, 'group' ]
    ),
    posts = []

  for (let p of _posts) {
    let {
      tags_count, likes_count, shares_count, comments_count
    } = await Post.getCounts(p.post_id)

    posts.push({
      ...p,
      tags_count,
      likes_count,
      shares_count,
      comments_count
    })
  }

  res.json(posts)
})

// GET GROUP PHOTOS [REQ = GROUP]
app.post('/get-group-photos', async (req, res) => {
  let photos = await db.query(
    'SELECT posts.post_id, posts.user, users.username, users.firstname, users.surname, posts.imgSrc AS imgsrc, posts.filter, posts.post_time FROM posts, users WHERE posts.group_id = ? AND posts.user = users.id ORDER BY posts.post_time DESC',
    [ req.body.group ]
  )

  res.json(photos)
})

// GET POST BY [REQ = POST_ID]
app.post('/get-post', async (req, res) => {
  let
    { post_id } = req.body,
    _post = await db.query(
      'SELECT posts.post_id, posts.user, users.username, users.firstname, users.surname, posts.description, posts.imgSrc, posts.filter, posts.location, posts.type, posts.group_id, posts.post_time FROM posts, users WHERE posts.post_id = ? AND posts.user = users.id',
      [ post_id ]
    ),
    {
      tags_count, likes_count, shares_count, comments_count
    } = await Post.getCounts(post_id),
    comments = await db.query(
      'SELECT comments.comment_id, comments.type, comments.text, comments.commentSrc, comments.comment_by, users.username AS comment_by_username, comments.post_id, comments.comment_time FROM comments, users WHERE comments.post_id = ? AND comments.comment_by = users.id ORDER BY comments.comment_time DESC',
      [ post_id ]
    ),
    group_name = await Group.getWhatOfGrp('name', _post[0].group_id),
    post = {
      ..._post[0],
      tags_count,
      likes_count,
      shares_count,
      comments_count,
      group_name,
      comments
    }

  res.json(post)
})

// EDIT POST [REQ = POST, DESCRIPTION]
app.post('/edit-post', async (req, res) => {
  let
    { post, description } = req.body,
    { id } = req.session

  await db.query('UPDATE posts SET description=? WHERE post_id=?', [ description, post ])
  await db.query('DELETE FROM hashtags WHERE post_id=?', [ post ])
  await db.toHashtag(description, id, post)

  res.json('Hello, World!!')
})

// GET POST TAGS [REQ = POST]
app.post('/get-post-tags', async (req, res) => {
  let
    { post } = req.body,
    { id } = req.session,
    tags = await db.query(
      'SELECT post_tags.post_tag_id, post_tags.post_id, post_tags.user, users.username, users.firstname, users.surname FROM post_tags, users WHERE post_tags.post_id = ? AND post_tags.user = users.id ORDER BY post_tag_id DESC',
      [ post ]
    ),
    array = []

  for (let t of tags) {
    array.push({
      ...t,
      isFollowing: await User.isFollowing(id, t.user),
    })
  }

  res.json({
    tags: array,
    isPostMine: await Post.isPostMine(id, post)
  })
})

// UNTAG [REQ = POST, USER]
app.post('/untag', async (req, res) => {
  let { user, post } = req.body
  await db.query('DELETE FROM post_tags WHERE post_id=? AND user=?', [ post, user ])
  res.json('Hello, World!!')
})

module.exports = app

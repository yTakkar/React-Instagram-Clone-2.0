const
  app = require('express').Router(),
  db = require('../config/db'),
  root = process.cwd(),
  upload = require('multer')({
    dest: `${root}/public/temp/`
  }),
  { ProcessImage, DeleteAllOfFolder } = require('handy-image-processor'),
  { unlink, createReadStream, createWriteStream } = require('fs'),
  { promisify } = require('util')

// POST IMAGE
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
  await DeleteAllOfFolder(`${root}/public/temp/`)

  let
    { insertId } = await db.query('INSERT INTO posts SET ?', insert),
    firstname = await db.getWhat('firstname', id),
    surname = await db.getWhat('surname', id)

  await db.toHashtag(desc, id, insertId)
  await db.mentionUsers(desc, id, insertId, 'post')

  res.json({
    post_id: insertId,
    firstname,
    surname,
    filename,
  })
})

// POST TAGS
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

// GET USER POSTS
app.post('/get-user-posts', async (req, res) => {
  let
    { username } = req.body,
    id = await db.getId(username),
    _posts = await db.query(
      'SELECT posts.post_id, posts.user, users.username, users.firstname, users.surname, posts.description, posts.imgSrc, posts.filter, posts.location, posts.type, posts.post_time FROM posts, users WHERE posts.user=? AND posts.user = users.id AND posts.type=? ORDER BY posts.post_time DESC',
      [ id, 'user' ]
    ),
    posts = []

  for (let p of _posts) {
    let { tags_count, likes_count, shares_count, comments_count } = await db.getCounts(p.post_id, null)

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

// GET BOOKMARKED POSTS
app.post('/get-bookmarked-posts', async (req, res) => {
  let
    { user } = req.body,
    _posts = await db.query(
      'SELECT posts.post_id, posts.user, users.username, users.firstname, users.surname, posts.description, posts.imgSrc, posts.filter, posts.location, posts.type, posts.group_id, posts.post_time FROM posts, users, bookmarks WHERE bookmarks.bkmrk_by=? AND posts.user = users.id AND bookmarks.post_id = posts.post_id ORDER BY bookmarks.bkmrk_time DESC',
      [ user ]
    ),
    posts = []

  for (let p of _posts) {
    let { tags_count, likes_count, shares_count, comments_count, group_name } = await db.getCounts(p.post_id, p.group_id)

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

// GET TAGGED POSTS
app.post('/get-tagged-posts', async (req, res) => {
  let
    { user } = req.body,
    _posts = await db.query(
      'SELECT posts.post_id, posts.user, users.username, users.firstname, users.surname, posts.description, posts.imgSrc, posts.filter, posts.location, posts.type, posts.group_id, posts.post_time FROM post_tags, posts, users WHERE post_tags.user = ? AND post_tags.post_id = posts.post_id AND post_tags.user = users.id ORDER BY posts.post_time DESC',
      [ user ]
    ),
    posts = []

  for (let p of _posts) {
    let { tags_count, likes_count, shares_count, comments_count, group_name } = await db.getCounts(p.post_id, p.group_id)

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

// GET SHARED POSTS
app.post('/get-shared-posts', async (req, res) => {
  let
    { user } = req.body,
    _posts = await db.query(
      'SELECT posts.post_id, shares.share_id, posts.user, users.username, users.firstname, users.surname, shares.share_by, posts.description, posts.imgSrc, posts.filter, posts.location, posts.type, posts.group_id, posts.post_time, shares.share_time FROM shares, posts, users WHERE shares.share_to = ? AND shares.post_id = posts.post_id AND shares.share_to = users.id ORDER BY shares.share_time DESC',
      [ user ]
    ),
    posts = []

  for (let p of _posts) {
    let
      share_by_username = await db.getWhat('username', p.share_by),
      { tags_count, likes_count, shares_count, comments_count, group_name } = await db.getCounts(p.post_id, p.group_id)

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

// GET PHOTOS
app.post('/get-photos', async (req, res) => {
  let
    { user } = req.body,
    _photos = await db.query(
      'SELECT posts.post_id, posts.user, users.username, users.firstname, users.surname, posts.imgSrc AS imgsrc, posts.filter, posts.post_time FROM posts, users WHERE posts.user = ? AND posts.user = users.id AND posts.type = ? ORDER BY posts.post_time DESC',
      [ user, 'user' ]
    )

  res.json(_photos)
})

// GET FEED
app.post('/get-feed', async (req, res) => {
  let
    { id } = req.session,
    _posts = await db.query(
      'SELECT posts.post_id, posts.user, users.username, users.firstname, users.surname, posts.description, posts.imgSrc, posts.filter, posts.location, posts.type, posts.group_id, posts.post_time FROM posts, users, follow_system WHERE follow_system.follow_by = ? AND follow_system.follow_to = posts.user AND posts.user = users.id ORDER BY posts.post_time DESC',
      [ id ]
    ),
    posts = []

  for (let p of _posts) {
    let { tags_count, likes_count, shares_count, comments_count, group_name } = await db.getCounts(p.post_id, p.group_id)

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

// GET GROUP POSTS
app.post('/get-group-posts', async (req, res) => {
  let
    { group } = req.body,
    _posts = await db.query(
      'SELECT posts.post_id, posts.user, users.username, users.firstname, users.surname, posts.description, posts.imgSrc, posts.filter, posts.location, posts.type, posts.group_id, groups.name AS group_name, posts.post_time FROM posts, groups, users WHERE posts.group_id=? AND posts.user = users.id AND posts.group_id = groups.group_id AND posts.type=? ORDER BY posts.post_time DESC',
      [ group, 'group' ]
    ),
    posts = []

  for (let p of _posts) {
    let { tags_count, likes_count, shares_count, comments_count } = await db.getCounts(p.post_id, null)

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

// GET GROUP PHOTOS
app.post('/get-group-photos', async (req, res) => {
  let
    { group } = req.body,
    _photos = await db.query(
      'SELECT posts.post_id, posts.user, users.username, users.firstname, users.surname, posts.imgSrc AS imgsrc, posts.filter, posts.post_time FROM posts, users WHERE posts.group_id = ? AND posts.user = users.id ORDER BY posts.post_time DESC',
      [ group ]
    )

  res.json(_photos)
})

// GET POST BY POST_ID
app.post('/get-post', async (req, res) => {
  let
    { post_id } = req.body,
    _post = await db.query(
      'SELECT posts.post_id, posts.user, users.username, users.firstname, users.surname, posts.description, posts.imgSrc, posts.filter, posts.location, posts.type, posts.group_id, posts.post_time FROM posts, users WHERE posts.post_id = ? AND posts.user = users.id',
      [ post_id ]
    ),
    {
      tags_count, likes_count, shares_count, comments_count, group_name
    } = await db.getCounts(post_id, _post.length != 0 ? _post[0].group_id : 0),
    comments = await db.query(
      'SELECT comments.comment_id, comments.type, comments.text, comments.commentSrc, comments.comment_by, users.username AS comment_by_username, comments.post_id, comments.comment_time FROM comments, users WHERE comments.post_id = ? AND comments.comment_by = users.id ORDER BY comments.comment_time DESC',
      [ post_id ]
    ),

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

// EDIT POST
app.post('/edit-post', async (req, res) => {
  let
    { post, description } = req.body,
    { id } = req.session
  await db.query('UPDATE posts SET description=? WHERE post_id=? AND user=?', [ description, post, id ])
  await db.query('DELETE FROM hashtags WHERE post_id=?', [ post ])
  await db.toHashtag(description, id, post)
  res.json('Hello, World!!')
})

// DELETE POST
app.post('/delete-post', async (req, res) => {
  let { post } = req.body
  await db.deletePost({ post, when: 'user' })
  res.json('Hello, World!!')
})

// POST LIKED OR NOT
app.post('/liked-or-not', async (req, res) => {
  let
    { post } = req.body,
    { id } = req.session,
    liked = await db.likedOrNot(id, post)
  res.json(liked)
})

// LIKE POST
app.post('/like-post', async (req, res) => {
  let
    { post } = req.body,
    { id } = req.session,
    liked = await db.likedOrNot(id, post),
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

// UNLIKE POST
app.post('/unlike-post', async (req, res) => {
  let
    { post } = req.body,
    { id } = req.session
  await db.query('DELETE FROM likes WHERE post_id=? AND like_by=?', [ post, id ])
  res.json('Hello, World!!')
})

// BOOKMARKED OR NOT
app.post('/bookmarked-or-not', async (req, res) => {
  let
    { post } = req.body,
    { id } = req.session,
    bookmarked = await db.bookmarkedOrNot(id, post)
  res.json(bookmarked)
})

// BOOKMARK POST
app.post('/bookmark-post', async (req, res) => {
  let
    { post } = req.body,
    { id } = req.session,
    bookmarked = await db.bookmarkedOrNot(id, post),
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

// UNBOOKMARK POST
app.post('/unbookmark-post', async (req, res) => {
  let
    { post } = req.body,
    { id } = req.session
  await db.query('DELETE FROM bookmarks WHERE post_id=? AND bkmrk_by=?', [ post, id ])
  res.json('Hello, World!!')
})

// GET POST LIKES
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
      isFollowing: await db.isFollowing(id, l.like_by)
    })
  }

  res.json({
    likes: array,
    isPostMine: await db.isPostMine(id, post)
  })
})

// GET POST TAGS
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
      isFollowing: await db.isFollowing(id, t.user),
    })
  }

  res.json({
    tags: array,
    isPostMine: await db.isPostMine(id, post)
  })
})

// UNTAG
app.post('/untag', async (req, res) => {
  let { user, post } = req.body
  await db.query('DELETE FROM post_tags WHERE post_id=? AND user=?', [ post, user ])
  res.json('Hello, World!!')
})

// GET USERS TO SHARE
app.post('/get-users-to-share', async (req, res) => {
  let
    { id } = req.session,
    { post } = req.body,
    followings = await db.query(
      'SELECT follow_system.follow_id, follow_system.follow_to, follow_system.follow_to_username AS username, users.firstname, users.surname FROM follow_system, users WHERE follow_system.follow_by=? AND follow_system.follow_to = users.id ORDER BY follow_system.follow_time DESC',
      [ id ]
    ),
    share = []

  for (let f of followings) {
    let didIShare = await db.didIShare(post, id, f.follow_to)
    share.push({
      ...f,
      didIShare
    })
  }

  res.json(share)
})

// SHARE POST
app.post('/share-post', async (req, res) => {
  let
    { share_to, post } = req.body,
    username = await db.getWhat('username', share_to),
    { id } = req.session,
    shared = await db.didIShare(post, id, share_to),
    insert = {
      share_by: id,
      share_to,
      post_id: post,
      share_time: new Date().getTime()
    },
    mssg = '',
    success = false

  if (!shared) {
    await db.query('INSERT INTO shares SET ?', insert)
    mssg = `Shared to ${username}!!`
    success = true
  } else {
    mssg = 'Already shared!!'
    success = false
  }

  res.json({ mssg, success })
})

// UNSHARE POST
app.post('/unshare-post', async (req, res) => {
  let
    { post, unshare_to } = req.body,
    { id } = req.session
  await db.query('DELETE FROM shares WHERE share_by=? AND share_to=? AND post_id=?', [ id, unshare_to, post ])
  res.json('Hello, World!!')
})

// REMOVE SHARE
app.post('/remove-share', async (req, res) => {
  let
    { share_by, post } = req.body,
    { id } = req.session
  await db.query('DELETE FROM shares WHERE share_by=? AND share_to=? AND post_id=?', [ share_by, id, post ])
  res.json('Hello, World!!')
})

// POST SHARED BY
app.post('/get-post-sharers', async (req, res) => {
  let
    { post } = req.body,
    { id } = req.session,
    _sharers = await db.query(
      'SELECT shares.share_id, shares.share_by, users.username AS share_by_username, users.firstname AS follow_by_firstname, users.surname AS follow_by_surname, shares.share_to, shares.post_id, shares.share_time FROM shares, users WHERE shares.post_id=? AND shares.share_by = users.id ORDER BY shares.share_id DESC',
      [ post ]
    ),
    sharers = []

  for (let s of _sharers) {
    let
      share_to_username = await db.getWhat('username', s.share_to),
      isFollowing = await db.isFollowing(id, s.share_by)

    sharers.push({
      ...s,
      isFollowing,
      share_to_username
    })
  }

  res.json(sharers)
})

// COMMENT TEXT
app.post('/comment-text', async (req, res) => {
  let
    { post, text } = req.body,
    { id } = req.session,
    comment = {
      type: 'text',
      text,
      comment_by: id,
      post_id: post,
      comment_time: new Date().getTime()
    },
    { insertId } = await db.query('INSERT INTO comments SET ?', comment)
  await db.mentionUsers(text, id, post, 'comment')

  res.json({ comment_id: insertId })
})

// COMMENT IMAGE
app.post('/comment-image', upload.single('commentImage'), async (req, res) => {
  let
    { id } = req.session,
    { post } = req.body,
    filename = `instagram_comment_${new Date().getTime()}.jpg`,
    obj = {
      srcFile: req.file.path,
      destFile: `${root}/public/comments/${filename}`
    },
    insert = {
      type: 'image',
      commentSrc: filename,
      comment_by: id,
      post_id: post,
      comment_time: new Date().getTime()
    }

  await ProcessImage(obj)
  await DeleteAllOfFolder(`${root}/public/temp/`)

  let { insertId } = await db.query('INSERT INTO comments SET ?', insert)

  res.json({
    comment_id: insertId,
    filename
  })
})

// COMMENT STICKER
app.post('/comment-sticker', async (req, res) => {
  let
    { sticker, post } = req.body,
    { id } = req.session,
    filename = `instagram_comment_${new Date().getTime()}.jpg`,
    comment = {
      type: 'sticker',
      commentSrc: filename,
      comment_by: id,
      post_id: post,
      comment_time: new Date().getTime()
    }

  await createReadStream(`${root}/public/images/stickers/${sticker}`)
    .pipe(createWriteStream(`${root}/public/comments/${filename}`))

  let { insertId } = await db.query('INSERT INTO comments SET ?', comment)

  res.json({
    comment_id: insertId,
    filename
  })
})

// DELETE COMMENT
app.post('/delete-comment', async (req, res) => {
  let
    { comment_id, type, commentSrc } = req.body,
    deleteCommentFile = promisify(unlink)

  await db.query('DELETE FROM comments WHERE comment_id=?', [ comment_id ])

  if (type == 'image' || type == 'sticker') {
    deleteCommentFile(`${root}/public/comments/${commentSrc}`)
  }

  res.json('H')
})

// EDIT COMMENT
app.post('/edit-comment', async (req, res) => {
  let { comment_id, comment } = req.body
  await db.query('UPDATE comments SET text=? WHERE comment_id=?', [ comment, comment_id ])
  res.json('Hello, World!!')
})

module.exports = app

// ALL POST-RELATED ROUTES ARE HANDLED BY THIS FILE

const app = require('express').Router(),
  db = require('../../../config/db'),
  Post = require('../../../config/Post'),
  User = require('../../../config/User'),
  root = process.cwd(),
  upload = require('multer')({
    dest: `${root}/dist/temp/`,
  }),
  { ProcessImage, DeleteAllOfFolder } = require('../../../config/ImageProcessor')

// NSFW keyword filter
const NSFW_KEYWORDS = [
  'nsfw', 'xxx', 'porn', 'nude', 'naked', 'explicit',
  'gore', 'violence', 'abuse', 'drug', 'illegal',
]

const checkNSFW = (text) => {
  if (!text) return { isNSFW: false, flaggedWords: [] }
  const lower = text.toLowerCase()
  const flaggedWords = NSFW_KEYWORDS.filter(word => lower.includes(word))
  return { isNSFW: flaggedWords.length > 0, flaggedWords }
}

// POST [REQ = DESC, FILTER, LOCATION, TYPE, GROUP, IMAGE(FILE) ]
app.post('/post-it', upload.single('image'), async (req, res) => {
  try {
    let { id } = req.session,
      { desc, filter, location, type, group, isNSFW: isNSFWStr } = req.body,
      isNSFWClient = isNSFWStr === 'true',
      groupId = group === 'undefined' || !group ? 0 : parseInt(group, 10),
      ext = req.file ? require('path').extname(req.file.originalname).toLowerCase() : '',
      filename = req.file ? `instagram_${new Date().getTime()}${ext || '.jpg'}` : '',
      obj = req.file ? {
        srcFile: req.file.path,
        destFile: `${root}/dist/posts/${filename}`,
      } : null

    // Check for NSFW content
    const nsfwResult = checkNSFW(desc)
    const finalIsNSFW = isNSFWClient || nsfwResult.isNSFW
    const postStatus = 'pending'
    const rejectionReason = finalIsNSFW ? `NSFW Review needed: ${nsfwResult.flaggedWords.join(', ')} (User Tagged: ${isNSFWClient})` : ''
    if (finalIsNSFW) {
      desc = desc ? `${desc} #nsfw` : '#nsfw'
    }

    let insert = {
        user: id,
        description: desc,
        imgSrc: filename,
        filter,
        location,
        type,
        group_id: groupId,
        post_time: new Date().getTime(),
        status: postStatus,
        rejection_reason: rejectionReason,
        isNSFW: finalIsNSFW ? 1 : 0,
        nsfwTaggedByAuthor: isNSFWClient ? 1 : 0,
      }

    if (obj) {
      await ProcessImage(obj)
      DeleteAllOfFolder(`${root}/dist/temp/`)
    }

    let { insertId } = await db.query('INSERT INTO posts SET ?', insert),
      firstname = await User.getWhat('firstname', id),
      surname = await User.getWhat('surname', id)

    await db.toHashtag(desc, id, insertId)
    await User.mentionUsers(desc, id, insertId, 'post')

    let responseMsg = finalIsNSFW
      ? 'Posted! Your post is flagged as NSFW and is pending admin review.'
      : 'Posted! Your post is pending admin approval.'

    res.json({
      success: true,
      mssg: responseMsg,
      post_id: insertId,
      firstname,
      surname,
      filename,
      status: postStatus,
      nsfw_flagged: nsfwResult.isNSFW,
    })
  } catch (error) {
    db.catchError(error, res)
  }
})

// TAGS USERS FOR A POST [REQ = TAGS, POST_ID]
app.post('/tag-post', (req, res) => {
  let { tags, post_id } = req.body
  tags.forEach(async t => {
    let tagInsert = {
      post_id: post_id,
      user: t.user,
    }
    await db.query('INSERT INTO post_tags SET ?', tagInsert)
  })
  res.json(null)
})

// EDIT POST [REQ = POST, DESCRIPTION]
app.post('/edit-post', async (req, res) => {
  try {
    let { post_id, description } = req.body
    let { id } = req.session

    await db.query('UPDATE posts SET description=? WHERE post_id=?', [
      description,
      post_id,
    ])
    await db.query('DELETE FROM hashtags WHERE post_id=?', [post_id])
    await db.toHashtag(description, id, post_id)

    res.json({
      success: true,
      mssg: 'Post updated!!',
    })
  } catch (error) {
    db.catchError(error, res)
  }
})

// GET POST TAGS [REQ = POST]
app.post('/get-post-tags', async (req, res) => {
  let { post } = req.body,
    { id } = req.session,
    tags = await db.query(
      'SELECT post_tags.post_tag_id, post_tags.post_id, post_tags.user, users.username, users.firstname, users.surname FROM post_tags, users WHERE post_tags.post_id = ? AND post_tags.user = users.id ORDER BY post_tag_id DESC',
      [post]
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
    isPostMine: await Post.isPostMine(id, post),
  })
})

// UNTAG [REQ = POST, USER]
app.post('/untag', async (req, res) => {
  let { user, post } = req.body
  await db.query('DELETE FROM post_tags WHERE post_id=? AND user=?', [
    post,
    user,
  ])
  res.json('Hello, World!!')
})

// DELETE POST [REQ = POST]
app.post('/delete-post', async (req, res) => {
  try {
    await Post.deletePost({
      post: req.body.post,
      when: 'user',
    })
    res.json({
      success: true,
      mssg: 'Post deleted!!',
    })
  } catch (error) {
    db.catchError(error, res)
  }
})

module.exports = app

// POST-SHARING IS HANDLED BY THIS FILE

const app = require('express').Router(),
  db = require('../../../config/db'),
  Post = require('../../../config/Post'),
  User = require('../../../config/User')

// GET USERS TO SHARE [REQ = POST]
app.post('/get-users-to-share', async (req, res) => {
  let { id } = req.session,
    { post } = req.body,
    followings = await db.query(
      'SELECT follow_system.follow_id, follow_system.follow_to, follow_system.follow_to_username AS username, users.firstname, users.surname FROM follow_system, users WHERE follow_system.follow_by=? AND follow_system.follow_to = users.id ORDER BY follow_system.follow_time DESC',
      [id]
    ),
    share = []

  for (let f of followings) {
    let didIShare = await Post.didIShare(post, id, f.follow_to)
    share.push({
      ...f,
      didIShare,
    })
  }

  res.json(share)
})

// SHARE POST [REQ = POST, SHARE_TO]
app.post('/share-post', async (req, res) => {
  let respObj = {}

  try {
    let { share_to, post_id } = req.body,
      username = await User.getWhat('username', share_to),
      { id } = req.session,
      shared = await Post.didIShare(post_id, id, share_to),
      insert = {
        share_by: id,
        share_to,
        post_id: post_id,
        share_time: new Date().getTime(),
      }

    if (!shared) {
      await db.query('INSERT INTO shares SET ?', insert)
      respObj = {
        mssg: `Shared to ${username}!!`,
        success: true,
      }
    } else {
      respObj = { mssg: 'Already shared!!' }
    }
  } catch (error) {
    console.log(error)
    respObj = { mssg: 'An error occured!!' }
  }

  res.json(respObj)
})

// UNSHARE POST [REQ = POST, UNSHARE_TO]
app.post('/unshare-post', async (req, res) => {
  try {
    let { post_id, unshare_to } = req.body
    let { id } = req.session
    let unshare_to_username = await User.getWhat('username', unshare_to)

    await db.query(
      'DELETE FROM shares WHERE share_by=? AND share_to=? AND post_id=?',
      [id, unshare_to, post_id]
    )
    res.json({
      success: true,
      mssg: `Unshared to ${unshare_to_username}`,
    })
  } catch (error) {
    db.catchError(error, res)
  }
})

// REMOVE SHARE [REQ = SHARE_ID]
app.post('/remove-share', async (req, res) => {
  await db.query('DELETE FROM shares WHERE share_id=?', [req.body.share_id])
  res.json('Hello, World!!')
})

// POST SHARED BY [REQ = POST]
app.post('/get-post-sharers', async (req, res) => {
  let { post } = req.body,
    { id } = req.session,
    _sharers = await db.query(
      'SELECT shares.share_id, shares.share_by, users.username AS share_by_username, users.firstname AS share_by_firstname, users.surname AS share_by_surname, shares.share_to, shares.post_id, shares.share_time FROM shares, users WHERE shares.post_id=? AND shares.share_by = users.id ORDER BY shares.share_id DESC',
      [post]
    ),
    sharers = []

  for (let s of _sharers) {
    let share_to_username = await User.getWhat('username', s.share_to)
    let isFollowing = await User.isFollowing(id, s.share_by)

    sharers.push({
      ...s,
      isFollowing,
      share_to_username,
    })
  }

  res.json(sharers)
})

module.exports = app

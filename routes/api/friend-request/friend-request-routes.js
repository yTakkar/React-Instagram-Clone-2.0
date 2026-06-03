// ALL FRIEND REQUEST-RELATED ROUTES ARE HANDLED BY THIS FILE

const app = require('express').Router(),
  db = require('../../../config/db'),
  User = require('../../../config/User')

// SEND FRIEND REQUEST [REQ = TO_USER]
app.post('/send-friend-request', async (req, res) => {
  try {
    let { to_user } = req.body,
      { id: from_user } = req.session

    // Can't send request to self
    if (from_user == to_user) {
      return res.json({ mssg: 'Cannot send request to yourself!' })
    }

    // Check if request already exists
    let [{ existingCount }] = await db.query(
      'SELECT COUNT(request_id) AS existingCount FROM friend_requests WHERE ((from_user=? AND to_user=?) OR (from_user=? AND to_user=?)) AND status IN (?, ?)',
      [from_user, to_user, to_user, from_user, 'pending', 'accepted']
    )

    if (existingCount > 0) {
      return res.json({ mssg: 'Friend request already exists!' })
    }

    // Check if user is blocked
    let isBlocked = await User.isBlocked(to_user, from_user)
    if (isBlocked) {
      return res.json({ mssg: 'Cannot send request to this user!' })
    }

    let insert = {
      from_user,
      to_user,
      status: 'pending',
      request_time: new Date().getTime().toString(),
    }

    let { insertId } = await db.query('INSERT INTO friend_requests SET ?', insert)

    // Send notification
    await db.query('INSERT INTO notifications SET ?', {
      notify_by: from_user,
      notify_to: to_user,
      post_id: 0,
      group_id: 0,
      type: 'friend_request',
      user: 0,
      notify_time: new Date().getTime(),
    })

    let username = await User.getWhat('username', from_user)

    res.json({
      success: true,
      mssg: 'Friend request sent!',
      request_id: insertId,
      from_username: username,
    })
  } catch (error) {
    db.catchError(error, res)
  }
})

// ACCEPT FRIEND REQUEST [REQ = REQUEST_ID]
app.post('/accept-friend-request', async (req, res) => {
  try {
    let { request_id } = req.body,
      { id } = req.session

    // Get the request
    let [request] = await db.query(
      'SELECT * FROM friend_requests WHERE request_id=? AND to_user=? AND status=?',
      [request_id, id, 'pending']
    )

    if (!request) {
      return res.json({ mssg: 'Friend request not found!' })
    }

    // Update status
    await db.query('UPDATE friend_requests SET status=?, response_time=? WHERE request_id=?', [
      'accepted',
      new Date().getTime().toString(),
      request_id,
    ])

    // Auto-follow each other
    let from_username = await User.getWhat('username', request.from_user)
    let to_username = await User.getWhat('username', id)

    // Check if not already following, then follow
    let isFollowing1 = await User.isFollowing(id, request.from_user)
    if (!isFollowing1) {
      await db.query('INSERT INTO follow_system SET ?', {
        follow_by: id,
        follow_by_username: to_username,
        follow_to: request.from_user,
        follow_to_username: from_username,
        follow_time: new Date().getTime().toString(),
      })
    }

    let isFollowing2 = await User.isFollowing(request.from_user, id)
    if (!isFollowing2) {
      await db.query('INSERT INTO follow_system SET ?', {
        follow_by: request.from_user,
        follow_by_username: from_username,
        follow_to: id,
        follow_to_username: to_username,
        follow_time: new Date().getTime().toString(),
      })
    }

    // Send notification
    await db.query('INSERT INTO notifications SET ?', {
      notify_by: id,
      notify_to: request.from_user,
      post_id: 0,
      group_id: 0,
      type: 'friend_accept',
      user: 0,
      notify_time: new Date().getTime(),
    })

    res.json({
      success: true,
      mssg: `You are now friends with ${from_username}!`,
    })
  } catch (error) {
    db.catchError(error, res)
  }
})

// REJECT FRIEND REQUEST [REQ = REQUEST_ID]
app.post('/reject-friend-request', async (req, res) => {
  try {
    let { request_id } = req.body,
      { id } = req.session

    await db.query('UPDATE friend_requests SET status=?, response_time=? WHERE request_id=? AND to_user=?', [
      'rejected',
      new Date().getTime().toString(),
      request_id,
      id,
    ])

    res.json({
      success: true,
      mssg: 'Friend request rejected!',
    })
  } catch (error) {
    db.catchError(error, res)
  }
})

// GET PENDING FRIEND REQUESTS (received)
app.post('/get-friend-requests', async (req, res) => {
  try {
    let { id } = req.session

    let requests = await db.query(
      'SELECT friend_requests.request_id, friend_requests.from_user, users.username, users.firstname, users.surname, friend_requests.request_time FROM friend_requests, users WHERE friend_requests.to_user=? AND friend_requests.status=? AND friend_requests.from_user = users.id ORDER BY friend_requests.request_time DESC',
      [id, 'pending']
    )

    let result = []
    for (let r of requests) {
      let mutualUsers = await User.mutualUsers(id, r.from_user)
      result.push({
        ...r,
        mutualUsersCount: mutualUsers.length,
      })
    }

    res.json(result)
  } catch (error) {
    db.catchError(error, res)
  }
})

// GET SENT FRIEND REQUESTS
app.post('/get-sent-requests', async (req, res) => {
  try {
    let { id } = req.session

    let requests = await db.query(
      'SELECT friend_requests.request_id, friend_requests.to_user, users.username, users.firstname, users.surname, friend_requests.status, friend_requests.request_time FROM friend_requests, users WHERE friend_requests.from_user=? AND friend_requests.to_user = users.id ORDER BY friend_requests.request_time DESC',
      [id]
    )

    res.json(requests)
  } catch (error) {
    db.catchError(error, res)
  }
})

// GET FRIENDS LIST (accepted requests)
app.post('/get-friends', async (req, res) => {
  try {
    let { id } = req.session,
      { user } = req.body,
      owner = user || id

    let friends = await db.query(
      `SELECT 
        fr.request_id,
        CASE WHEN fr.from_user = ? THEN fr.to_user ELSE fr.from_user END AS friend_id,
        u.username, u.firstname, u.surname,
        fr.response_time AS friends_since
      FROM friend_requests fr
      JOIN users u ON (CASE WHEN fr.from_user = ? THEN fr.to_user ELSE fr.from_user END) = u.id
      WHERE (fr.from_user = ? OR fr.to_user = ?) AND fr.status = 'accepted'
      ORDER BY fr.response_time DESC`,
      [owner, owner, owner, owner]
    )

    res.json(friends)
  } catch (error) {
    db.catchError(error, res)
  }
})

// CANCEL FRIEND REQUEST [REQ = REQUEST_ID]
app.post('/cancel-friend-request', async (req, res) => {
  try {
    let { request_id } = req.body,
      { id } = req.session

    await db.query('DELETE FROM friend_requests WHERE request_id=? AND from_user=? AND status=?', [
      request_id,
      id,
      'pending',
    ])

    res.json({
      success: true,
      mssg: 'Friend request cancelled!',
    })
  } catch (error) {
    db.catchError(error, res)
  }
})

// UNFRIEND [REQ = USER_ID]
app.post('/unfriend', async (req, res) => {
  try {
    let { user_id } = req.body,
      { id } = req.session

    // Delete the friend request record
    await db.query(
      'DELETE FROM friend_requests WHERE ((from_user=? AND to_user=?) OR (from_user=? AND to_user=?)) AND status=?',
      [id, user_id, user_id, id, 'accepted']
    )

    let username = await User.getWhat('username', user_id)

    res.json({
      success: true,
      mssg: `Unfriended ${username}!`,
    })
  } catch (error) {
    db.catchError(error, res)
  }
})

// CHECK FRIEND STATUS [REQ = USER_ID]
app.post('/check-friend-status', async (req, res) => {
  try {
    let { user_id } = req.body,
      { id } = req.session

    let [result] = await db.query(
      'SELECT request_id, status, from_user, to_user FROM friend_requests WHERE ((from_user=? AND to_user=?) OR (from_user=? AND to_user=?)) AND status IN (?, ?) LIMIT 1',
      [id, user_id, user_id, id, 'pending', 'accepted']
    )

    if (!result) {
      return res.json({ status: 'none' })
    }

    res.json({
      status: result.status,
      request_id: result.request_id,
      is_sender: result.from_user == id,
    })
  } catch (error) {
    res.json({ status: 'none' })
  }
})

module.exports = app

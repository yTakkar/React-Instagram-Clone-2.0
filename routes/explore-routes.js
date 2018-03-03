const
  app = require('express').Router(),
  db = require('../config/db'),
  lodash = require('lodash')

// USERS TO EXPLORE
app.post('/get-users-to-explore', async (req, res) => {
  let
    { id } = req.session,
    _users = await db.query(
      'SELECT users.id, users.username, users.firstname, users.surname FROM users WHERE users.id <> ? ORDER BY RAND() DESC LIMIT 12',
      [ id ]
    ),
    users = []

  for (let u of _users) {
    let
      isFollowing = await db.isFollowing(id, u.id),
      [{ followers_count }] = await db.query(
        'SELECT COUNT(follow_id) AS followers_count FROM follow_system WHERE follow_to=?',
        [ u.id ]
      ),
      mutualUsers = await db.mutualUsers(id, u.id)

    !isFollowing ?
      users.push({
        ...u,
        followers_count,
        mutualUsersCount: mutualUsers.length
      })
      : []

  }

  res.json(users)
})

// PHOTOS TO EXPLORE
app.post('/get-photos-to-explore', async (req, res) => {
  let
    { id } = req.session,
    photos = await db.query(
      'SELECT posts.post_id, posts.user, users.username, users.firstname, users.surname, posts.imgSrc AS imgsrc, posts.filter, posts.post_time FROM posts, users WHERE posts.user <> ? AND posts.user = users.id ORDER BY RAND() DESC LIMIT 10',
      [ id ]
    )

  res.json(photos)
})

// GROUPS TO EXPLORE
app.post('/get-groups-to-explore', async (req, res) => {
  let
    { id } = req.session,
    _groups = await db.query('SELECT group_id, name, admin, created FROM groups ORDER BY RAND()'),
    groups = []

  for (let g of _groups) {
    let
      [{ membersCount }] = await db.query(
        'SELECT COUNT(grp_member_id) AS membersCount FROM group_members WHERE group_id=?',
        [ g.group_id ]
      ),
      mutualMembers = await db.mutualGroupMembers(id, g.group_id),
      joined = await db.joinedGroup(id, g.group_id)

    !joined ?
      groups.push({
        ...g,
        membersCount,
        mutualMembersCount: mutualMembers.length,
        joined
      })
      : []
  }

  res.json(groups)
})

// GET SUGGESTED USERS
app.post('/get-suggested-users', async (req, res) => {
  let
    { id } = req.session,
    _users = await db.query(
      'SELECT users.id, users.username, users.firstname, users.surname FROM users WHERE users.id <> ? ORDER BY RAND() DESC LIMIT 10',
      [ id ]
    ),
    users = []

  for (let u of _users) {
    let
      isFollowing = await db.isFollowing(id, u.id),
      mutualUsers = await db.mutualUsers(id, u.id)

    !isFollowing ?
      users.push({
        ...u,
        mutualUsersCount: mutualUsers.length
      })
      : null
  }

  let orderByMutualUsers
    = lodash.orderBy(users.slice(0, 5), ['mutualUsersCount'], ['desc'])

  res.json(orderByMutualUsers)
})

module.exports = app

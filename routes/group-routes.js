const
  app = require('express').Router(),
  db = require('../config/db'),
  root = process.cwd(),
  { createReadStream, createWriteStream, mkdir, rmdir } = require('fs'),
  { promisify } = require('util'),
  { DeleteAllOfFolder } = require('handy-image-processor')

// CREATE GROUP
app.post('/create-group', async (req, res) => {
  let
    { name, bio } = req.body,
    { id } = req.session

  req.checkBody('name', 'Name is empty!!').notEmpty()
  req.checkBody('name', 'Name must be less than 255!!').isLength({ max: 255 })

  let errors = await req.getValidationResult()
  if (!errors.isEmpty()) {
    let array = []
    errors.array().forEach(e => array.push(e.msg))
    res.json({ mssg: array })
  } else {

    let
      group = {
        name,
        bio,
        admin: id,
        created: new Date().getTime()
      },
      { affectedRows, insertId } = await db.query('INSERT INTO groups SET ?', group),
      makeDir = promisify(mkdir)

    if (affectedRows == 1) {

      await makeDir(`${root}/public/groups/${insertId}`)
      createReadStream(`${root}/public/images/wheel.jpg`)
        .pipe(createWriteStream(`${root}/public/groups/${insertId}/avatar.jpg`))

      let member = {
        group_id: insertId,
        member: id,
        added_by: id,
        joined_group: new Date().getTime()
      }

      await db.query('INSERT INTO group_members SET ?', member)

      res.json({
        mssg: 'Group created successfully!!',
        success: true,
        groupId: insertId
      })

    } else {
      res.json({ mssg: 'Error in creating group!!' })
    }

  }

})

// EDIT GROUP
app.post('/edit-group', async (req, res) => {
  let { name, bio, group_type, group } = req.body
  await db.query(
    'UPDATE groups SET name=?, bio=?, group_type=? WHERE group_id=?',
    [ name, bio, group_type, group ]
  )
  res.json('Hello, World!!')
})

// CHECK IF GROUP IS VALID
app.post('/is-group-valid', async (req, res) => {
  let
    { grp_id } = req.body,
    [{ groupCount }] = await db.query(
      'SELECT COUNT(group_id) AS groupCount FROM groups WHERE group_id=? LIMIT 1',
      [ grp_id ]
    )
  res.json(groupCount == 1 ? true : false)
})

// GET GROUP DETAILS
app.post('/get-group-details', async (req, res) => {
  let
    { grp_id } = req.body,
    _details = await db.query(
      'SELECT groups.group_id, groups.name, groups.bio, groups.admin, users.username AS admin_username, groups.group_type, groups.created FROM groups, users WHERE groups.group_id=? AND groups.admin = users.id',
      [ grp_id ]
    ),
    [{ postsCount }] = await db.query('SELECT COUNT(post_id) AS postsCount FROM posts WHERE group_id=?', [ grp_id ]),
    details = {
      ..._details[0],
      postsCount
    }

  res.json(details)
})

// JOINED GROUP OR NOT
app.post('/joined-group', async (req, res) => {
  let
    { group } = req.body,
    { id } = req.session,
    joined = await db.joinedGroup(id, group)
  res.json(joined)
})

// JOIN GROUP
app.post('/join-group', async (req, res) => {
  let
    { user, added_by, group, when } = req.body,
    username = await db.getWhat('username', user),
    joined = await db.joinedGroup(user, group),
    member = {
      group_id: group,
      member: user,
      added_by,
      joined_group: new Date().getTime()
    }

  if (!joined) {
    await db.query('INSERT INTO group_members SET ?', member)
    res.json({
      mssg: `${when == 'add_grp_member' ? `Added ${username}!!` : 'Joined!!'}`,
      success: true
    })
  } else {
    res.json({ mssg: `${username} already joined the group!!` })
  }

})

// LEAVE GROUP
app.post('/leave-group', async (req, res) => {
  let { user, group } = req.body
  await db.query('DELETE FROM group_members WHERE member=? AND group_id=?', [ user, group ])
  res.json({ mssg: 'Left!!' })
})

// GET GROUP MEMBERS
app.post('/get-group-members', async (req, res) => {
  let
    { grp_id } = req.body,
    { id } = req.session,
    _members = await db.query(
      'SELECT group_members.grp_member_id, group_members.group_id, group_members.member, users.username, users.firstname, users.surname, group_members.added_by, group_members.joined_group FROM group_members, users WHERE group_members.group_id = ? AND group_members.member = users.id ORDER BY group_members.joined_group DESC',
      [ grp_id ]
    ),
    members = []

  for (let m of _members) {
    let
      added_by_username = await db.getWhat('username', m.added_by),
      mutualUsers = await db.mutualUsers(id, m.member)

    members.push({
      ...m,
      added_by_username,
      mutualUsersCount: mutualUsers.length
    })
  }

  res.json(members)
})

// REMOVE MEMBER
app.post('/remove-group-member', async (req, res) => {
  let { member, group_id } = req.body
  await db.query('DELETE FROM group_members WHERE member=? AND group_id=?', [ member, group_id ])
  res.json('Hello, World!!')
})

// GET MUTUAL GROUP MEMBERS
app.post('/get-mutual-newest-members', async (req, res) => {
  let
    { id: session } = req.session,
    { grp_id } = req.body,
    mutualMembers = await db.mutualGroupMembers(session, grp_id),
    grpMembers = await db.query(
      'SELECT group_members.member AS user, users.username AS username FROM group_members, users WHERE group_id = ? AND group_members.member = users.id ORDER BY group_members.joined_group DESC',
      [ grp_id ]
    )

  res.json({
    mutualMembers,
    newestMembers: grpMembers.slice(0, 10)
  })
})

// GET USER GROUPS
app.post('/get-user-groups', async (req, res) => {
  let
    { user } = req.body,
    { id } = req.session,
    _groups = await db.query(
      'SELECT groups.group_id, groups.name, groups.admin, group_members.member, group_members.joined_group FROM group_members, groups WHERE group_members.member = ? AND group_members.group_id = groups.group_id ORDER BY groups.created DESC',
      [ user ]
    ),
    groups = []

  for (let g of _groups) {
    let joined = await db.joinedGroup(id, g.group_id)

    groups.push({
      ...g,
      joined,
    })
  }

  res.json(groups)
})

// GET USERS TO INVITE
app.post('/get-users-to-invite', async (req, res) => {
  let
    { id } = req.session,
    users = await db.query(
      'SELECT follow_system.follow_id, follow_system.follow_to, follow_system.follow_to_username AS username, users.firstname, users.surname FROM follow_system, users WHERE follow_system.follow_by=? AND follow_system.follow_to = users.id ORDER BY follow_system.follow_time DESC',
      [ id ]
    )

  res.json(users)
})

// CHANGE ADMIN
app.post('/change-admin', async (req, res) => {
  let { user, group } = req.body
  await db.query('UPDATE groups SET admin=? WHERE group_id=?', [ user, group ])
  res.json('Hello, World!!')
})

// GET USERS TO MAKE ADMIN
app.post('/get-users-to-make-admin', async (req, res) => {
  let
    { grp_id } = req.body,
    { id } = req.session,
    members = await db.query(
      'SELECT group_members.grp_member_id, group_members.member, users.username, users.firstname, users.surname FROM group_members, users WHERE group_members.group_id = ? AND group_members.member = users.id AND group_members.member <> ?',
      [ grp_id, id ]
    )
  res.json(members)
})

// DELET GROUP
app.post('/delete-group', async (req, res) => {
  let { group } = req.body
  await db.deleteGroup(group)
  res.json('Hello, World!!')
})

module.exports = app

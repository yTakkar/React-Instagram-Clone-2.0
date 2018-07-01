// ALL GROUP-RELATED ROUTES ARE HANDLED BY THIS FILE

const app = require('express').Router(),
  db = require('../../../config/db'),
  Group = require('../../../config/Group'),
  User = require('../../../config/User'),
  root = process.cwd(),
  { createReadStream, createWriteStream, mkdir } = require('fs'),
  { promisify } = require('util')

// CREATE GROUP [REQ = NAME, BIO]
app.post('/create-group', async (req, res) => {
  let { name, bio } = req.body,
    { id } = req.session

  req.checkBody('name', 'Name is empty!!').notEmpty()
  req.checkBody('name', 'Name must be less than 255!!').isLength({ max: 255 })

  let errors = await req.getValidationResult()
  if (!errors.isEmpty()) {
    let array = []
    errors.array().forEach(e => array.push(e.msg))
    res.json({ mssg: array })
  } else {
    let group = {
        name,
        bio,
        admin: id,
        created: new Date().getTime(),
      },
      { affectedRows, insertId } = await db.query(
        'INSERT INTO groups SET ?',
        group
      ),
      makeDir = promisify(mkdir)

    if (affectedRows == 1) {
      await makeDir(`${root}/dist/groups/${insertId}`)
      createReadStream(`${root}/dist/images/wheel.jpg`).pipe(
        createWriteStream(`${root}/dist/groups/${insertId}/avatar.jpg`)
      )

      let member = {
        group_id: insertId,
        member: id,
        added_by: id,
        joined_group: new Date().getTime(),
      }

      await db.query('INSERT INTO group_members SET ?', member)

      res.json({
        mssg: 'Group created successfully!!',
        success: true,
        groupId: insertId,
      })
    } else {
      res.json({ mssg: 'Error in creating group!!' })
    }
  }
})

// EDIT GROUP [REQ = NAME, BIO, GROUP_TYPE, GROUP]
app.post('/edit-group', async (req, res) => {
  try {
    let { name, bio, group_type, group } = req.body
    await db.query(
      'UPDATE groups SET name=?, bio=?, group_type=? WHERE group_id=?',
      [name, bio, group_type, group]
    )
    res.json({
      success: true,
      mssg: 'Updated!!',
    })
  } catch (error) {
    db.catchError(error, res)
  }
})

// CHECK IF GROUP IS VALID [REQ = GRP_ID]
app.post('/is-group-valid', async (req, res) => {
  let [{ groupCount }] = await db.query(
    'SELECT COUNT(group_id) AS groupCount FROM groups WHERE group_id=? LIMIT 1',
    [req.body.grp_id]
  )
  res.json(groupCount == 1 ? true : false)
})

// GET GROUP DETAILS [REQ = GRP_ID]
app.post('/get-group-details', async (req, res) => {
  let { grp_id } = req.body,
    _details = await db.query(
      'SELECT groups.group_id, groups.name, groups.bio, groups.admin, users.username AS admin_username, groups.group_type, groups.created FROM groups, users WHERE groups.group_id=? AND groups.admin = users.id',
      [grp_id]
    ),
    [{ postsCount }] = await db.query(
      'SELECT COUNT(post_id) AS postsCount FROM posts WHERE group_id=?',
      [grp_id]
    )

  res.json({
    ..._details[0],
    postsCount,
  })
})

// JOINED GROUP OR NOT [REQ = GROUP]
app.post('/joined-group', async (req, res) => {
  let joined = await Group.joinedGroup(req.session.id, req.body.group)
  res.json(joined)
})

// JOIN GROUP [REQ = USER, ADDED_BY, GROUP_WHEN]
app.post('/join-group', async (req, res) => {
  let respObj = {}

  try {
    let { user, added_by, group, when } = req.body,
      { id: session } = req.session,
      username = await User.getWhat('username', user),
      joined = await Group.joinedGroup(user, group),
      member = {
        group_id: group,
        member: user,
        added_by,
        joined_group: new Date().getTime(),
      }

    if (!joined) {
      await db.query('INSERT INTO group_members SET ?', member)
      respObj = {
        success: true,
        mssg: `${
          when == 'add_grp_member' ? `Added ${username}!!` : 'Joined!!'
        }`,
      }
    } else {
      respObj = {
        mssg: `${
          session == user ? 'You' : username
        } already joined the group!!`,
      }
    }
  } catch (error) {
    console.log(error)
    respObj = { mssg: 'An error occured!!' }
  }

  res.json(respObj)
})

// LEAVE GROUP [REQ = USER, GROUP]
app.post('/leave-group', async (req, res) => {
  try {
    let { user, group } = req.body
    await db.query('DELETE FROM group_members WHERE member=? AND group_id=?', [
      user,
      group,
    ])
    res.json({
      success: true,
      mssg: 'Left!!',
    })
  } catch (error) {
    db.catchError(error, res)
  }
})

// REMOVE MEMBER [REQ = MEMBER, GROUP_ID]
app.post('/remove-group-member', async (req, res) => {
  let { member, group_id } = req.body
  await db.query('DELETE FROM group_members WHERE member=? AND group_id=?', [
    member,
    group_id,
  ])
  res.json('Hello, World!!')
})

// GET MUTUAL GROUP MEMBERS [REQ = GRP_ID]
app.post('/get-mutual-newest-members', async (req, res) => {
  let { grp_id } = req.body,
    mutualMembers = await Group.mutualGroupMembers(req.session.id, grp_id),
    grpMembers = await db.query(
      'SELECT group_members.member AS user, users.username AS username FROM group_members, users WHERE group_id = ? AND group_members.member = users.id ORDER BY group_members.joined_group DESC',
      [grp_id]
    )

  res.json({
    mutualMembers,
    newestMembers: grpMembers.slice(0, 10),
  })
})

// GET USERS TO INVITE
app.post('/get-users-to-invite', async (req, res) => {
  let users = await db.query(
    'SELECT follow_system.follow_id, follow_system.follow_to, follow_system.follow_to_username AS username, users.firstname, users.surname FROM follow_system, users WHERE follow_system.follow_by=? AND follow_system.follow_to = users.id ORDER BY follow_system.follow_time DESC',
    [req.session.id]
  )
  res.json(users)
})

// CHANGE ADMIN [REQ = USER, GROUP]
app.post('/change-admin', async (req, res) => {
  try {
    let { user, group } = req.body
    let username = await User.getWhat('username', user)

    await db.query('UPDATE groups SET admin=? WHERE group_id=?', [user, group])
    res.json({
      success: true,
      mssg: `${username} is now admin of this group!!`,
    })
  } catch (error) {
    db.catchError(error, res)
  }
})

// GET USERS TO MAKE ADMIN [REQ = GRP_ID]
app.post('/get-users-to-make-admin', async (req, res) => {
  let members = await db.query(
    'SELECT group_members.grp_member_id, group_members.member, users.username, users.firstname, users.surname FROM group_members, users WHERE group_members.group_id = ? AND group_members.member = users.id AND group_members.member <> ?',
    [req.body.grp_id, req.session.id]
  )
  res.json(members)
})

// DELET GROUP [REQ = GROUP]
app.post('/delete-group', async (req, res) => {
  await Group.deleteGroup(req.body.group)
  res.json('Hello, World!!')
})

module.exports = app

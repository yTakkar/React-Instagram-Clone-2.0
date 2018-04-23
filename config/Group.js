// HANDY METHODS FOR GROUP ROUTES

const
  db = require('./db'),
  { rmdir } = require('fs'),
  { promisify } = require('util'),
  root = process.cwd(),
  { deletePost } = require('./Post'),
  { DeleteAllOfFolder } = require('handy-image-processor'),
  { intersectionBy } = require('lodash')

/**
 * Deletes group
 * @param {Number} group GroupID
 */
const deleteGroup = async group => {
  let
    posts = await db.query('SELECT post_id FROM posts WHERE group_id=?', [ group ]),
    dltDir = promisify(rmdir)

  for (let p of posts) {
    await deletePost({ post: p.post_id, when: 'group' })
  }

  await db.query('DELETE FROM notifications WHERE group_id=?', [ group ])
  await db.query('DELETE FROM group_members WHERE group_id=?', [ group ])
  await db.query('DELETE FROM groups WHERE group_id=?', [ group ])

  DeleteAllOfFolder(`${root}/public/groups/${group}/`)
  await dltDir(`${root}/public/groups/${group}`)
}

/**
 * Returns whether user joined group
 * @param {Number} user UserID
 * @param {Number} group GroupID
 */
const joinedGroup = async (user, group) => {
  let is = await db.query(
    'SELECT COUNT(grp_member_id) AS joined FROM group_members WHERE member=? AND group_id=? LIMIT 1',
    [ user, group ]
  )
  return db.tf(is[0].joined)
}

/**
 * Returns mutual users of group members and user
 * @param {Number} user UserID
 * @param {Number} group GroupID
 */
const mutualGroupMembers = async (user, group) => {
  let
    myFollowings = await db.query(
      'SELECT follow_system.follow_to AS user, follow_system.follow_to_username AS username FROM follow_system WHERE follow_system.follow_by=?',
      [ user ]
    ),
    grpMembers = await db.query(
      'SELECT group_members.member AS user, users.username AS username FROM group_members, users WHERE group_id = ? AND group_members.member = users.id ORDER BY group_members.joined_group DESC',
      [ group ]
    ),
    mutuals = intersectionBy(myFollowings, grpMembers, 'user')

  return mutuals
}

module.exports = {
  deleteGroup,
  joinedGroup,
  mutualGroupMembers
}

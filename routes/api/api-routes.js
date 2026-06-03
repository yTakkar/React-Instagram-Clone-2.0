// OTHER API ROUTES ARE HANDLED BY THIS FILE

const app = require('express').Router(),
  db = require('../../config/db'),
  User = require('../../config/User'),
  Group = require('../../config/Group')

// FOR CHECKING IF IT'S A VALID USER [REQ = USERNAME]
app.post('/is-user-valid', async (req, res) => {
  let { username } = req.body,
    [{ userCount }] = await db.query(
      "SELECT COUNT(id) AS userCount FROM users WHERE username=? AND (account_status IS NULL OR account_status <> 'deleted') LIMIT 1",
      [username]
    )
  res.json(db.tf(userCount))
})

// GETTING USER DETAILS [REQ = USERNAME]
// Now includes nickname, cover_image, role, and account_status
app.post('/get-user-details', async (req, res) => {
  let { username } = req.body,
    details = await db.query(
      "SELECT id, username, firstname, surname, nickname, email, bio, joined, email_verified, account_type, instagram, twitter, facebook, github, website, phone, lastOnline, cover_image, role, account_status FROM users WHERE username=? AND (account_status IS NULL OR account_status <> 'deleted') LIMIT 1",
      [username]
    )

  if (!details || details.length === 0) {
    return res.json({ details: {}, tags: [] })
  }

  let id = details[0].id,
    tags = await db.query('SELECT user, tag FROM tags WHERE user=?', [id])

  res.json({
    details: {
      ...details[0],
      isOnline: (await User.getWhat('isOnline', id)) == 'yes' ? true : false,
    },
    tags,
  })
})

// GETTING MUTUAL USERS [REQ = USERNAME]
app.post('/get-mutual-users', async (req, res) => {
  let { username } = req.body,
    user = await User.getId(username),
    { id } = req.session,
    _mutuals = await User.mutualUsers(id, user),
    mutuals = []

  for (let m of _mutuals) {
    let mutualUsers = await User.mutualUsers(id, m.user)
    mutuals.push({
      ...m,
      mutualUsersCount: mutualUsers.length,
    })
  }

  res.json(mutuals.slice(0, 10))
})

// SEARCH INSTAGRAM [REQ = VALUE]
// Enhanced to also search posts by description
app.post('/search-instagram', async (req, res) => {
  let { value } = req.body,
    { id } = req.session,
    _users = await db.query(
      `SELECT id, username, firstname, surname, nickname FROM users WHERE (username LIKE "%${value}%" OR firstname LIKE "%${value}%" OR surname LIKE "%${value}%" OR nickname LIKE "%${value}%") AND id <> ? AND account_status='active' ORDER BY id DESC LIMIT 7`,
      [id]
    ),
    users = [],
    _groups = await db.query(
      `SELECT group_id, name FROM \`groups\` WHERE name LIKE "%${value}%" ORDER BY group_id DESC LIMIT 7`
    ),
    groups = [],
    hashtags = await db.query(
      `SELECT hashtag FROM hashtags WHERE hashtag LIKE "%${value}%" GROUP BY hashtag ORDER BY MAX(hashtag_time) DESC LIMIT 10`
    )

  for (let u of _users) {
    let mutualFollowers = await User.mutualUsers(id, u.id)
    users.push({ ...u, mutualFollowersCount: mutualFollowers.length })
  }

  for (let g of _groups) {
    let [{ membersCount }] = await db.query(
        'SELECT COUNT(grp_member_id) AS membersCount FROM group_members WHERE group_id=?',
        [g.group_id]
      ),
      mutualMembers = await Group.mutualGroupMembers(id, g.group_id)

    groups.push({
      ...g,
      membersCount,
      mutualMembersCount: mutualMembers.length,
    })
  }

  res.json({ users, groups, hashtags })
})

// SEARCH POSTS BY CONTENT [REQ = VALUE]
app.post('/search-posts', async (req, res) => {
  try {
    let { value } = req.body,
      { id } = req.session

    let posts = await db.query(
      `SELECT posts.post_id, posts.user, users.username, users.firstname, users.surname, posts.description, posts.imgSrc, posts.filter, posts.location, posts.post_time FROM posts, users WHERE posts.description LIKE "%${value}%" AND posts.user = users.id AND posts.status='approved' ORDER BY posts.post_time DESC LIMIT 20`,
      []
    )

    res.json(posts)
  } catch (error) {
    db.catchError(error, res)
  }
})

// RELATED SEARCH SUGGESTIONS [REQ = VALUE]
// Returns quick suggestions based on partial input
app.post('/related-search', async (req, res) => {
  try {
    let { value } = req.body,
      { id } = req.session

    // Get user suggestions
    let users = await db.query(
      `SELECT id, username, firstname, surname FROM users WHERE (username LIKE "${value}%" OR firstname LIKE "${value}%") AND id <> ? AND account_status='active' ORDER BY id DESC LIMIT 5`,
      [id]
    )

    // Get hashtag suggestions
    let hashtags = await db.query(
      `SELECT hashtag, COUNT(*) as count FROM hashtags WHERE hashtag LIKE "#${value}%" GROUP BY hashtag ORDER BY count DESC LIMIT 5`
    )

    // Get post description snippets
    let posts = await db.query(
      `SELECT DISTINCT SUBSTRING(description, 1, 50) as snippet FROM posts WHERE description LIKE "%${value}%" AND status='approved' ORDER BY post_time DESC LIMIT 5`
    )

    res.json({
      users,
      hashtags,
      posts: posts.map(p => ({ snippet: p.snippet })),
    })
  } catch (error) {
    db.catchError(error, res)
  }
})

module.exports = app

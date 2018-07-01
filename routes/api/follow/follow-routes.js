// ALL FOLLOW-RELATED ROUTES ARE HANDLED BY THIS FILE

const app = require('express').Router(),
  db = require('../../../config/db'),
  User = require('../../../config/User')

// TO CHECK IF SESSION FOLLOWING USER [REQ = USERNAME]
app.post('/is-following', async (req, res) => {
  let {
      body: { username },
      session: { id: session },
    } = req,
    id = await User.getId(username),
    is = await User.isFollowing(session, id)
  res.json(is)
})

// FOLLOW USER [REQ = USER, USERNAME]
app.post('/follow', async (req, res) => {
  let respObj = {}

  try {
    let { user, username } = req.body,
      { id: session, username: session_username } = req.session,
      isFollowing = await User.isFollowing(session, user),
      isBlocked = await User.isBlocked(user, session),
      insert = {
        follow_by: session,
        follow_by_username: session_username,
        follow_to: user,
        follow_to_username: username,
        follow_time: `${new Date().getTime()}`,
      }

    if (!isBlocked) {
      if (!isFollowing) {
        let { insertId } = await db.query(
            'INSERT INTO follow_system SET ?',
            insert
          ),
          firstname = await User.getWhat('firstname', session),
          surname = await User.getWhat('surname', session)

        respObj = {
          mssg: `Followed ${username}!!`,
          success: true,
          ff: {
            follow_id: insertId,
            follow_by: session,
            username: session_username,
            firstname,
            surname,
            follow_to: user,
            follow_time: insert.follow_time,
          },
        }
      } else {
        respObj = { mssg: `Already followed ${username}!!` }
      }
    } else {
      respObj = { mssg: `Could not follow ${username}!!` }
    }
  } catch (error) {
    console.log(error)
    respObj = { mssg: 'An error occured!!' }
  }

  res.json(respObj)
})

// UNFOLLOW USER [REQ = USER]
app.post('/unfollow', async (req, res) => {
  try {
    let { session, body } = req
    await db.query(
      'DELETE FROM follow_system WHERE follow_by=? AND follow_to=?',
      [session.id, body.user]
    )
    res.json({
      success: true,
      mssg: 'Unfollowed!!',
    })
  } catch (error) {
    db.catchError(error, res)
  }
})

// VIEW PROFILE [REQ = USERNAME]
app.post('/view-profile', async (req, res) => {
  let { username } = req.body,
    { id: session } = req.session,
    id = await User.getId(username),
    [{ time: dtime }] = await db.query(
      'SELECT MAX(view_time) as time FROM profile_views WHERE view_by=? AND view_to=?',
      [session, id]
    ),
    time = parseInt(new Date().getTime() - parseInt(dtime))

  if (time >= 150000 || !dtime) {
    // 120000 = 2.5 minutes
    let insert = {
      view_by: session,
      view_to: id,
      view_time: new Date().getTime(),
    }
    await db.query('INSERT INTO profile_views SET ?', insert)
  }

  res.json('Hello, World!!')
})

// RETURNS FOLLOWERS OF A USER
const getFollowers = async user => {
  let s = await db.query(
    'SELECT follow_system.follow_id, follow_system.follow_to, follow_system.follow_by, follow_system.follow_by_username AS username, users.firstname, users.surname, follow_system.follow_time FROM follow_system, users WHERE follow_system.follow_to=? AND follow_system.follow_by = users.id ORDER BY follow_system.follow_time DESC',
    [user]
  )
  return s
}

// RETURNS FOLLOWINGS OF A USER
const getFollowings = async user => {
  let s = await db.query(
    'SELECT follow_system.follow_id, follow_system.follow_to, follow_system.follow_by, follow_system.follow_to_username AS username, users.firstname, users.surname, follow_system.follow_time FROM follow_system, users WHERE follow_system.follow_by=? AND follow_system.follow_to = users.id ORDER BY follow_system.follow_time DESC',
    [user]
  )
  return s
}

// GET FOLLOWERS [REQ = USER]
app.post('/get-followers', async (req, res) => {
  let followers = await getFollowers(req.body.user)
  res.json(followers)
})

// GET FOLLOWINGS [REQ = USER]
app.post('/get-followings', async (req, res) => {
  let followings = await getFollowings(req.body.user)
  res.json(followings)
})

// GET USER STATS [FOLLOWERS/FOLLOWINGS/ETC..] [REQ = USERNAME]
app.post('/get-user-stats', async (req, res) => {
  let { username } = req.body,
    id = await User.getId(username),
    followers = await getFollowers(id),
    followings = await getFollowings(id),
    [{ views_count }] = await db.query(
      'SELECT COUNT(view_id) AS views_count FROM profile_views WHERE view_to=?',
      [id]
    ),
    // favourites
    favourites = await db.query(
      'SELECT favourites.fav_id, favourites.fav_by, favourites.user, users.username, users.firstname, users.surname, favourites.fav_time FROM favourites, users WHERE favourites.fav_by = ? AND favourites.user = users.id ORDER BY favourites.fav_time DESC',
      [id]
    ),
    // recommendations
    _recommendations = await db.query(
      'SELECT recommendations.recommend_id, recommendations.recommend_of, users.username AS recommend_of_username, users.firstname AS recommend_of_firstname, users.surname AS recommend_of_surname, recommendations.recommend_to, recommendations.recommend_by, recommendations.recommend_time FROM recommendations, users WHERE recommendations.recommend_to = ? AND recommendations.recommend_of = users.id ORDER BY recommend_time DESC',
      [id]
    ),
    recommendations = []

  for (let r of _recommendations) {
    recommendations.push({
      ...r,
      recommend_by_username: await User.getWhat('username', r.recommend_by),
    })
  }

  res.json({
    followers,
    followings,
    views_count,
    favourites,
    recommendations,
  })
})

// SEARCH FOLLOWINGS
app.post('/search-followings', async (req, res) => {
  let data = await db.query(
    'SELECT DISTINCT follow_to, follow_to_username FROM follow_system WHERE follow_by=? ORDER BY follow_time DESC',
    [req.session.id]
  )
  res.json(data)
})

module.exports = app

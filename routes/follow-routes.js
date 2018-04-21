// ALL FOLLOWE-RELATED ROUTES ARE HANDLED BY THIS FILE

const
  app = require('express').Router(),
  db = require('../config/db'),
  User = require('../config/User')

// TO CHECK IF SESSION FOLLOWING USER [REQ = USERNAME]
app.post('/is-following', async (req, res) => {
  let {
      body: { username },
      session: { id: session }
    } = req,
    id = await db.getId(username),
    is = await User.isFollowing(session, id)
  res.json(is)
})

// FOLLOW USER [REQ = USER, USERNAME]
app.post('/follow', async (req, res) => {
  let
    { user, username } = req.body,
    { id: session, username: session_username } = req.session,
    isFollowing = await User.isFollowing(session, user),
    isBlocked = await User.isBlocked(user, session),
    insert = {
      follow_by: session,
      follow_by_username: session_username,
      follow_to: user,
      follow_to_username: username,
      follow_time: new Date().getTime()
    }

  if(!isBlocked) {
    if (!isFollowing) {
      let
        { insertId } = await db.query('INSERT INTO follow_system SET ?', insert),
        firstname = await db.getWhat('firstname', session),
        surname = await db.getWhat('surname', session)

      res.json({
        mssg: `Followed ${username}!!`,
        success: true,
        ff: {
          follow_id: insertId,
          follow_by: session,
          username: session_username,
          firstname,
          surname,
          follow_to: user,
          follow_time: insert.follow_time
        }
      })
    } else {
      res.json({
        mssg: `Already followed ${username}!!`,
        success: false
      })
    }

  } else {
    res.json({ mssg: `Could not follow ${username}!!` })
  }


})

// UNFOLLOW USER [REQ = USER]
app.post('/unfollow', async (req, res) => {
  let { session, body } = req
  await db.query('DELETE FROM follow_system WHERE follow_by=? AND follow_to=?', [ session.id, body.user ])
  res.json({ mssg: 'Unfollowed!!' })
})

// VIEW PROFILE [REQ = USERNAME]
app.post('/view-profile', async (req, res) => {
  let
    { username } = req.body,
    { id: session } = req.session,
    id = await db.getId(username),
    [{ time: dtime }] = await db.query(
      'SELECT MAX(view_time) as time FROM profile_views WHERE view_by=? AND view_to=?',
      [session, id]
    ),
    time = parseInt(new Date().getTime() - parseInt(dtime))

  if (time >= 150000 || !dtime) {    // 120000 = 2.5 minutes
    let insert = {
      view_by: session,
      view_to: id,
      view_time: new Date().getTime()
    }
    await db.query('INSERT INTO profile_views SET ?', insert)
  }

  res.json('Hello, World!!')
})

// RETURNS FOLLOWERS OF A USER
const getFollowers = user => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT follow_system.follow_id, follow_system.follow_to, follow_system.follow_by, follow_system.follow_by_username AS username, users.firstname, users.surname, follow_system.follow_time FROM follow_system, users WHERE follow_system.follow_to=? AND follow_system.follow_by = users.id ORDER BY follow_system.follow_time DESC',
      [ user ]
    )
      .then(s => resolve(s))
      .catch(e => reject(e))
  })
}

// RETURNS FOLLOWINGS OF A USER
const getFollowings = user => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT follow_system.follow_id, follow_system.follow_to, follow_system.follow_by, follow_system.follow_to_username AS username, users.firstname, users.surname, follow_system.follow_time FROM follow_system, users WHERE follow_system.follow_by=? AND follow_system.follow_to = users.id ORDER BY follow_system.follow_time DESC',
      [ user ]
    )
      .then(s => resolve(s))
      .catch(e => reject(e))
  })
}

// GET USER STATS [FOLLOWERS/FOLLOWINGS/ETC..] [REQ = USERNAME]
app.post('/get-user-stats', async (req, res) => {
  let
    { username } = req.body,
    id = await db.getId(username),

    followers = await getFollowers(id),
    followings = await getFollowings(id),
    [{ views_count }] = await db.query('SELECT COUNT(view_id) AS views_count FROM profile_views WHERE view_to=?', [ id ]),

    // favourites
    favourites = await db.query(
      'SELECT favourites.fav_id, favourites.fav_by, favourites.user, users.username, users.firstname, users.surname, favourites.fav_time FROM favourites, users WHERE favourites.fav_by = ? AND favourites.user = users.id ORDER BY favourites.fav_time DESC',
      [ id ]
    ),

    // recommendations
    _recommendations = await db.query(
      'SELECT recommendations.recommend_id, recommendations.recommend_of, users.username AS recommend_of_username, users.firstname AS recommend_of_firstname, users.surname AS recommend_of_surname, recommendations.recommend_to, recommendations.recommend_by, recommendations.recommend_time FROM recommendations, users WHERE recommendations.recommend_to = ? AND recommendations.recommend_of = users.id ORDER BY recommend_time DESC',
      [ id ]
    ),
    recommendations = []

  for (let r of _recommendations) {
    recommendations.push({
      ...r,
      recommend_by_username: await db.getWhat('username', r.recommend_by)
    })
  }

  res.json({
    followers,
    followings,
    views_count,
    favourites,
    recommendations
  })
})

// GET FOLLOWERS [REQ = USER]
app.post('/get-followers', async (req, res) => {
  let
    { user } = req.body,
    followers = await getFollowers(user)
  res.json(followers)
})

// GET FOLLOWINGS [REQ = USER]
app.post('/get-followings', async (req, res) => {
  let
    { user } = req.body,
    followings = await getFollowings(user)
  res.json(followings)
})

// SEARCH FOLLOWINGS
app.post('/search-followings', async (req, res) => {
  let
    { id } = req.session,
    data = await db.query(
      'SELECT DISTINCT follow_to, follow_to_username FROM follow_system WHERE follow_by=? ORDER BY follow_time DESC',
      [ id ]
    )
  res.json(data)
})

// ADD TO FAVOURITES [REQ = USER]
app.post('/add-to-favourites', async (req, res) => {
  let
    { user } = req.body,
    { id } = req.session,
    username = await db.getWhat('username', user),
    favourite = await User.favouriteOrNot(id, user),
    isBlocked = await User.isBlocked(user, id),
    fav = {
      fav_by: id,
      user,
      fav_time: new Date().getTime()
    }

  if (!isBlocked) {
    if (!favourite) {
      await db.query('INSERT INTO favourites SET ?', fav)
      res.json({
        mssg: `Added ${username} to favourites!!`,
        success: true
      })
    } else {
      res.json({ mssg: `Already added ${username} to favourites!!`, })
    }

  } else {
    res.json({ mssg: 'Could not add to favourites!!' })
  }

})

// REMOVE FROM FAVOURITES [REQ = FAV_ID]
app.post('/remove-favourites', async (req, res) => {
  let { fav_id } = req.body
  await db.query('DELETE FROM favourites WHERE fav_id=?', [ fav_id ])
  res.json('Hello, World!!')
})

// USERS TO RECOMMEND [REQ = USER]
app.post('/get-users-to-recommend', async (req, res) => {
  let
    { user } = req.body,
    { id } = req.session,
    users = await db.query(
      'SELECT follow_system.follow_id, follow_system.follow_to, follow_system.follow_to_username AS username, users.firstname, users.surname FROM follow_system, users WHERE follow_system.follow_by=? AND follow_system.follow_to = users.id AND follow_system.follow_to <> ? ORDER BY follow_system.follow_time DESC',
      [ id, user ]
    )

  res.json(users)
})

// RECOMMEND USER [REQ = USER, RECOMMEND_TO]
app.post('/recommend-user', async (req, res) => {
  let
    { user, recommend_to } = req.body,
    { id: recommend_by } = req.session,
    isBlocked = await User.isBlocked(user, recommend_by),
    isBlockedTwo = await User.isBlocked(recommend_to, recommend_by),
    recommend = {
      recommend_by,
      recommend_to,
      recommend_of: user,
      recommend_time: new Date().getTime()
    }

  if (!isBlocked && !isBlockedTwo) {
    await db.query('INSERT INTO recommendations SET ?', recommend)
    res.json({ success: true })
  } else {
    res.json({ success: false })
  }
})

// REMOVE RECOMMENDATION [REQ = RECOMMEND_ID]
app.post('/remove-recommendation', async (req, res) => {
  let { recommend_id } = req.body
  await db.query('DELETE FROM recommendations WHERE recommend_id=?', [ recommend_id ])
  res.json('Hello, World!!')
})

module.exports = app

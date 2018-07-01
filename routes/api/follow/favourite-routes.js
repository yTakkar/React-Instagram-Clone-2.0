require('dotenv').config()
// ALL FAVOURITE-RELATED ROUTES ARE HANDLED BY THIS FILE

const app = require('express').Router(),
  db = require('../../../config/db'),
  User = require('../../../config/User')

// ADD TO FAVOURITES [REQ = USER]
app.post('/add-to-favourites', async (req, res) => {
  let respObj = {}

  try {
    let { user } = req.body,
      { id } = req.session,
      username = await User.getWhat('username', user),
      favourite = await User.favouriteOrNot(id, user),
      isBlocked = await User.isBlocked(user, id),
      fav = {
        fav_by: id,
        user,
        fav_time: new Date().getTime(),
      }

    if (!isBlocked) {
      if (!favourite) {
        await db.query('INSERT INTO favourites SET ?', fav)
        respObj = {
          success: true,
          mssg: `Added ${username} to favourites!!`,
        }
      } else {
        respObj = {
          mssg: `Already added ${username} to favourites!!`,
        }
      }
    } else {
      respObj = { mssg: 'Could not add to favourites!!' }
    }
  } catch (error) {
    console.log(error)
    respObj = { mssg: 'An error occured!!' }
  }

  res.json(respObj)
})

// REMOVE FROM FAVOURITES [REQ = FAV_ID]
app.post('/remove-favourites', async (req, res) => {
  try {
    await db.query('DELETE FROM favourites WHERE fav_id=?', [req.body.fav_id])
    res.json({ success: true })
  } catch (error) {
    db.catchError(error, res)
  }
})

module.exports = app

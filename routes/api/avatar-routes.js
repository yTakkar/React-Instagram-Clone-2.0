// ALL THE AVATAR/IMAGE-RELATED ROUTES ARE HANDLED BY THIS FILE

const app = require('express').Router(),
  fs = require('fs'),
  root = process.cwd(),
  upload = require('multer')({
    dest: `${root}/dist/temp/`,
  }),
  { ProcessImage, DeleteAllOfFolder } = require('handy-image-processor'),
  { catchError } = require('../../config/db')

// GET AVATARS
app.post('/get-avatars', (req, res) => {
  let avatars = fs.readdirSync(`${root}/dist/images/avatars`)
  res.json(avatars)
})

// GET STICKERS
app.post('/get-stickers', async (req, res) => {
  let stickers = fs.readdirSync(`${root}/dist/images/stickers`)
  res.json(stickers)
})

// CHANGE AVATAR [REQ = AVATAR, OF, GROUP]
app.post('/change-avatar', async (req, res) => {
  try {
    let { avatar, of, group } = req.body,
      { id } = req.session,
      src = `${root}/dist/images/avatars/${avatar}`,
      dest =
        of == 'user'
          ? `${root}/dist/users/${id}/avatar.jpg`
          : `${root}/dist/groups/${group}/avatar.jpg`

    await fs.createReadStream(src).pipe(fs.createWriteStream(dest))

    res.json({
      success: true,
      mssg: 'Avatar Changed!!',
    })
  } catch (error) {
    catchError(error, res)
  }
})

// UPLOAD AVATAR [REQ = OF, GROUP, AVATAR(FILE)]
app.post('/upload-avatar', upload.single('avatar'), async (req, res) => {
  try {
    let {
        file,
        session,
        body: { of, group },
      } = req,
      dest =
        of == 'user'
          ? `${root}/dist/users/${session.id}/avatar.jpg`
          : `${root}/dist/groups/${group}/avatar.jpg`,
      obj = {
        srcFile: file.path,
        width: 200,
        height: 200,
        destFile: dest,
      }

    await ProcessImage(obj)
    DeleteAllOfFolder(`${root}/dist/temp/`)

    res.json({
      success: true,
      mssg: 'Avatar changed!!',
    })
  } catch (error) {
    catchError(error, res)
  }
})

module.exports = app

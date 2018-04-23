// ALL THE AVATAR/IMAGE-RELATED ROUTES ARE HANDLED BY THIS FILE

const
  app = require('express').Router(),
  fs = require('fs'),
  root = process.cwd(),
  upload = require('multer')({
    dest: `${root}/public/temp/`
  }),
  { ProcessImage, DeleteAllOfFolder } = require('handy-image-processor')

// GET AVATARS
app.post('/get-avatars', (req, res) => {
  let avatars = fs.readdirSync(`${root}/public/images/avatars`)
  res.json(avatars)
})

// GET STICKERS
app.post('/get-stickers', async (req, res) => {
  let stickers = fs.readdirSync(`${root}/public/images/stickers`)
  res.json(stickers)
})

// CHANGE AVATAR [REQ = AVATAR, OF, GROUP]
app.post('/change-avatar', async (req, res) => {
  let
    { avatar, of, group } = req.body,
    { id } = req.session,
    src = `${root}/public/images/avatars/${avatar}`,
    dest = of == 'user'
      ? `${root}/public/users/${id}/avatar.jpg`
      : `${root}/public/groups/${group}/avatar.jpg`

  await fs.createReadStream(src)
    .pipe(fs.createWriteStream(dest))

  res.json({ mssg: 'Avatar Changed!!' })
})

// UPLOAD AVATAR [REQ = OF, GROUP, AVATAR(FILE)]
app.post('/upload-avatar', upload.single('avatar'), async (req, res) => {
  let
    { file, session, body: { of, group } } = req,
    dest =
      of == 'user' ? `${root}/public/users/${session.id}/avatar.jpg`
        : `${root}/public/groups/${group}/avatar.jpg`,
    obj = {
      srcFile: file.path,
      width: 200,
      height: 200,
      destFile: dest
    }

  await ProcessImage(obj)
  await DeleteAllOfFolder(`${root}/public/temp/`)

  res.json({ mssg: 'Avatar changed!!' })
})

module.exports = app

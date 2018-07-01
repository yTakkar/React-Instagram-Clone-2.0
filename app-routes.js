// ROUTE FILES

// User routes
const userR = require('./routes/user/user-routes'),
  signUpR = require('./routes/user/signup-routes'),
  loginR = require('./routes/user/login-routes'),
  pswrdR = require('./routes/user/password-routes'),
  qlR = require('./routes/user/quick-login-routes')

// Post routes
const postR = require('./routes/api/post/post-routes'),
  getPostR = require('./routes/api/post/get-posts'),
  commentR = require('./routes/api/post/comment-routes'),
  shareR = require('./routes/api/post/share-routes'),
  likesR = require('./routes/api/post/likes-routes')

// Follow routes
const followR = require('./routes/api/follow/follow-routes'),
  favR = require('./routes/api/follow/favourite-routes'),
  recommendR = require('./routes/api/follow/recommend-routes')

// Conversation routes
const conR = require('./routes/api/conversation/con-routes'),
  mssgR = require('./routes/api/conversation/message-routes')

// Group routes
const groupR = require('./routes/api/group/group-routes'),
  groupSections = require('./routes/api/group/get-group-sections')

// Other API routes
const notifyR = require('./routes/api/others/notification-routes'),
  editR = require('./routes/api/others/edit-routes'),
  exploreR = require('./routes/api/others/explore-routes'),
  avatarR = require('./routes/api/avatar-routes'),
  settingsR = require('./routes/api/others/settings-routes'),
  hashtagR = require('./routes/api/others/hashtag-routes'),
  adminR = require('./routes/api/others/admin-routes'),
  apiR = require('./routes/api/api-routes')

// Main route
const mainR = require('./routes/main-routes')

const AppRoutes = app => {
  // Routing (mainR route should be placed last)
  app.use('/', userR)
  app.use('/', signUpR)
  app.use('/', loginR)
  app.use('/', pswrdR)
  app.use('/api', qlR)

  app.use('/api', followR)
  app.use('/api', recommendR)
  app.use('/api', favR)

  app.use('/api', postR)
  app.use('/api', getPostR)
  app.use('/api', commentR)
  app.use('/api', shareR)
  app.use('/api', likesR)

  app.use('/api', groupR)
  app.use('/api', groupSections)

  app.use('/api', conR)
  app.use('/api', mssgR)

  app.use('/api', avatarR)
  app.use('/api', notifyR)
  app.use('/api', editR)
  app.use('/api', exploreR)
  app.use('/api', settingsR)
  app.use('/api', hashtagR)
  app.use('/api', adminR)
  app.use('/api', apiR)

  app.use('/', mainR)
}

module.exports = AppRoutes

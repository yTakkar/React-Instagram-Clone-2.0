import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import promise from 'redux-promise-middleware'

import User from './reducers/user-r'
import Follow from './reducers/follow-r'
import Notification from './reducers/notification-r'
import Post from './reducers/post-r'
import Explore from './reducers/explore-r'
import Group from './reducers/group-r'
import Message from './reducers/message-r'
import Setting from './reducers/setting-r'
import Hashtag from './reducers/hashtag-r'

const reducers = combineReducers({
  User,
  Follow,
  Notification,
  Post,
  Explore,
  Group,
  Message,
  Setting,
  Hashtag,
})

const middlwares = applyMiddleware(promise(), thunk, logger)

export default createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  middlwares
)

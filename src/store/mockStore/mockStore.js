import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'

// mock-reducers
import User from './mock-reducers/User'
import Notification from './mock-reducers/Notification'
import Group from './mock-reducers/Group'
import Follow from './mock-reducers/Follow'
import Explore from './mock-reducers/Explore'
import Post from './mock-reducers/Post'
import Hashtag from './mock-reducers/Hashtag'
import Setting from './mock-reducers/Setting'
import Message from './mock-reducers/Message'

const initialState = {
  User,
  Notification,
  Group,
  Follow,
  Explore,
  Post,
  Hashtag,
  Setting,
  Message
}

const middlewares = [
  promise(), thunk
]
const createStore = configureStore(middlewares)
const mockStore = createStore(initialState)

export default mockStore

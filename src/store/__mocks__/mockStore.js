import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

// mock-reducers
import User from './reducers/User'
import Notification from './reducers/Notification'
import Group from './reducers/Group'
import Follow from './reducers/Follow'
import Explore from './reducers/Explore'
import Post from './reducers/Post'
import Hashtag from './reducers/Hashtag'
import Setting from './reducers/Setting'
import Message from './reducers/Message'

const initialState = {
  User,
  Notification,
  Group,
  Follow,
  Explore,
  Post,
  Hashtag,
  Setting,
  Message,
}

const middlewares = [thunk]
const createStore = configureStore(middlewares)
const mockStore = createStore(initialState)

export default mockStore

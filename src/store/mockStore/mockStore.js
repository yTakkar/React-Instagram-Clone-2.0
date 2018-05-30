import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import promise from 'redux-promise-middleware'

// mock-reducers
import User from './mock-reducers/User'
import Notification from './mock-reducers/Notification'
import Group from './mock-reducers/Group'
import Follow from './mock-reducers/Follow'
import Explore from './mock-reducers/Explore'

const initialState = {
  User,
  Notification,
  Group,
  Follow,
  Explore
}

const middlewares = [
  promise(), thunk, logger
]
const createStore = configureStore(middlewares)
const mockStore = createStore(initialState)

export default mockStore

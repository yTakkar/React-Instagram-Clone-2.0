import initialState from './initialState'
import * as methods from './methods'

const normalizeStatus = status => ({
  status: status && status.status ? status.status : 'none',
  request_id: status && status.request_id ? status.request_id : 0,
  is_sender: status && status.is_sender ? true : false,
})

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_FRIEND_STATUS':
    case 'SET_FRIEND_STATUS':
      return { ...state, status: normalizeStatus(action.payload) }

    case 'GET_FRIENDS':
      return { ...state, friends: action.payload }

    case 'REMOVE_FRIEND':
      return {
        ...state,
        friends: methods.removeFriend(state.friends, action.payload),
      }

    default:
      return state
  }
}

import { dispatchHelper } from '../utils/utils'

export const getFriendStatus = user_id =>
  dispatchHelper('GET_FRIEND_STATUS', 'check-friend-status', { user_id })

export const getFriends = user =>
  dispatchHelper('GET_FRIENDS', 'get-friends', { user })

export const setFriendStatus = status => ({
  type: 'SET_FRIEND_STATUS',
  payload: status,
})

export const removeFriend = friend_id => ({
  type: 'REMOVE_FRIEND',
  payload: friend_id,
})

import { post } from 'axios'
import Notify from 'handy-notification'
import * as friendA from '../actions/friend'

const setNoneStatus = dispatch =>
  dispatch(
    friendA.setFriendStatus({
      status: 'none',
      request_id: 0,
      is_sender: false,
    })
  )

export const sendFriendRequest = async options => {
  let defaults = {
    to_user: null,
    dispatch: () => null,
    update_status: false,
    done: () => null,
  }
  let obj = { ...defaults, ...options }
  let { to_user, dispatch, update_status, done } = obj

  let { data } = await post('/api/send-friend-request', { to_user })

  if (data.success) {
    if (update_status) {
      dispatch(
        friendA.setFriendStatus({
          status: 'pending',
          request_id: data.request_id,
          is_sender: true,
        })
      )
    }
    done(data)
  }

  Notify({ value: data.mssg })
  return data
}

export const acceptFriendRequest = async options => {
  let defaults = {
    request_id: null,
    dispatch: () => null,
    update_status: false,
    done: () => null,
  }
  let obj = { ...defaults, ...options }
  let { request_id, dispatch, update_status, done } = obj

  let { data } = await post('/api/accept-friend-request', { request_id })

  if (data.success) {
    if (update_status) {
      dispatch(
        friendA.setFriendStatus({
          status: 'accepted',
          request_id,
          is_sender: false,
        })
      )
    }
    done(data)
  }

  Notify({ value: data.mssg })
  return data
}

export const rejectFriendRequest = async options => {
  let defaults = {
    request_id: null,
    dispatch: () => null,
    update_status: false,
    done: () => null,
  }
  let obj = { ...defaults, ...options }
  let { request_id, dispatch, update_status, done } = obj

  let { data } = await post('/api/reject-friend-request', { request_id })

  if (data.success) {
    if (update_status) {
      setNoneStatus(dispatch)
    }
    done(data)
  }

  Notify({ value: data.mssg })
  return data
}

export const cancelFriendRequest = async options => {
  let defaults = {
    request_id: null,
    dispatch: () => null,
    update_status: false,
    done: () => null,
  }
  let obj = { ...defaults, ...options }
  let { request_id, dispatch, update_status, done } = obj

  let { data } = await post('/api/cancel-friend-request', { request_id })

  if (data.success) {
    if (update_status) {
      setNoneStatus(dispatch)
    }
    done(data)
  }

  Notify({ value: data.mssg })
  return data
}

export const unfriend = async options => {
  let defaults = {
    user_id: null,
    friend_id: null,
    dispatch: () => null,
    update_status: false,
    update_list: false,
    done: () => null,
  }
  let obj = { ...defaults, ...options }
  let {
    user_id,
    friend_id,
    dispatch,
    update_status,
    update_list,
    done,
  } = obj

  let { data } = await post('/api/unfriend', { user_id })

  if (data.success) {
    if (update_status) {
      setNoneStatus(dispatch)
    }
    if (update_list) {
      dispatch(friendA.removeFriend(friend_id || user_id))
    }
    done(data)
  }

  Notify({ value: data.mssg })
  return data
}

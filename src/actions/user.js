import { dispatchHelper } from '../utils/utils'

export const getUserDetails = username =>
  dispatchHelper('GET_USER_DETAILS', 'get-user-details', { username })

export const deleteTag = tag => {
  return {
    type: 'DELETE_TAG',
    payload: tag,
  }
}

export const addTag = tag => {
  return {
    type: 'ADD_TAG',
    payload: tag,
  }
}

export const getMutualUsers = username =>
  dispatchHelper('GET_MUTUAL_USERS', 'get-mutual-users', { username })

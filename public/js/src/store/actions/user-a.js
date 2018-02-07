import { post } from 'axios'

export const getUserDetails = username => {
  return dispatch => {
    post('/api/get-user-details', { username })
      .then(s => dispatch({ type: 'GET_USER_DETAILS', payload: s.data }) )
      .catch(e => console.log(e))
  }
}

export const deleteTag = tag => {
  return {
    type: 'DELETE_TAG',
    payload: tag
  }
}

export const addTag = tag => {
  return {
    type: 'ADD_TAG',
    payload: tag
  }
}

export const getMutualUsers = username => {
  return dispatch => {
    post('/api/get-mutual-users', { username })
      .then(s => dispatch({ type: 'GET_MUTUAL_USERS', payload: s.data }) )
      .catch(e => console.log(e))
  }
}

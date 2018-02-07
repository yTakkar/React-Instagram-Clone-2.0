import { post } from 'axios'

export const getUsersToExplore = () => {
  return dispatch => {
    post('/api/get-users-to-explore')
      .then(p => dispatch({ type: 'GET_USERS_TO_EXPLORE', payload: p.data }))
      .catch(e => console.log(e))
  }
}

export const getPhotosToExplore = () => {
  return dispatch => {
    post('/api/get-photos-to-explore')
      .then(p => dispatch({ type: 'GET_PHOTOS_TO_EXPLORE', payload: p.data }))
      .catch(e => console.log(e))
  }
}

export const getGroupsToExplore = () => {
  return dispatch => {
    post('/api/get-groups-to-explore')
      .then(p => dispatch({ type: 'GET_GROUPS_TO_EXPLORE', payload: p.data }))
      .catch(e => console.log(e))
  }
}

export const getSuggestedUsers = () => {
  return dispatch => {
    post('/api/get-suggested-users')
      .then(p => dispatch({ type: 'GET_SUGGESTED_USERS', payload: p.data }))
      .catch(e => console.log(e))
  }
}

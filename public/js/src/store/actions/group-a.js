import { post } from 'axios'

export const getGroupDetails = grp_id => {
  return dispatch => {
    post('/api/get-group-details', { grp_id })
      .then(p => dispatch({ type: 'GET_GROUP_DETAILS', payload: p.data }))
      .catch(e => console.log(e))
  }
}

export const joinedGroup = group => {
  return dispatch => {
    post('/api/joined-group', { group })
      .then(p => dispatch({ type: 'JOINED_GROUP', payload: p.data }))
      .catch(e => console.log(e))
  }
}

export const toggleJoinGroup = j => {
  return {
    type: 'TOGGLE_JOIN_GROUP',
    payload: j
  }
}

export const updateGroup = gd => {
  return {
    type: 'UPDATE_GROUP',
    payload: gd
  }
}

export const getGroupMembers = grp_id => {
  return dispatch => {
    post('/api/get-group-members', { grp_id })
      .then(p => dispatch({ type: 'GET_GROUP_MEMBERS', payload: p.data }))
      .catch(e => console.log(e))
  }
}

export const removeMember = member_id => {
  return {
    type: 'REMOVE_MEMBER',
    payload: member_id
  }
}

export const getMutualAndNewestMembers = grp_id => {
  return dispatch => {
    post('/api/get-mutual-newest-members', { grp_id })
      .then(p => dispatch({ type: 'GET_MUTUAL_AND_NEWEST_MEMBERS', payload: p.data }))
      .catch(e => console.log(e))
  }
}

export const getUserGroups = user => {
  return dispatch => {
    post('/api/get-user-groups', { user })
      .then(p => dispatch({ type: 'GET_USER_GROUPS', payload: p.data }))
      .catch(e => console.log(e))
  }
}

export const leftGroup = group_id => {
  return {
    type: 'LEFT_GROUP',
    payload: group_id
  }
}

export const getUsersToInvite = () => {
  return dispatch => {
    post('/api/get-users-to-invite')
      .then(p => dispatch({ type: 'GET_USERS_TO_INVITE', payload: p.data }))
      .catch(e => console.log(e))
  }
}

export const getUsersToMakeAdmin = grp_id => {
  return dispatch => {
    post('/api/get-users-to-make-admin', { grp_id })
      .then(p => dispatch({ type: 'GET_USERS_TO_MAKE_ADMIN', payload: p.data }))
      .catch(e => console.log(e))
  }
}

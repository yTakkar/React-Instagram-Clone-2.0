import { post } from 'axios'

export const getBlockedUsers = () => {
  return dispatch => {
    post('/api/get-blocked-users')
      .then(n => dispatch({ type: 'GET_BLOCKED_USERS', payload: n.data }) )
      .catch(e => console.log(e) )
  }
}

export const unblockUser = block_id => {
  return {
    type: 'UNBLOCK_USER',
    payload: block_id
  }
}

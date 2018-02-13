/* eslint indent:0 */
/* eslint no-unreachable:0 */

const set_def = {
  blockedUsers: []
}

export default (state=set_def, action) => {
  let py = action.payload

  switch(action.type) {
    case 'GET_BLOCKED_USERS':
      return { ...state, blockedUsers: py }
      break

    case 'UNBLOCK_USER':
      return { ...state, blockedUsers: unblockU(state.blockedUsers, py) }
      break
  }

  return state
}

const unblockU = (users, block_id) =>
  users.filter(u => u.block_id != block_id)

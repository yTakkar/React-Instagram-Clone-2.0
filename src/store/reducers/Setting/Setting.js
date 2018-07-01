/* eslint indent:0 */
/* eslint no-unreachable:0 */

import initialState from './initialState'
import * as methods from './methods'

export default (state = initialState, action) => {
  let py = action.payload

  switch (action.type) {
    case 'GET_BLOCKED_USERS':
      return { ...state, blockedUsers: py }
      break

    case 'UNBLOCK_USER':
      return {
        ...state,
        blockedUsers: methods.unblockU(state.blockedUsers, py),
      }
      break
  }

  return state
}

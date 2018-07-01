/* eslint indent:0 */
/* eslint no-unreachable:0 */

import initialState from './initialState'

export default (state = initialState, action) => {
  let py = action.payload

  switch (action.type) {
    case 'GET_NOTIFICATIONS':
      return { ...state, notifications: py }
      break

    case 'CLEAR_NOTIFICATIONS':
      return { ...state, notifications: [] }
      break

    case 'GET_UNREAD_NOTIFICATIONS':
      return { ...state, unreadNotifications: py }
      break

    case 'READ_NOTIFICATIONS':
      return { ...state, unreadNotifications: 0 }
      break
  }

  return state
}

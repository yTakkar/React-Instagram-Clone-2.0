/* eslint indent:0 */
/* eslint no-unreachable:0 */

import InitialState from './intialState'
import * as methods from './methods'

export default (state = InitialState, action) => {
  let py = action.payload

  switch (action.type) {
    case 'GET_USER_DETAILS':
      return {
        ...state,
        user_details: py.details,
        tags: py.tags,
      }
      break

    case 'ADD_TAG':
      return { ...state, tags: methods.addTag(state.tags, py) }
      break

    case 'DELETE_TAG':
      return { ...state, tags: methods.deleteTag(state.tags, py) }
      break

    case 'GET_MUTUAL_USERS':
      return { ...state, mutualUsers: py }
      break
  }

  return state
}

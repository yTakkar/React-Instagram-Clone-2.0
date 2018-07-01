/* eslint indent:0 */
/* eslint no-unreachable:0 */

import initialState from './initialState'
import * as methods from './methods'

export default (state = initialState, action) => {
  let py = action.payload

  switch (action.type) {
    case 'GET_GROUP_DETAILS':
      return { ...state, group_details: py }
      break

    case 'JOINED_GROUP':
      return { ...state, joined: py }
      break

    case 'TOGGLE_JOIN_GROUP':
      return { ...state, joined: py }
      break

    case 'UPDATE_GROUP':
      return {
        ...state,
        group_details: methods.update(state.group_details, py),
      }
      break

    case 'GET_GROUP_MEMBERS':
      return { ...state, members: py }
      break

    case 'REMOVE_MEMBER':
      return {
        ...state,
        members: methods.remMember(state.members, py),
      }
      break

    case 'GET_MUTUAL_AND_NEWEST_MEMBERS':
      return {
        ...state,
        mutualMembers: py.mutualMembers,
        newestMembers: py.newestMembers,
      }
      break

    case 'GET_USER_GROUPS':
      return { ...state, userGroups: py }
      break

    case 'LEFT_GROUP':
      return {
        ...state,
        userGroups: methods.leftGroup(state.userGroups, py),
      }
      break

    case 'GET_USERS_TO_INVITE':
      return { ...state, usersToInvite: py }
      break

    case 'GET_USERS_TO_MAKE_ADMIN':
      return { ...state, usersToMakeAdmin: py }
      break
  }

  return state
}

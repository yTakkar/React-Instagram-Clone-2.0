/* eslint indent:0 */
/* eslint no-unreachable:0 */

const exp_def = {
  users: [],
  photos: [],
  groups: [],
  suggested: []
}

export default (state=exp_def, action) => {
  let py = action.payload

  switch (action.type) {
    case 'GET_USERS_TO_EXPLORE':
      return { ...state, users: py }
      break

    case 'GET_PHOTOS_TO_EXPLORE':
      return { ...state, photos: py }
      break

    case 'GET_GROUPS_TO_EXPLORE':
      return { ...state, groups: py }
      break

    case 'GET_SUGGESTED_USERS':
      return { ...state, suggested: py }
      break
  }

  return state
}

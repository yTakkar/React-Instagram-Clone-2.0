/* eslint indent:0 */
/* eslint no-unreachable:0 */

import { uniqBy } from 'lodash'

const def_user = {
  user_details: {},
  tags: [],
  mutualUsers: []
}

export default (state=def_user, action) => {
  let py = action.payload

  switch (action.type) {
    case 'GET_USER_DETAILS':
      return {
        ...state,
        user_details: py.details,
        tags: py.tags
      }
      break

    case 'ADD_TAG':
      return { ...state, tags: addTag(state.tags, py) }
      break

    case 'DELETE_TAG':
      return { ...state, tags: deleteTag(state.tags, py) }
      break

    case 'GET_MUTUAL_USERS':
      return { ...state, mutualUsers: py }
      break
  }

  return state
}

const addTag = (tags, t) => {
  tags.unshift(t)
  return uniqBy(tags, 'tag')
}

const deleteTag = (tags, value) =>
  tags.filter(t => t.tag != value)

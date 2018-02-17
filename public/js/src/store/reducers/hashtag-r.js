/* eslint indent:0 */
/* eslint no-unreachable:0 */

const hashtag_def = {
  userHashtags: [],
  groupHashtags: [],
  popularHashtags: [],
  hashtagPosts: []
}

export default (state=hashtag_def, action) => {
  let py = action.payload

  switch(action.type) {
    case 'GET_USER_HASHTAGS':
      return { ...state, userHashtags: py }
      break

    case 'GET_GROUP_HASHTAGS':
      return { ...state, groupHashtags: py }
      break

    case 'GET_POPULAR_HASHTAGS':
      return { ...state, popularHashtags: py }
      break

    case 'GET_HASHTAG_POSTS':
      return { ...state, hashtagPosts: py }
      break
  }

  return state
}

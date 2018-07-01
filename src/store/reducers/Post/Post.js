/* eslint indent:0 */
/* eslint no-unreachable:0 */

import initialState from './initialState'
import * as methods from './methods'

export default (state = initialState, action) => {
  let py = action.payload

  switch (action.type) {
    case 'GET_USER_POSTS':
      return { ...state, posts: py }
      break

    case 'GET_BOOKMARKED_POSTS':
      return { ...state, bookmarks: py }
      break

    case 'GET_TAGGED_POSTS':
      return { ...state, tagged: py }
      break

    case 'GET_SHARED_POSTS':
      return { ...state, shared: py }
      break

    case 'GET_PHOTOS':
      return { ...state, photos: py }
      break

    case 'GET_FEED':
      return { ...state, feed: py }
      break

    case 'GET_GROUP_POSTS':
      return { ...state, posts: py }
      break

    case 'GET_GROUP_PHOTOS':
      return { ...state, photos: py }
      break

    case 'GET_POST':
      return { ...state, viewPost: py }
      break

    case 'ADD_USER_POST':
      return {
        ...state,
        feed: methods.addPost(state.feed, py),
      }
      break

    case 'ADD_GROUP_POST':
      return {
        ...state,
        posts: methods.addPost(state.posts, py),
      }
      break

    case 'EDIT_POST':
      return {
        ...state,
        posts: methods.editPost(state.posts, py),
      }
      break

    case 'DELETE_POST':
      return {
        ...state,
        posts: methods.deletePost(state.posts, py),
        feed: methods.deletePost(state.feed, py),
      }
      break

    case 'GET_POST_LIKES':
      return {
        ...state,
        likes: py.likes,
        isPostMine: py.isPostMine,
      }
      break

    case 'REMOVE_LIKE':
      return {
        ...state,
        likes: methods.removeLike(state.likes, py),
      }
      break

    case 'GET_POST_TAGS':
      return {
        ...state,
        tags: py.tags,
        isPostMine: py.isPostMine,
      }
      break

    case 'UNTAG':
      return {
        ...state,
        tags: methods.untag(state.tags, py),
      }
      break

    case 'GET_USERS_TO_SHARE':
      return { ...state, usersToShare: py }
      break

    case 'GET_POST_SHARERS':
      return { ...state, sharers: py }
      break

    case 'UNBOOKMARK':
      return {
        ...state,
        bookmarks: methods.unbookmark(state.bookmarks, py),
      }
      break

    case 'REMOVE_SHARE':
      return {
        ...state,
        sharers: methods.removeShare(state.sharers, py),
      }
      break

    case 'COMMENT':
      return {
        ...state,
        viewPost: methods.comment(state.viewPost, py),
      }
      break

    case 'DELETE_COMMENT':
      return {
        ...state,
        viewPost: methods.deleteComment(state.viewPost, py),
      }
      break

    case 'EDIT_COMMENT':
      return {
        ...state,
        viewPost: methods.editComment(state.viewPost, py),
      }
      break

    // Post It
    case 'CHANGE_POSTIT_PROPS':
      return {
        ...state,
        postIt: methods.changePostIt(state.postIt, py),
      }

    case 'RESET_POSTIT':
      return {
        ...state,
        postIt: methods.resetPostItProperties(),
      }
  }

  return state
}

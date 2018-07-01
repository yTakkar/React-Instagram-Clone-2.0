/* eslint indent:0 */
/* eslint no-unreachable:0 */

import initialState from './initialState'
import * as methods from './methods'

export default (state = initialState, action) => {
  let py = action.payload

  switch (action.type) {
    case 'IS_FOLLOWING':
      return { ...state, isFollowing: py }
      break

    case 'FOLLOW_TOGGLE':
      return { ...state, isFollowing: py }
      break

    case 'GET_USER_STATS':
      return {
        ...state,
        followers: py.followers,
        followings: py.followings,
        profile_views: py.views_count,
        favourites: py.favourites,
        recommendations: py.recommendations,
      }
      break

    case 'GET_FOLLOWERS':
      return { ...state, followers: py }

    case 'GET_FOLLOWINGS':
      return { ...state, followings: py }

    case 'FOLLOWER':
      return {
        ...state,
        followers: methods.follower(state.followers, py),
      }
      break

    case 'UNFOLLOWER':
      return {
        ...state,
        followers: methods.unfollower(state.followers, py),
      }
      break

    case 'FOLLOWING':
      return {
        ...state,
        followings: methods.following(state.followings, py),
      }
      break

    case 'UNFOLLOWING':
      return {
        ...state,
        followings: methods.unfollowing(state.followings, py),
      }
      break

    case 'REMOVE_FAVOURITES':
      return {
        ...state,
        favourites: methods.remFav(state.favourites, py),
      }
      break

    case 'USERS_TO_RECOMMEND':
      return { ...state, usersToRecommend: py }
      break

    case 'REMOVE_RECOMMENDATION':
      return {
        ...state,
        recommendations: methods.remRec(state.recommendations, py),
      }
      break
  }
  return state
}

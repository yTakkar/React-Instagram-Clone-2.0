/* eslint indent:0 */
/* eslint no-unreachable:0 */

const follow_def = {
  isFollowing: false,
  followers: [],
  followings: [],
  profile_views: 0,
  favourites: [],
  usersToRecommend: [],
  recommendations: []
}

export default (state=follow_def, action) => {
  let py = action.payload

  switch(action.type) {
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
        recommendations: py.recommendations
      }
      break

    case 'GET_FOLLOWERS':
      return { ...state, followers: py }

    case 'GET_FOLLOWINGS':
      return { ...state, followings: py }

    case 'FOLLOWER':
      return { ...state, followers: follower(state.followers, py) }
      break

    case 'UNFOLLOWER':
      return { ...state, followers: unfollower(state.followers, py) }
      break

    case 'FOLLOWING':
      return { ...state, followings: following(state.followings, py) }
      break

    case 'UNFOLLOWING':
      return { ...state, followings: unfollowing(state.followings, py) }
      break

    case 'REMOVE_FAVOURITES':
      return { ...state, favourites: remFav(state.favourites, py) }
      break

    case 'USERS_TO_RECOMMEND':
      return { ...state, usersToRecommend: py }
      break

    case 'REMOVE_RECOMMENDATION':
      return { ...state, recommendations: remRec(state.recommendations, py) }
      break

  }
  return state
}

const follower = (followers, n) => {
  followers.unshift(n)
  return followers
}

const unfollower = (followers, n) =>
  followers.filter(ff => ff.follow_by != parseInt(n))

const following = (followings, n) => {
  followings.unshift(n)
  return followings
}

const unfollowing = (followings, n) =>
  followings.filter(ff => ff.follow_to !== parseInt(n))

const remFav = (favs, user) =>
  favs.filter(f => f.user != user)

const remRec = (recommends, recommend_id) =>
  recommends.filter(r => r.recommend_id != parseInt(recommend_id))

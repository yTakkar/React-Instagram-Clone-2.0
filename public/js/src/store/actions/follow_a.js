import { post } from 'axios'

export const isFollowing = username => {
  return dispatch => {
    post('/api/is-following', { username })
      .then(s => dispatch({ type: 'IS_FOLLOWING', payload: s.data }) )
      .catch(e => console.log(e))
  }
}

export const getUserStats = username => {
  return dispatch => {
    post('/api/get-user-stats', { username })
      .then(s => dispatch({ type: 'GET_USER_STATS', payload: s.data }) )
      .catch(e => console.log(e))
  }
}

export const getFollowers = user => {
  return dispatch => {
    post('/api/get-followers', { user })
      .then(s => dispatch({ type: 'GET_FOLLOWERS', payload: s.data }) )
      .catch(e => console.log(e))
  }
}

export const getFollowings = user => {
  return dispatch => {
    post('/api/get-followings', { user })
      .then(s => dispatch({ type: 'GET_FOLLOWINGS', payload: s.data }) )
      .catch(e => console.log(e))
  }
}

export const toggleFollow = f => {
  return {
    type: 'FOLLOW_TOGGLE',
    payload: f
  }
}

export const Follower = follower => {
  return {
    type: 'FOLLOWER',
    payload: follower
  }
}

export const Unfollower = unfollower => {
  return {
    type: 'UNFOLLOWER',
    payload: unfollower
  }
}

export const Following = following => {
  return {
    type: 'FOLLOWING',
    payload: following
  }
}

export const Unfollowing = unfollowing => {
  return {
    type: 'UNFOLLOWING',
    payload: unfollowing
  }
}

export const removeFavourites = fav_id => {
  return {
    type: 'REMOVE_FAVOURITES',
    payload: fav_id
  }
}

export const getUsersToRecommend = user => {
  return dispatch => {
    post('/api/get-users-to-recommend', { user })
      .then(s => dispatch({ type: 'USERS_TO_RECOMMEND', payload: s.data }) )
      .catch(e => console.log(e))
  }
}

export const removeRecommendation = recommend_id => {
  return {
    type: 'REMOVE_RECOMMENDATION',
    payload: recommend_id
  }
}

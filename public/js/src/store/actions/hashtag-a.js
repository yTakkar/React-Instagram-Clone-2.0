import { post } from 'axios'

export const getUserHashtags = username => {
  return dispatch => {
    post('/api/get-users-hashtags', { username })
      .then(p => dispatch({ type: 'GET_USER_HASHTAGS', payload: p.data }))
      .catch(e => console.log(e))
  }
}

export const getGroupHashtags = group_id => {
  return dispatch => {
    post('/api/get-group-hashtags', { group_id })
      .then(p => dispatch({ type: 'GET_GROUP_HASHTAGS', payload: p.data }))
      .catch(e => console.log(e))
  }
}

export const getPopularHashtags = () => {
  return dispatch => {
    post('/api/get-popular-hashtags')
      .then(p => dispatch({ type: 'GET_POPULAR_HASHTAGS', payload: p.data }))
      .catch(e => console.log(e))
  }
}

export const getHashtagPosts = hashtag => {
  return dispatch => {
    post('/api/get-hashtag-posts', { hashtag })
      .then(p => dispatch({ type: 'GET_HASHTAG_POSTS', payload: p.data }))
      .catch(e => console.log(e))
  }
}

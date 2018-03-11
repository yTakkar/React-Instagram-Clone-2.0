import { post } from 'axios'

export const getUserPosts = username => {
  return dispatch => {
    post('/api/get-user-posts', { username })
      .then(p => dispatch({ type: 'GET_USER_POSTS', payload: p.data }))
      .catch(e => console.log(e))
  }
}

export const getBookmarkedPosts = user => {
  return dispatch => {
    post('/api/get-bookmarked-posts', { user })
      .then(p => dispatch({ type: 'GET_BOOKMARKED_POSTS', payload: p.data }))
      .catch(e => console.log(e))
  }
}

export const getTaggedPosts = user => {
  return dispatch => {
    post('/api/get-tagged-posts', { user })
      .then(p => dispatch({ type: 'GET_TAGGED_POSTS', payload: p.data }))
      .catch(e => console.log(e))
  }
}

export const getSharedPosts = user => {
  return dispatch => {
    post('/api/get-shared-posts', { user })
      .then(p => dispatch({ type: 'GET_SHARED_POSTS', payload: p.data }))
      .catch(e => console.log(e))
  }
}

export const getPhotos = user => {
  return dispatch => {
    post('/api/get-photos', { user })
      .then(p => dispatch({ type: 'GET_PHOTOS', payload: p.data }))
      .catch(e => console.log(e))
  }
}

export const getFeed = () => {
  return dispatch => {
    post('/api/get-feed')
      .then(p => dispatch({ type: 'GET_FEED', payload: p.data }))
      .catch(e => console.log(e))
  }
}

export const getGroupPosts = group => {
  return dispatch => {
    post('/api/get-group-posts', { group })
      .then(p => dispatch({ type: 'GET_GROUP_POSTS', payload: p.data }))
      .catch(e => console.log(e))
  }
}

export const addUserPost = post => {
  return {
    type: 'ADD_USER_POST',
    payload: post
  }
}

export const addGroupPost = post => {
  return {
    type: 'ADD_GROUP_POST',
    payload: post
  }
}

export const getGroupPhotos = group => {
  return dispatch => {
    post('/api/get-group-photos', { group })
      .then(p => dispatch({ type: 'GET_GROUP_PHOTOS', payload: p.data }))
      .catch(e => console.log(e))
  }
}

export const getPost = post_id => {
  return dispatch => {
    post('/api/get-post', { post_id })
      .then(p => dispatch({ type: 'GET_POST', payload: p.data }))
      .catch(e => console.log(e))
  }
}

export const editPost = post_d => {
  return {
    type: 'EDIT_POST',
    payload: post_d
  }
}

export const deletePost = post => {
  return {
    type: 'DELETE_POST',
    payload: post
  }
}

export const getPostLikes = post_id => {
  return dispatch => {
    post('/api/get-post-likes', { post: post_id })
      .then(p => dispatch({ type: 'GET_POST_LIKES', payload: p.data }))
      .catch(e => console.log(e))
  }
}

export const removeLike = like_id => {
  return dispatch => {
    post('/api/remove-like', { like_id })
      .then(() => dispatch({ type: 'REMOVE_LIKE', payload: like_id }))
      .catch(e => console.log(e))
  }
}

export const getPostTags = post_id => {
  return dispatch => {
    post('/api/get-post-tags', { post: post_id })
      .then(p => dispatch({ type: 'GET_POST_TAGS', payload: p.data }))
      .catch(e => console.log(e))
  }
}

export const untag = user => {
  return {
    type: 'UNTAG',
    payload: user
  }
}

export const getUserToShare = post_id => {
  return dispatch => {
    post('/api/get-users-to-share', { post: post_id })
      .then(p => dispatch({ type: 'GET_USERS_TO_SHARE', payload: p.data }))
      .catch(e => console.log(e))
  }
}

export const getPostSharers = post_id => {
  return dispatch => {
    post('/api/get-post-sharers', { post: post_id })
      .then(p => dispatch({ type: 'GET_POST_SHARERS', payload: p.data }))
      .catch(e => console.log(e))
  }
}

export const unbookmark = post => {
  return {
    type: 'UNBOOKMARK',
    payload: post
  }
}

export const removeShare = share_id => {
  return {
    type: 'REMOVE_SHARE',
    payload: share_id
  }
}

export const comment = comment => {
  return {
    type: 'COMMENT',
    payload: comment
  }
}

export const deleteComment = comment_id => {
  return {
    type: 'DELETE_COMMENT',
    payload: comment_id
  }
}

export const editComment = comment => {
  return {
    type: 'EDIT_COMMENT',
    payload: comment
  }
}

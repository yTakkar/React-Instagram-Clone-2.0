import { dispatchHelper } from '../../utils/utils'

export const getUserPosts = username =>
  dispatchHelper('GET_USER_POSTS', 'get-user-posts', { username })

export const getBookmarkedPosts = user =>
  dispatchHelper('GET_BOOKMARKED_POSTS', 'get-bookmarked-posts', { user })

export const getTaggedPosts = user =>
  dispatchHelper('GET_TAGGED_POSTS', 'get-tagged-posts', { user })

export const getSharedPosts = user =>
  dispatchHelper('GET_SHARED_POSTS', 'get-shared-posts', { user })

export const getPhotos = user =>
  dispatchHelper('GET_PHOTOS', 'get-photos', { user })

export const getFeed = () =>
  dispatchHelper('GET_FEED', 'get-feed')

export const getGroupPosts = group =>
  dispatchHelper('GET_GROUP_POSTS', 'get-group-posts', { group })

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

export const getGroupPhotos = group =>
  dispatchHelper('GET_GROUP_PHOTOS', 'get-group-photos', { group })

export const getPost = post_id =>
  dispatchHelper('GET_POST', 'get-post', { post_id })

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

export const getPostLikes = post_id =>
  dispatchHelper('GET_POST_LIKES', 'get-post-likes', { post_id })

export const removeLike = like_id =>
  dispatchHelper('REMOVE_LIKE', 'remove-like', { like_id })

export const getPostTags = post_id =>
  dispatchHelper('GET_POST_TAGS', 'get-post-tags', { post_id })

export const untag = user => {
  return {
    type: 'UNTAG',
    payload: user
  }
}

export const getUserToShare = post_id =>
  dispatchHelper('GET_USERS_TO_SHARE', 'get-users-to-share', { post_id })

export const getPostSharers = post_id =>
  dispatchHelper('GET_POST_SHARERS', 'get-post-sharers', { post_id })

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

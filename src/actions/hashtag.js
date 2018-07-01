import { dispatchHelper } from '../utils/utils'

export const getUserHashtags = username =>
  dispatchHelper('GET_USER_HASHTAGS', 'get-users-hashtags', { username })

export const getGroupHashtags = group_id =>
  dispatchHelper('GET_GROUP_HASHTAGS', 'get-group-hashtags', { group_id })

export const getPopularHashtags = () =>
  dispatchHelper('GET_POPULAR_HASHTAGS', 'get-popular-hashtags')

export const getHashtagPosts = hashtag =>
  dispatchHelper('GET_HASHTAG_POSTS', 'get-hashtag-posts', { hashtag })

/* eslint indent:0 */
/* eslint no-unreachable:0 */

const post_def = {
  posts:[],
  bookmarks: [],
  tagged: [],
  shared: [],
  photos: [],
  feed: [],
  viewPost: {},
  likes: [],
  tags: [],
  posted: false,
  isPostMine: false,
  usersToShare: [],
  sharers: []
}

export default (state=post_def, action) => {
  let py = action.payload

  switch(action.type) {
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
      return { ...state, feed: addPost(state.feed, py) }
      break

    case 'ADD_GROUP_POST':
      return { ...state, posts: addPost(state.posts, py) }
      break

    case 'EDIT_POST':
      return { ...state, posts: editPost(state.posts, py) }
      break

    case 'DELETE_POST':
      return { ...state, posts: deletePost(state.posts, py) }
      break

    case 'GET_POST_LIKES':
      return { ...state, likes: py.likes, isPostMine: py.isPostMine }
      break

    case 'GET_POST_TAGS':
      return { ...state, tags: py.tags, isPostMine: py.isPostMine }
      break

    case 'UNTAG':
      return { ...state, tags: untag(state.tags, py) }
      break

    case 'GET_USERS_TO_SHARE':
      return { ...state, usersToShare: py }
      break

    case 'GET_POST_SHARERS':
      return { ...state, sharers: py }
      break

    case 'UNBOOKMARK':
      return { ...state, bookmarks: unbookmark(state.bookmarks, py) }
      break

    case 'REMOVE_SHARE':
      return { ...state, sharers: removeShare(state.sharers, py) }
      break

    case 'COMMENT':
      return { ...state, viewPost: comment(state.viewPost, py) }
      break

    case 'DELETE_COMMENT':
      return { ...state, viewPost: deleteComment(state.viewPost, py) }
      break

    case 'EDIT_COMMENT':
      return { ...state, viewPost: editComment(state.viewPost, py) }
      break
  }

  return state
}

const addPost = (posts, post) => {
  posts = [ post, ...posts ]
  return posts
}

const editPost = (posts, { post_id, description }) => {
  return posts.map(p => {
    if(p.post_id == post_id) {
      p.description = description
    }
    return p
  })
}

const deletePost = (posts, post) =>
  posts.filter(p => p.post_id != parseInt(post))

const untag = (tags, user) => {
  let tt = tags.filter(t => t.user != user)
  return tt
}

const unbookmark = (bookmarks, post) =>
  bookmarks.filter(b => b.post_id != post)

const removeShare = (sharers, share_id) =>
  sharers.filter(s => s.share_id != share_id)

const comment = (post, comment) => {
  post = { ...post, comments: [ comment, ...post.comments ] }
  return post
}

const deleteComment = (post, comment_id) => {
  let comments = post.comments.filter(c => c.comment_id != comment_id)
  return {
    ...post,
    comments
  }
}

const editComment = (post, { comment_id, comment }) => {
  let comments = post.comments.map(c => {
    if (c.comment_id == comment_id) {
      c.text = comment
    }
    return c
  })

  return {
    ...post,
    comments
  }
}

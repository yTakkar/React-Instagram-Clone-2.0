import $ from 'jquery'
import { post } from 'axios'
import Notify from 'handy-notification'
import { addGroupPost, comment, addUserPost } from '../store/actions/post-a'
import { imageCompressor, insta_notify, Me } from './utils'

/** ADDPOST */
export const addPost = async options => {
  let
    { dispatch, desc, targetFile, filter, location, type, group, group_name, tags } = options,
    user = $('.data').data('session'),
    username = $('.data').data('username'),
    form = new FormData(),
    file = await imageCompressor(targetFile)

  form.append('desc', desc)
  form.append('image', file)
  form.append('filter', filter)
  form.append('location', location)
  form.append('type', type)
  form.append('group', group)

  let { data: { post_id, firstname, surname, filename } } = await post('/api/post-it', form)
  await post('/api/tag-post', { tags, post_id })

  tags.forEach(async t => {
    await insta_notify({
      to: t.user,
      type: 'tag',
      post_id: post_id
    })
  })

  let newPost = {
    key: post_id,
    comments_count: 0,
    likes_count: 0,
    shares_count: 0,
    tags_count: tags.length,
    user,
    username,
    firstname,
    surname,
    description: desc,
    filter,
    imgSrc: filename,
    location,
    post_time: new Date().getTime(),
    post_id,
    group_id: 0,
    group_name: '',
    type: 'user',
  }

  type == 'user'
    ? dispatch(addUserPost({
      ...newPost,
      when: 'feed'
    }))
    : dispatch(addGroupPost({
      ...newPost,
      group_id: group,
      group_name,
      type: 'group',
      when: 'groupPosts'
    }))

  Notify({ value: 'Posted!!' })
}

/** IMAGE COMMENT */
export const imageComment = async options => {
  let
    { post_id, dispatch, when, user, file: commentFile } = options,
    session = $('.data').data('session'),
    username = $('.data').data('username'),
    form = new FormData(),
    file = await imageCompressor(commentFile)

  $('.overlay-2').show()
  Notify({ value: 'Please wait..' })

  form.append('commentImage', file)
  form.append('post', post_id)

  let { data: { filename, comment_id } } = await post('/api/comment-image', form)

  if (when == 'viewPost') {
    dispatch(comment({
      comment_id,
      comment_by: session,
      comment_by_username: username,
      type: 'image',
      commentSrc: filename,
      post_id,
      comment_time: new Date().getTime()
    }))
  }

  if (!Me(user)) {
    insta_notify({
      to: user,
      type: 'comment',
      post_id
    })
  }

  $('.overlay-2').hide()
  Notify({ value: 'Commented!!' })
}

/** STICKER COMMENT */
export const stickerComment = async options => {
  let
    { sticker, post_id, user, when, dispatch } = options,
    session = $('.data').data('session'),
    username = $('.data').data('username'),
    { data:
      { comment_id, filename }
    } = await post('/api/comment-sticker', { sticker: sticker, post: post_id })

  if (when == 'viewPost') {
    dispatch(comment({
      comment_id,
      comment_by: session,
      comment_by_username: username,
      type: 'sticker',
      commentSrc: filename,
      post_id,
      comment_time: new Date().getTime()
    }))
  }

  if (!Me(user)) {
    insta_notify({
      to: user,
      type: 'comment',
      post_id
    })
  }

  Notify({ value: 'Commented!!' })
}

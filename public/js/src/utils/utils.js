import $ from 'jquery'
import { post } from 'axios'
import Notify from 'handy-notification'
import { getUserDetails, getMutualUsers } from '../store/actions/user-a'
import * as follow_action from '../store/actions/follow_a'
import { getUserPosts, getGroupPosts, } from '../store/actions/post-a'
import { getGroupDetails, joinedGroup } from '../store/actions/group-a'
import Compress from 'image-compressor.js'

/**
 *  Shortens what with string length
 * @param {String} what
 * @param {Number} length
 */
export const shortener = (what, length) => {
  let
    parse = parseInt(length),
    len = what.length
  if (!parse) { return }
  return (len >= parse) ? `${what.substr(0, length - 2)}..` : (len < parse) ? what : null
}

/**
 * Returns unique string, useful for key
 */
export const uniq = () =>
  Math.random().toString(5).slice(2)

/**
 * Returns human-readable text
 *
 * @param {Number} value
 * @param {String} text
 */
export const humanReadable = (value, text) => {
  let hr =
    value == 0 ? `No ${text}s`
      : value == 1 ? `1 ${text}`
        : `${value} ${text}s`
  return hr
}

/**
 * Toggles the element
 * @param {HTMLElement} el element to toggle
 */
export const toggle = el => {
  let style = el.style.display
  style === 'none' ? el.style.display = 'block' : el.style.display = 'none'
}

/**
 * Capitalizes str
 * @param {String} str
 */
export const c_first = str =>
  str.charAt(0).toUpperCase() + str.substr(1)

/**
 * Removes hr of last element of modal
 */
export const llr = () => {
  let
    f = $('.modal_main').children(),
    s = $('.display_content').children().length - 1
  f.eq(s).find('hr').remove()
}

/**
 * Toggle show password
 */
export const viewPassword = ({ input, icon }) => {
  if (input.type == 'password') {
    input.type = 'text'
    icon.html('<i class="fa fa-unlock-alt" aria-hidden="true"></i>')
    icon.css('color', '#e91e63')
  } else {
    input.type = 'password'
    icon.html('<i class="fa fa-lock" aria-hidden="true"></i>')
    icon.css('color', 'darkturquoise')
  }
  input.focus()
}

/**
 * Removes header options
 */
export const hide_h_options = () => {
  let element = document.querySelector('.sp_options')
  element.style.display = 'none'
}

/**
 * For replacing illegal characters
 */
export const replacer = (elements, filter) => {
  let regex =
    filter == 'normal' ? /[^a-z0-9_.@$#]/i
      : filter == 'bio'
        ? /[<>]/i : null

  for (let el of elements) {
    el.on('keyup', () => {
      let value = el.val()
      el.val(value.replace(regex, ''))
    })
  }
}

/**
 * Returns whether it's me
 */
export const Me = user =>
  user == $('.data').data('session') ? true : false

/**
 * Returns whether email is verified
 */
export const e_v = () => {
  let ea = $('.data').data('email-verified')
  return ea == 'yes' ? true : false
}

/**
 * Returns whether user is private
 */
export const isPrivate = (user, isFollowing, accountType) => {
  let sprivate = !Me(user) && !isFollowing && accountType == 'private' ? true : false
  return sprivate
}

/**
 * Returns if user is the admin
 */
export const isAdmin = () =>
  $('.data').data('isadmin')

/**
 * Compresses and returns file
 * @param {File} file
 */
export const imageCompressor = file => {
  return new Promise(resolve => {
    new Compress(file, {
      quality: .6,
      success: file => resolve(file),
      error: err => console.log(err.message)
    })
  })
}

/**
 * For profile
 */
export const forProfile = async options => {
  let
    { username, dispatch, invalidUser } = options,
    { data: valid } = await post('/api/is-user-valid', { username }),
    s_username = $('.data').data('username')

  if (!valid) {
    invalidUser()
  } else {

    if (username != s_username) {
      dispatch(follow_action.isFollowing(username))
      dispatch(getMutualUsers(username))
      post('/api/view-profile', { username })
    }

    dispatch(getUserDetails(username))
    dispatch(follow_action.getUserStats(username))
    dispatch(getUserPosts(username))

  }

}

/**
 * For group
 */
export const forGroup = async options => {
  let
    { grp_id, dispatch, invalidGroup } = options,
    { data: valid } = await post('/api/is-group-valid', { grp_id })

  if (!valid) {
    invalidGroup()
  } else {
    dispatch(joinedGroup(grp_id))
    dispatch(getGroupDetails(grp_id))
    dispatch(getGroupPosts(grp_id))
  }

}

/**
 * Scrolls to 380
 */
export const profile_scroll = () => {
  $('html, body').animate({
    scrollTop: 380
  }, 'slow')
}

/**
 * Scrolls messages to the bottom
 */
export const messageScroll = () =>
  document.querySelector('.mssg_end').scrollIntoView({ behavior: 'smooth' })

/**
 * Notifies user [on the notification page]
 * @param {Object} options
 * @param {Number} options.to
 * @param {String} options.type
 * @param {Number} options.post_id
 * @param {Number} options.group_id
 * @param {Number} options.user
 */
export const insta_notify = async options => {
  let
    defaults = {
      to: null,
      type: '',
      post_id: 0,
      group_id: 0,
      user: 0
    },
    obj = { ...defaults, ...options },
    { to, type, post_id, group_id, user } = obj

  await post('/api/notify', { to, type, post_id, group_id, user })
}

/**
 * Geolocation setup
 * @param {Function} success Success function
 * @param {Function} error Error function
 */
export const geolocation = (success, error) => {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(success, error)
  } else {
    Notify({ value: 'Geolocation not supported' })
  }
}

/**
 * Geolocation error
 */
export const geolocationError = ({ code }) => {
  let mssg

  mssg =
    code == 1 ? 'Location permission denied!!'
      : code == 2 ? 'Location signal lost!!'
        : code == 3 ? 'Location request timed out!!'
          : code == 0 ? 'Unknown location error!!'
            : null

  Notify({ value: mssg })
}

/**
 * Dispatcher helper for dispatching data retrieved from URL
 *
 * @param {String} type Dispatch type
 * @param {String} url /api/URL to get data from
 * @param {Object} data data requested with the url
 */
export const dispatchHelper = (type, url, data={}) =>
  dispatch =>
    post(`/api/${url}`, data)
      .then(p => dispatch({ type, payload: p.data }))
      .catch(e => console.log(e))

import $ from 'jquery'
import { post } from 'axios'
import Notify from 'handy-notification'
import { getUserDetails, getMutualUsers } from '../store/actions/user-a'
import * as follow_action from '../store/actions/follow_a'
import { getUserPosts, getGroupPosts, } from '../store/actions/post-a'
import { getGroupDetails, joinedGroup } from '../store/actions/group-a'
import Compress from 'image-compressor.js'

/** SHORTENS GIVEN STRING BY GIVEN LENGTH */
export const shortener = (elem, length) => {
  let
    parse = parseInt(length),
    len = elem.length
  if (!parse) { return }
  return (len >= parse) ? `${elem.substr(0, length - 2)}..` : (len < parse) ? elem : null
}

/** RETURNS UNIQUE STRING */
export const uniq = () =>
  Math.random().toString(5).slice(2)

/** FUNCTION FOR HUMAN-READABLE */
export const humanReadable = (value, text) => {
  let hr =
    value == 0 ? `No ${text}s`
      : value == 1 ? `1 ${text}`
        : `${value} ${text}s`
  return hr
}

/** FUNCTION TO TOGGLE */
export const toggle = el => {
  let style = el.style.display
  style === 'none' ? el.style.display = 'block' : el.style.display = 'none'
}

/* FUNCTION TO CAPITALIZE FIRST LETTER OF A WORD */
export const c_first = str =>
  str.charAt(0).toUpperCase() + str.substr(1)

/** TO REMOVE LINE OF LAST ELEMENT */
export const llr = () => {
  let
    f = $('.modal_main').children(),
    s = $('.display_content').children().length - 1
  f.eq(s).find('hr').remove()
}

/** FOR SHOW PASSWORD FUNCTIONALTITY */
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

/** TOGGLE HEADER OPTIONS */
export const hide_h_options = () => {
  let element = document.querySelector('.sp_options')
  element.style.display = 'none'
}

/** FOR REPLACING ILLEGAL CHARACTERS */
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

/** FUNCTION TO CHECK WHETHER ITS ME OR NOT */
export const Me = user =>
  user == $('.data').data('session') ? true : false

/** FUNCTION TO CHECK WHETHER EMAIL IS ACTIVATED ON NOT */
export const e_v = () => {
  let ea = $('.data').data('email-verified')
  return ea == 'yes' ? true : false
}

/** FUNCTION TO CHECK WHETHER USER IS PRIVATE */
export const isPrivate = (user, isFollowing, accountType) => {
  let sprivate = !Me(user) && !isFollowing && accountType == 'private' ? true : false
  return sprivate
}

/** FOR CHECKING IF USER IS ADMIN */
export const isAdmin = () =>
  $('.data').data('isadmin')

/** IMAGE PROCESSOR */
const imageCompressor = file => {
  return new Promise(resolve => {
    new Compress(file, {
      quality: .6,
      success: file => resolve(file),
      error: err => console.log(err.message)
    })
  })
}

exports.imageCompressor = imageCompressor

/** FOR PROFILE */
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

/** FOR GROUP */
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

/** SCROLLS TO 380 */
export const profile_scroll = () => {
  $('html, body').animate({
    scrollTop: 380
  }, 'slow')
}

/** MESSAGE SCROLL */
export const messageScroll = () =>
  document.querySelector('.mssg_end').scrollIntoView({ behavior: 'smooth' })

/** NOTIFY */
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

/** GEOLOCATION */
export const geolocation = (success, error) => {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(success, error)
  } else {
    Notify({ value: 'Geolocation not supported' })
  }
}

/** GEOLOCATION ERROR */
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

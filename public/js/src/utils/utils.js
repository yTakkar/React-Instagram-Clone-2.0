import $ from 'jquery'
import { post } from 'axios'
import Notify from 'handy-notification'
import { getUserDetails, addTag, getMutualUsers } from '../store/actions/user-a'
import * as follow_action from '../store/actions/follow_a'
import { getUserPosts, getGroupPosts, addGroupPost, comment, addUserPost } from '../store/actions/post-a'
import { getGroupDetails, joinedGroup, leftGroup } from '../store/actions/group-a'
import { conversationAdded, messaged, changeLastMssg, unsendAllMessages } from '../store/actions/message-a'
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

/** FOR USERNAME CHECKER */
export const username_checker = el => {
  let uc = $('.username_checker')
  el.on('keyup', async () => {
    let value = el.val()
    uc.show()

    if (value) {
      let
        { data: count } = await post('/user/username-checker', { value: el.val() }),
        html = count == 0
          ? '<span class=\'checker_text\'>username is available</span><span class=\'checker_icon\'><i class=\'fa fa-smile-o\' aria-hidden=\'true\'></i></span>'
          : '<span class=\'checker_text\'>username already taken</span><span class=\'checker_icon\'><i class=\'fa fa-frown-o\' aria-hidden=\'true\'></i></span>'

      uc.html(html)
    } else {
      uc.hide()
    }

  })
  el.on('blur', () => uc.hide() )
}

/** FUNCTION FOR LOGIN AND SIGNUP */
export const commonLogin = options => {
  let
    { data, btn, url, redirect, defBtnValue } = options,
    overlay2 = $('.overlay-2')

  btn
    .attr('value', 'Please wait..')
    .addClass('a_disabled')
  overlay2.show()

  post(url, data)
    .then(s => {
      let { data: { mssg, success } } = s
      if (success) {
        Notify({
          value: mssg,
          done: () => location.href = redirect
        })
        btn.attr('value', 'Redirecting..')
        overlay2.show()
      } else {
        Notify({
          value: typeof(mssg) == 'object' ? mssg.length > 1 ? mssg[0] : mssg : mssg
        })
        btn
          .attr('value', defBtnValue)
          .removeClass('a_disabled')
        overlay2.hide()
      }
      btn.blur()
    })
    .catch(e => console.log(e))
}

/** FUNCTION FOR QUICK LOGIN */
export const quickLogin = ({ id, username }) => {
  let
    usernameDiv = $('.q_l_username'),
    imgDiv = $('.q_l_m_img')

  $('.overlay-2-black').show()
  $('.q_l_model').fadeIn('fast')
  $('#q_l_password').focus()

  usernameDiv.text(`@${username}`)
  imgDiv.attr('src', `/users/${id}/avatar.jpg`)

  // QUICK LOGIN SUBMIT
  $('.q_l_m_form').submit(e => {
    e.preventDefault()
    quickLoginSubmit(username)
  })

  // CLEAR QUICK LOGIN
  $('.q_l_remove').on('click', async e => {
    e.preventDefault()
    await post('/api/remove-quick-login', { id })
    Notify({
      value: `Removed ${username} from quick login!!`,
      done: () => location.reload()
    })
  })

  // TOGGLE VIEW PASSWORD
  $('.s_p_ql').on('click', () => {
    viewPassword({
      input: document.getElementById('q_l_password'),
      icon: $('.s_p_ql')
    })
  })

}

/** QUICK LOGIN SUBMIT */
const quickLoginSubmit = username => {
  let password = $('#q_l_password').val()
  if (!password) {
    Notify({ value: 'Password is missing!!' })
  } else {

    let loginOpt = {
      data: {
        username,
        password
      },
      when: 'login',
      btn: $('.q_l_submit'),
      url: '/user/login',
      redirect: '/',
      defBtnValue: 'Login To Continue',
    }
    commonLogin(loginOpt)

  }
}

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

/** FOLLOW */
export const follow = async options => {
  let
    defaults = {
      user: null,                 // USER TO FOLLOW [MUST]
      username: null,             // USER'S USERNAME, ONlY FOR NOTIFYING [MUST]
      firstname: null,            // WHEN UPDATE_FOLLOWINGS=TRUE
      surname: null,              // WHEN UPDATE_FOLLOWINGS=TRUE
      update_followers: false,    // PROVIDE WHEN FOLLOWERS DATA NEEDS TO BE UDATED. EG. FOLLOW ACTION ON BANNER COMPONENT
      update_followings: false,   // PROVIDE WHEN FOLLOWINGS DATA NEEDS TO BE UDATED. EG. FOLLOWERS/FOLLOWINGS COMPONENT'S FOLLOW ACTION
      dispatch: () => { return }, // PROVIDE WHEN [UPDATE_FOLLOWERS/UPDATE_FOLLOWINGS]=TRUE
      done: () => { return }      // FN TO BE EXECUTED WHEN USER IS FOLLOWED [MUST]
    },
    obj = { ...defaults, ...options },
    {
      user,
      username,
      firstname,
      surname,
      dispatch,
      update_followers,
      update_followings,
      done
    } = obj,
    { data: { mssg, success, ff } } = await post('/api/follow', { user, username })

  if (success) {
    let fwing = {
      follow_id: ff.follow_id,
      follow_to: user,
      follow_by: $('.data').data('session'),
      username,
      firstname,
      surname,
      isFollowing: true,
      follow_time: ff.follow_time
    }
    update_followers ? dispatch(follow_action.Follower(ff)) : null
    update_followings ? dispatch(follow_action.Following(fwing)) : null

    insta_notify({
      to: user,
      type: 'follow'
    })

    done()
  }

  Notify({ value: mssg })

}

/** UNFOLLOW */
export const unfollow = async options => {
  let
    defaults = {
      user: null,                 // USER TO UNFOLLOW [MUST]
      update_followers: false,    // PROVIDE WHEN FOLLOWERS DATA NEEDS TO BE UDATED. EG. FOLLOW ACTION ON BANNER COMPONENT
      update_followings: false,   // PROVIDE WHEN FOLLOWINGS DATA NEEDS TO BE UDATED. EG. FOLLOWERS/FOLLOWINGS COMPONENT'S FOLLOW ACTION
      dispatch: () => { return },   // PROVIDE WHEN [UPDATE_FOLLOWERS/UPDATE_FOLLOWINGS]=TRUE
      done: () => { return }      // FN TO BE EXECUTED WHEN USER IS UNFOLLOWED [MUST]
    },
    obj = { ...defaults, ...options },
    {
      user,
      dispatch,
      update_followers,
      update_followings,
      done
    } = obj,
    session = $('.data').data('session')

  await post('/api/unfollow', { user })

  update_followers ? dispatch(follow_action.Unfollower(session)) : null
  update_followings ? dispatch(follow_action.Unfollowing(user)) : null

  Notify({ value: 'Unfollowed!!' })
  done()

}

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

/** ADD USER TAGS */
export const addUserTags = options => {
  let { value, user, dispatch } = options
  if (value) {
    dispatch(addTag({
      user,
      tag: value
    }))
  } else {
    Notify({ value: 'Please enter a tag!!' })
  }
}

/** EDIT PROFILE */
export const editProfile = async options => {
  let
    { susername, semail, values, values: { username, email } } = options,
    button = $('.edit_done'),
    { data: uCount} = await post('/api/what-exists', { what: 'username', value: username }),
    { data: eCount } = await post('/api/what-exists', { what: 'email', value: email })

  button
    .addClass('a_disabled')
    .text('Processing..')
    .blur()

  if(!username){
    Notify({ value: 'Username must not be empty!!' })
  } else if(!email){
    Notify({ value: 'Email must not be empty!!' })
  } else if(uCount == 1 && username != susername){
    Notify({ value: 'Username already exists!!' })
  } else if(eCount == 1 && email != semail){
    Notify({ value: 'Email already exists!!' })
  } else {

    let { data: { mssg, success } } = await post('/api/edit-profile', values)

    Notify({
      value:  typeof(mssg) == 'object' ? mssg.length > 1 ? mssg[0] : mssg : mssg,
      done: () => success ? location.reload() : null
    })

  }

  button
    .removeClass('a_disabled')
    .text('Done Editing')
    .blur()

}

/** RESEND VERIFICATION LINK */
export const resend_vl = async () => {
  let
    vl = $('.resend_vl'),
    o = $('.overlay-2')

  vl
    .addClass('sec_btn_disabled')
    .text('Sending verification link..')

  o.show()
  let { data: { mssg } } = await post('/api/resend_vl')

  Notify({ value: mssg })
  vl
    .text('Resend verification link')
    .removeClass('sec_btn_disabled')
    .blur()
  o.hide()
}

/** UPLOAD AVATAR */
export const upload_avatar = async ({ file: userFile, of, group }) => {
  let
    form = new FormData(),
    file = await imageCompressor(userFile)

  if (file.size > 6000000) {
    Notify({ value: 'Image should be less than 4MB!!' })
  } else {
    $('.overlay-2').show()
    $('.c_a_add')
      .text('Changing avatar..')
      .addClass('a_disabled')

    form.append('avatar', file)
    form.append('of', of)
    form.append('group', group)

    let { data: { mssg } } = await post('/api/upload-avatar', form)

    Notify({
      value: mssg,
      done: () => location.reload()
    })
  }

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
    tags_count: 0,
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

/** ADD TO FAVOURITES LIST */
export const addToFavourites = async user => {
  let { data: { mssg } } = await post('/api/add-to-favourites', { user })
  insta_notify({
    to: user,
    type: 'favourites'
  })
  Notify({ value: mssg })
}

/** BLOCK USER */
export const block = async user => {
  let { data: { mssg } } = await post('/api/block', { user })
  Notify({ value: mssg })
}

/** JOIN GROUP */
export const joinGroup = async options => {
  let
    defaults = {
      user: null,
      added_by: null,
      group: null,
      when: '',
      done: () => { return }
    },
    obj = { ...defaults, ...options },
    { user, added_by, group, when, done } = obj,
    { data: { mssg, success } } = await post('/api/join-group', { user, added_by, group, when })

  if (success) {
    if (when == 'add_grp_member') {
      insta_notify({
        to: user,
        type: 'add_grp_member',
        group_id: group
      })
    }

    done()
  }

  Notify({ value: mssg })
}

/** LEAVE GROUP */
export const leaveGroup = async options => {
  let
    defaults = {
      user: null,
      group: null,
      updateGroups: false,
      dispatch: () => { return },
      done: () => { return }
    },
    obj = { ...defaults, ...options },
    { user, group, updateGroups, dispatch, done } = obj,
    { data: { mssg } } = await post('/api/leave-group', { user, group })

  updateGroups ? dispatch(leftGroup(group)) : null

  done()
  Notify({ value: mssg })

}

/** CREATE CONVERSATION */
export const newConversation = async options => {
  let
    { user, username, dispatch, done } = options,
    session = $('.data').data('session'),
    {
      data: { mssg, success, con_id, firstname, surname, mutualFollowersCount }
    } = await post('/api/create-new-conversation', { user })

  if (success) {
    done()

    dispatch(conversationAdded({
      key: con_id,
      con_id,
      con_with: user,
      con_with_username: username,
      con_with_firstname: firstname,
      con_with_surname: surname,
      user_one: session,
      user_two: user,
      mutualFollowersCount,
      lastMssg: {
        lastMessage: '',
        lastMssgBy: null,
        lastMssgTime: null,
        lastMssgType: ''
      }
    }))

    insta_notify({
      to: user,
      type: 'new_con'
    })
  }

  Notify({ value: mssg })
}

/** TEXT MESSAGE */
export const textMessage = async options => {
  let
    { message, con_id, grp_con_id, con_with, dispatch, } = options,
    session = $('.data').data('session'),
    overlay2 = $('.overlay-2'),
    btn = $('.mssg_send')

  overlay2.show()
  btn
    .attr('value', 'Wait..')
    .addClass('a_disabled')

  if (!message) {
    Notify({ value: 'Comment field is empty!!' })
  } else {
    let {
      data: { message_id }
    } = await post('/api/text-message', { message, con_id, grp_con_id, con_with })

    dispatch(messaged({
      con_id,
      grp_con_id,
      message,
      message_id,
      message_time: new Date().getTime(),
      mssg_by: session,
      mssg_to: con_with,
      type: 'text'
    }))

    dispatch(changeLastMssg({
      con_id,
      lastMssg: {
        lastMessage: message,
        lastMssgBy: session,
        lastMssgTime: new Date().getTime(),
        lastMssgType: 'text'
      }
    }))

  }

  messageScroll()
  overlay2.hide()
  btn
    .attr('value', 'Send')
    .removeClass('a_disabled')
}

/** IMAGE COMMENT */
export const imageMessage = async options => {
  let
    { file: messageFile, con_id, grp_con_id, con_with, dispatch } = options,
    session = $('.data').data('session'),
    form = new FormData(),
    file = await imageCompressor(messageFile)

  $('.overlay-2').show()
  Notify({ value: 'Please wait..' })

  form.append('messageFile', file)
  form.append('con_id', con_id)
  form.append('grp_con_id', grp_con_id)
  form.append('con_with', con_with)

  let { data: { message_id, filename } } = await post('/api/image-message', form)

  dispatch(messaged({
    con_id,
    grp_con_id,
    message: filename,
    message_id,
    message_time: new Date().getTime(),
    mssg_by: session,
    mssg_to: con_with,
    type: 'image'
  }))

  dispatch(changeLastMssg({
    con_id,
    lastMssg: {
      lastMessage: filename,
      lastMssgBy: session,
      lastMssgTime: new Date().getTime(),
      lastMssgType: 'image'
    }
  }))

  messageScroll()
  $('.overlay-2').hide()
  Notify({ value: 'Commented!!' })
}

/** STICKER MESSAGE */
export const stickerMessage = async options => {
  let
    { con_id, grp_con_id, con_with, sticker, dispatch } = options,
    session = $('.data').data('session'),
    { data: { filename, message_id } } = await post('/api/sticker-message', { con_id, grp_con_id, con_with, sticker })

  dispatch(messaged({
    con_id,
    grp_con_id,
    message: filename,
    message_id,
    message_time: new Date().getTime(),
    mssg_by: session,
    mssg_to: con_with,
    type: 'sticker'
  }))

  dispatch(changeLastMssg({
    con_id,
    lastMssg: {
      lastMessage: filename,
      lastMssgBy: session,
      lastMssgTime: new Date().getTime(),
      lastMssgType: 'sticker'
    }
  }))

  Notify({ value: 'Messaged!!' })
  messageScroll()
}

/** UNSEND ALL MSSGS */
export const deleteYourMssgs = async options => {
  let
    { con_id, dispatch } = options,
    session = $('.data').data('session')

  await post('/api/unsend-all-mssgs', { con_id })
  dispatch(unsendAllMessages(session))
  Notify({ value: 'Deleted all your messages!!' })
}

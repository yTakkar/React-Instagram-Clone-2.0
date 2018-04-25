import $ from 'jquery'
import { post } from 'axios'
import Notify from 'handy-notification'
import { addTag } from '../store/actions/user-a'
import { imageCompressor } from './utils'

/**
 * Add user tags
 * @param {Object} options
 * @param {String} options.value
 * @param {Number} options.user
 * @param {Function} options.dispatch
 */
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

/**
 * Edit profile
 * @param {Object} options
 * @param {String} options.susername
 * @param {String} options.semail
 * @param {Object} options.values
 * @param {String} options.values.username
 * @param {String} options.values.email
 */
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

/** Upload avatar
 * @param {Object} options
 * @param {File} options.file
 * @param {String} options.of
 * @param {Number} options.group
 */
export const upload_avatar = async options => {
  let
    { file: userFile, of, group } = options,
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

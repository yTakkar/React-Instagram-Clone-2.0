import { post } from 'axios'
import Notify from 'handy-notification'
import { addTag } from '../actions/user'
import { ObjectMssg, wait } from './utils'
import Action from './API/Action'

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
    dispatch(
      addTag({
        user,
        tag: value,
      })
    )
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
  let {
      susername,
      semail,
      values,
      values: { username, email },
    } = options,
    { data: uCount } = await post('/api/what-exists', {
      what: 'username',
      value: username,
    }),
    { data: eCount } = await post('/api/what-exists', {
      what: 'email',
      value: email,
    }),
    action = new Action('.edit_done')

  action.start('Processing..')

  if (!username) {
    Notify({ value: 'Username must not be empty!!' })
  } else if (!email) {
    Notify({ value: 'Email must not be empty!!' })
  } else if (uCount == 1 && username != susername) {
    Notify({ value: 'Username already exists!!' })
  } else if (eCount == 1 && email != semail) {
    Notify({ value: 'Email already exists!!' })
  } else {
    let {
      data: { mssg, success },
    } = await post('/api/edit-profile', values)

    Notify({
      value: ObjectMssg(mssg),
      done: () => (success ? location.reload() : null),
    })
  }

  action.end('Done Editing')
}

/**
 * Resend verification link
 */
export const resend_vl = async () => {
  let action = new Action('.resend_vl', true, 'sec_btn_disabled')

  action.start('Sending verification link..')
  wait()

  let {
    data: { mssg },
  } = await post('/api/resend_vl')

  Notify({ value: mssg })
  action.end('Resend verification link')
}

/**
 * Converts a fields object into array so we can map though the array and follow DRY pattern.
 *
 * @param {Object} fields Fields to convert into an array
 */
export const fieldsToArray = fields => {
  let array = []

  for (let key in fields) {
    array.push({
      key,
      value: fields[key],
    })
  }

  return array
}

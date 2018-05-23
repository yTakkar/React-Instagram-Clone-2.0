import { post } from 'axios'
import Notify from 'handy-notification'
import d from './DOM'
import { unblockUser } from '../actions/settings'
import { ObjectMssg, wait } from './utils'

/**
 * Block user
 * @param {Number} user User to block
 */
export const block = async user => {
  let {
    data: { mssg }
  } = await post('/api/block', { user })
  Notify({ value: mssg })
}

/**
 *
 * @param {Object} options
 * @param {Number} options.block_id
 * @param {String} options.username
 * @param {Function} options.dispatch
 */
export const unblock = async options => {
  let { block_id, username, dispatch } = options
  let {
    data: { success, mssg }
  } = await post('/api/unblock-user', { block_id })

  if (success) {
    dispatch(unblockUser(block_id))
    Notify({ value: `Unblocked ${username}!!` })
  } else {
    Notify({ value: mssg })
  }
}

/**
 * Changes the password of session user
 * @param {String} old Old/Current password
 * @param {String} new_ New password
 * @param {String} new_a New password again for surety
 */
export const changePassword = async (old, new_, new_a) => {
  let btn = new d('.c_p_btn')
  let overlay2 = new d('.overlay-2')

  if (!old || !new_ || !new_a) {
    Notify({ value: 'Some values are missing!!' })
  } else if (new_ != new_a) {
    Notify({ value: 'New passwords don\'t match' })
  } else {

    btn
      .addClass('a_disabled')
      .text('Changing password..')
    overlay2.show()

    wait()

    let {
      data: { mssg, success }
    } = await post('/user/change-password', { old, new_, new_a })

    if (success) {
      Notify({
        value: mssg,
        done: () => location.reload()
      })

    } else {
      Notify({
        value: ObjectMssg(mssg)
      })

      btn
        .removeClass('a_disabled')
        .text('Change password')
      overlay2.hide()

    }

  }
}

/**
 * Change user's password
 * @param {String} password User's password
 */
export const deactivateAccount = async (password, hidePrompt) => {
  let btn = new d('.prompt-done')
  let o = new d('.overlay-2')

  btn
    .addClass('a_disabled')
    .text('Deactivating..')
  o.show()

  wait()

  let {
    data: { mssg, success }
  } = await post('/user/deactivate-account', { password })

  btn
    .removeClass('a_disabled')
    .text('Deactivate')
  o.hide()

  Notify({
    value: mssg,
    done: () => {
      success ?
        location.href = '/login'
        : hidePrompt()
    }

  })
}

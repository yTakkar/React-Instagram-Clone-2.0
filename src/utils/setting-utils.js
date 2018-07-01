import { post } from 'axios'
import Notify from 'handy-notification'
import { unblockUser } from '../actions/settings'
import { ObjectMssg, wait } from './utils'
import Action from './API/Action'

/**
 * Block user
 * @param {Number} user User to block
 */
export const block = async user => {
  let {
    data: { mssg },
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
    data: { success, mssg },
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
  let action = new Action('.c_p_btn')

  if (!old || !new_ || !new_a) {
    Notify({ value: 'Some values are missing!!' })
  } else if (new_ != new_a) {
    Notify({ value: "New passwords don't match" })
  } else {
    action.start('Changing password..')
    wait()

    let {
      data: { mssg, success },
    } = await post('/user/change-password', { old, new_, new_a })

    if (success) {
      Notify({
        value: mssg,
        done: () => location.reload(),
      })
    } else {
      Notify({
        value: ObjectMssg(mssg),
      })

      action.end('Change password')
    }
  }
}

/**
 * Change user's password
 * @param {String} password User's password
 */
export const deactivateAccount = async (password, hidePrompt) => {
  let action = new Action('.prompt-done')

  action.start('Deactivating..')
  wait()

  let {
    data: { mssg, success },
  } = await post('/user/deactivate-account', { password })

  action.end('Deactivate')

  Notify({
    value: mssg,
    done: () => {
      success ? (location.href = '/login') : hidePrompt()
    },
  })
}

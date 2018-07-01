import qs from 'query-string'
import { post } from 'axios'
import Notify from 'handy-notification'
import { uData } from './utils'
import Action from './API/Action'

/**
 * For submit to check if user is the admin
 * @param {Object} options
 * @param {String} options.password
 * @param {String} options.search
 */
export const adminSubmit = async options => {
  let { password, search } = options,
    toURL = qs.parse(search),
    action = new Action('.al_submit')

  if (!password) {
    Notify({ value: 'Password field is missing!!' })
  } else {
    action.start('Please wait..')

    let {
      data: { mssg, success },
    } = await post('/api/check-is-admin', { password })
    let to = toURL.to ? toURL.to : '/is-admin'

    Notify({
      value: mssg,
      done: () => (success ? (location.href = to) : null),
    })

    action.end('Continue as admin')
  }
}

/**
 * Returns if user is admin of the app
 */
export const isAdmin = () => (uData('isadmin') == 'true' ? true : false)

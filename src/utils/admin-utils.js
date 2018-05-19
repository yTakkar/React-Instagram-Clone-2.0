import qs from 'query-string'
import { post } from 'axios'
import Notify from 'handy-notification'
import { uData } from './utils'
import d from './DOM'

/**
 * For submit to check if user is the admin
 * @param {Object} options
 * @param {String} options.password
 * @param {String} options.search
 */
export const adminSubmit = async options => {
  let
    { password, search } = options,
    toURL = qs.parse(search),
    element = new d('.al_submit')

  if (!password) {
    Notify({ value: 'Password field is missing!!' })
  } else {
    element
      .addClass('a_disable')
      .val('Please wait..')

    let {
      data: { mssg, success }
    } = await post('/api/check-is-admin', { password })
    let to = toURL.to ? toURL.to : '/is-admin'

    Notify({
      value: mssg,
      done: () => success ? location.href = to : null
    })

    element
      .removeClass('a_disabled')
      .val('Continue as admin')
  }

}

/**
 * Returns if user is the admin
 */
export const isAdmin = () =>
  uData('isadmin') == 'true'
    ? true
    : false

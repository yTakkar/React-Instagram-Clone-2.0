import { dispatchHelper } from '../utils/utils'

export const getNotifications = () =>
  dispatchHelper('GET_NOTIFICATIONS', 'get-notifications')

export const clearNotifications = () =>
  dispatchHelper('CLEAR_NOTIFICATIONS', 'clear-notifications')

export const getUnreadNotifications = () =>
  dispatchHelper('GET_UNREAD_NOTIFICATIONS', 'get-unread-notifications')

export const readNotifications = () =>
  dispatchHelper('READ_NOTIFICATIONS', 'read-notifications')

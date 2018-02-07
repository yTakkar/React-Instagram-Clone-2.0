import { post } from 'axios'

export const getNotifications = () => {
  return dispatch => {
    post('/api/get-notifications')
      .then(n => dispatch({ type: 'GET_NOTIFICATIONS', payload: n.data }) )
      .catch(e => console.log(e) )
  }
}

export const clearNotifications = () => {
  return dispatch => {
    post('/api/clear-notifications')
      .then(() => dispatch({ type: 'CLEAR_NOTIFICATIONS' }) )
      .catch(e => console.log(e) )
  }
}

export const getUnreadNotifications = () => {
  return dispatch => {
    post('/api/get-unread-notifications')
      .then(d => dispatch({ type: 'GET_UNREAD_NOTIFICATIONS', payload: d.data }) )
      .catch(e => console.log(e) )
  }
}

export const readNotifications = () => {
  return dispatch => {
    post('/api/read-notifications')
      .then(() => dispatch({ type: 'READ_NOTIFICATIONS' }) )
      .catch(e => console.log(e) )
  }
}

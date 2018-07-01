/* eslint indent:0 */
/* eslint no-unreachable:0 */

import initialState from './initialState'
import * as methods from './methods'

export default (state = initialState, action) => {
  let py = action.payload

  switch (action.type) {
    case 'GET_CONVERSATIONS':
      return { ...state, conversations: py }
      break

    case 'CONVERSATION_ADDED':
      return {
        ...state,
        conversations: methods.addCon(state.conversations, py),
      }
      break

    case 'GET_CONVERSATION_MESSAGES':
      return { ...state, messages: py }
      break

    case 'MESSAGE':
      return {
        ...state,
        messages: methods.message(state.messages, py),
      }
      break

    case 'CHANGE_LAST_MSSG':
      return {
        ...state,
        conversations: methods.changeLastMssg(state.conversations, py, 'user'),
      }
      break

    case 'DELETE_MESSAGE':
      return {
        ...state,
        messages: methods.deleteMssg(state.messages, py),
      }
      break

    case 'UNSEND_ALL_MSSGS':
      return {
        ...state,
        messages: methods.unsendAllMssgs(state.messages, py),
      }
      break

    case 'DELETE_CONVERSATION':
      return {
        ...state,
        conversations: methods.deleteConversation(state.conversations, py),
      }
      break

    case 'GET_CONVERSATION_ABOUT':
      return { ...state, conAbout: py }
      break

    case 'GET_UNREAD_MESSAGES':
      return { ...state, unreadMessages: py }
      break

    case 'READ_CONVERSATION':
      return {
        ...state,
        conversations: methods.readCon(state.conversations, py),
      }
      break

    case 'UPDATE_UNREAD_CONVERSATIONS':
      return {
        ...state,
        unreadMessages: state.unreadMessages - py,
      }
      break

    case 'GET_ONLINE_USERS':
      return { ...state, onlineUsers: py }
      break

    case 'GET_CON_DETAILS':
      return { ...state, conDetails: py }
      break
  }
  return state
}

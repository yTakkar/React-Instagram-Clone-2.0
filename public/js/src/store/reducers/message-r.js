/* eslint indent:0 */
/* eslint no-unreachable:0 */

const message_def = {
  conversations: [],
  messages: [],
  conDetails: {},
  unreadMessages: 0,
  onlineUsers: [],
}

export default (state=message_def, action) => {
  let py = action.payload

  switch(action.type) {
    case 'GET_CONVERSATIONS':
      return { ...state, conversations: py }
      break

    case 'CONVERSATION_ADDED':
      return { ...state, conversations: addCon(state.conversations, py) }
      break

    case 'GET_CONVERSATION_MESSAGES':
      return { ...state, messages: py }
      break

    case 'MESSAGE':
      return { ...state, messages: message(state.messages, py) }
      break

    case 'CHANGE_LAST_MSSG':
      return { ...state, conversations: changeLastMssg(state.conversations, py, 'user') }
      break

    case 'DELETE_MESSAGE':
      return { ...state, messages: deleteMssg(state.messages, py) }
      break

    case 'UNSEND_ALL_MSSGS':
      return { ...state, messages: unsendAllMssgs(state.messages, py) }
      break

    case 'DELETE_CONVERSATION':
      return { ...state, conversations: deleteConversation(state.conversations, py) }
      break

    case 'GET_CONVERSATION_DETAILS':
      return { ...state, conDetails: py }
      break

    case 'GET_UNREAD_MESSAGES':
      return { ...state, unreadMessages: py }
      break

    case 'READ_CONVERSATION':
      return { ...state, conversations: readCon(state.conversations, py) }
      break

    case 'UPDATE_UNREAD_CONVERSATIONS':
      return { ...state, unreadMessages: state.unreadMessages - py }
      break

    case 'GET_ONLINE_USERS':
      return { ...state, onlineUsers: py }
      break
  }
  return state
}

const addCon = (cons, con) => {
  cons = [ con, ...cons ]
  return cons
}

const message = (messages, message) => {
  messages = [ ...messages, message ]
  return messages
}

const changeLastMssg = (conversations, mssgDet) => {
  return conversations.map(c => {
    if (c.con_id == mssgDet.con_id) {
      c.lastMssg = mssgDet.lastMssg
    }
    return c
  })
}

const deleteMssg = (messages, message_id) =>
  messages.filter(m => m.message_id != message_id)

const unsendAllMssgs = (messages, mssg_by) =>
  messages.filter(m => m.mssg_by != mssg_by)

const deleteConversation = (cons, con_id) =>
  cons.filter(c => c.con_id != con_id)

const readCon = (cons, con_id) => {
  return cons.map(c => {
    if(c.con_id == con_id) {
      c.unreadMssgs = 0
    }
    return c
  })
}

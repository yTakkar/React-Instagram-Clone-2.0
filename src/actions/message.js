import { post } from 'axios'
import { dispatchHelper } from '../utils/utils'

export const getConversations = () =>
  dispatchHelper('GET_CONVERSATIONS', 'get-conversations')

export const conversationAdded = conversation => {
  return {
    type: 'CONVERSATION_ADDED',
    payload: conversation,
  }
}

export const getConversationMessages = (con_id, when) =>
  dispatchHelper('GET_CONVERSATION_MESSAGES', 'get-conversation-messages', {
    con_id,
    when,
  })

export const messaged = message => {
  return {
    type: 'MESSAGE',
    payload: message,
  }
}

export const changeLastMssg = lastMssg => {
  return {
    type: 'CHANGE_LAST_MSSG',
    payload: lastMssg,
  }
}

export const deleteMssg = message_id => {
  return {
    type: 'DELETE_MESSAGE',
    payload: message_id,
  }
}

export const unsendAllMessages = mssg_by => {
  return {
    type: 'UNSEND_ALL_MSSGS',
    payload: mssg_by,
  }
}

export const deleteCon = con_id => {
  return {
    type: 'DELETE_CONVERSATION',
    payload: con_id,
  }
}

export const getConAbout = (con_id, user) =>
  dispatchHelper('GET_CONVERSATION_ABOUT', 'get-conversation-about', {
    con_id,
    user,
  })

export const getUnreadMessages = () =>
  dispatchHelper('GET_UNREAD_MESSAGES', 'get-unread-messages')

export const readConversation = (con_id, unreadMssgs) => {
  return dispatch => {
    post('/api/read-conversation', { con_id })
      .then(() => {
        dispatch({ type: 'READ_CONVERSATION', payload: con_id })

        unreadMssgs != 0
          ? dispatch({
              type: 'UPDATE_UNREAD_CONVERSATIONS',
              payload: unreadMssgs,
            })
          : null
      })
      .catch(e => console.log(e))
  }
}

export const getOnlineUsers = () =>
  dispatchHelper('GET_ONLINE_USERS', 'get-online-users')

export const getConDetails = con_id =>
  dispatchHelper('GET_CON_DETAILS', 'get-conversation-details', { con_id })

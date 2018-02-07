import { post } from 'axios'

export const getConversations = () => {
  return dispatch => {
    post('/api/get-conversations')
      .then(p => dispatch({ type: 'GET_CONVERSATIONS', payload: p.data }))
      .catch(e => console.log(e))
  }
}

export const conversationAdded = conversation => {
  return {
    type: 'CONVERSATION_ADDED',
    payload: conversation
  }
}

export const getConversationMessages = (con_id, when) => {
  return dispatch => {
    post('/api/get-conversation-messages', { con_id, when })
      .then(p => dispatch({ type: 'GET_CONVERSATION_MESSAGES', payload: p.data }))
      .catch(e => console.log(e))
  }
}

export const messaged = message => {
  return {
    type: 'MESSAGE',
    payload: message
  }
}

export const changeLastMssg = lastMssg => {
  return {
    type: 'CHANGE_LAST_MSSG',
    payload: lastMssg
  }
}


export const deleteMssg = message_id => {
  return {
    type: 'DELETE_MESSAGE',
    payload: message_id
  }
}

export const unsendAllMessages = mssg_by => {
  return {
    type: 'UNSEND_ALL_MSSGS',
    payload: mssg_by
  }
}

export const deleteCon = con_id => {
  return {
    type: 'DELETE_CONVERSATION',
    payload: con_id
  }
}

export const getConDetails = con_id => {
  return dispatch => {
    post('/api/get-conversion-details', { con_id })
      .then(p => dispatch({ type: 'GET_CONVERSATION_DETAILS', payload: p.data }))
      .catch(e => console.log(e))
  }
}

export const getUnreadMessages = () => {
  return dispatch => {
    post('/api/get-unread-messages')
      .then(p => dispatch({ type: 'GET_UNREAD_MESSAGES', payload: p.data }))
      .catch(e => console.log(e))
  }
}

export const readConversation = (con_id, unreadMssgs) => {
  return dispatch => {
    post('/api/read-conversation', { con_id })
      .then(() => {
        dispatch({ type: 'READ_CONVERSATION', payload: con_id })
        unreadMssgs != 0 ?
          dispatch({ type: 'UPDATE_UNREAD_CONVERSATIONS', payload: unreadMssgs })
          : null
      })
      .catch(e => console.log(e) )
  }
}

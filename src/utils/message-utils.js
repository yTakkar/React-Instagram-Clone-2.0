import { post } from 'axios'
import Notify from 'handy-notification'
import {
  conversationAdded,
  messaged,
  changeLastMssg,
  unsendAllMessages,
  deleteCon,
  deleteMssg,
} from '../actions/message'
import { insta_notify, imageCompressor, uData, wait } from './utils'
import d from './API/DOM'
import Action from './API/Action'

/**
 * Scrolls down to bottom of the conversation
 */
export const messageScroll = () => {
  new d('.mssg_end').scrollTop()
}

/**
 * Creates a new conversation
 * @param {Object} options
 * @param {Number} options.user
 * @param {String} options.username
 * @param {Function} options.dispatch
 * @param {Boolean} options.updateConversations
 * @param {Function} options.done
 */
export const newConversation = async options => {
  let { user, username, updateConversations, dispatch, done } = options
  let {
    data: { mssg, success, con_id },
  } = await post('/api/create-new-conversation', { user })

  wait()

  if (success) {
    done()

    if (updateConversations) {
      dispatch(
        conversationAdded({
          key: con_id,
          con_id,
          con_with: user,
          con_with_username: username,
          lastMssg: {
            lastMessage: '',
            lastMssgBy: null,
            lastMssgTime: null,
            lastMssgType: '',
          },
          unreadMssgs: 0,
        })
      )
    }

    insta_notify({
      to: user,
      type: 'new_con',
    })
  }

  Notify({ value: mssg })
}

/**
 * A helper for dispatching actions related to messages
 * @param {Object} options
 */
const messageDispatchHelper = async options => {
  let { con_id, con_with, message_id, message, messageType, dispatch } = options
  let session = uData('session')

  dispatch(
    messaged({
      con_id,
      message,
      message_id,
      message_time: `${new Date().getTime()}`,
      mssg_by: Number(session),
      mssg_to: con_with,
      type: messageType,
      status: 'read',
    })
  )

  dispatch(
    changeLastMssg({
      con_id,
      lastMssg: {
        lastMessage: message,
        lastMssgBy: session,
        lastMssgTime: `${new Date().getTime()}`,
        lastMssgType: messageType,
      },
    })
  )
}

/**
 * Test message
 * @param {Object} options
 * @param {String} options.message
 * @param {Number} options.con_id
 * @param {Number} options.con_with
 * @param {Function} options.dispatch
 */
export const textMessage = async options => {
  let { message, con_id, con_with, dispatch } = options
  let action = new Action('.mssg_send')

  action.start()

  if (!message) {
    Notify({ value: 'Comment field is empty!!' })
  } else {
    let {
      data: { success, mssg, message_id },
    } = await post('/api/text-message', { message, con_id, con_with })

    if (success) {
      messageDispatchHelper({
        con_id,
        con_with,
        message_id,
        message,
        messageType: 'text',
        dispatch,
      })
    } else {
      Notify({ value: mssg })
    }
  }

  messageScroll()
  action.end('Send')
}

/**
 * Image message
 * @param {Object} options
 * @param {File} options.file
 * @param {Number} options.con_id
 * @param {Number} options.con_with
 * @param {Function} options.dispatch
 */
export const imageMessage = async options => {
  let { file: messageFile, con_id, con_with, dispatch } = options,
    form = new FormData(),
    file = await imageCompressor(messageFile),
    o = new d('.overlay-2')

  o.show()
  wait()

  form.append('messageFile', file)
  form.append('con_id', con_id)
  form.append('con_with', con_with)

  let {
    data: { success, mssg, message_id, filename },
  } = await post('/api/image-message', form)

  if (success) {
    messageDispatchHelper({
      con_id,
      con_with,
      message_id,
      message: filename,
      messageType: 'image',
      dispatch,
    })
  }

  messageScroll()
  o.hide()
  Notify({ value: mssg })
}

/**
 * Sticker message
 * @param {Object} options
 * @param {Number} options.con_id
 * @param {Number} options.con_with
 * @param {String} options.sticker
 * @param {Function} options.dispatch
 */
export const stickerMessage = async options => {
  let { con_id, con_with, sticker, dispatch } = options
  let {
    data: { success, mssg, filename, message_id },
  } = await post('/api/sticker-message', { con_id, con_with, sticker })

  wait()

  if (success) {
    messageDispatchHelper({
      con_id,
      con_with,
      message_id,
      message: filename,
      messageType: 'sticker',
      dispatch,
    })
  }

  Notify({ value: mssg })
  messageScroll()
}

/** Unsend all messages
 * @param {Object} options
 * @param {Number} options.con_id
 * @param {Function} options.dispatch
 */
export const deleteYourMssgs = async options => {
  let { con_id, dispatch } = options
  let session = uData('session')

  wait()

  let {
    data: { success, mssg },
  } = await post('/api/unsend-all-mssgs', { con_id })

  success ? dispatch(unsendAllMessages(session)) : null

  Notify({ value: mssg })
}

/**
 * Deletes a conversation
 * @param {Object} options
 * @param {Number} options.con_id
 * @param {Function} options.dispatch
 * @param {Function} options.hideConversation
 */
export const deleteConversation = async options => {
  let { con_id, dispatch, hideConversation } = options
  let {
    data: { success, mssg },
  } = await post('/api/delete-conversation', { con_id })

  wait()

  if (success) {
    dispatch(deleteCon(con_id))
    hideConversation()
  }

  Notify({ value: mssg })
}

/**
 *
 * @param {Object} options
 * @param {Number} options.message_id
 * @param {String} options.message
 * @param {String} options.type
 * @param {Function} options.dispatch
 * @param {Function} options.done
 */
export const deleteMessage = async options => {
  let { message_id, message, type, dispatch, done } = options

  let {
    data: { success, mssg },
  } = await post('/api/delete-message', { message_id, message, type })

  if (success) {
    dispatch(deleteMssg(message_id))
    done()
  }

  Notify({ value: mssg })
}

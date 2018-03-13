import $ from 'jquery'
import { post } from 'axios'
import Notify from 'handy-notification'
import { conversationAdded, messaged, changeLastMssg, unsendAllMessages } from '../store/actions/message-a'
import { insta_notify, messageScroll, imageCompressor } from './utils'

/** CREATE CONVERSATION */
export const newConversation = async options => {
  let
    { user, username, dispatch, done } = options,
    session = $('.data').data('session'),
    {
      data: { mssg, success, con_id, firstname, surname, mutualFollowersCount }
    } = await post('/api/create-new-conversation', { user })

  if (success) {
    done()

    dispatch(conversationAdded({
      key: con_id,
      con_id,
      con_with: user,
      con_with_username: username,
      con_with_firstname: firstname,
      con_with_surname: surname,
      user_one: session,
      user_two: user,
      mutualFollowersCount,
      lastMssg: {
        lastMessage: '',
        lastMssgBy: null,
        lastMssgTime: null,
        lastMssgType: ''
      }
    }))

    insta_notify({
      to: user,
      type: 'new_con'
    })
  }

  Notify({ value: mssg })
}

/** TEXT MESSAGE */
export const textMessage = async options => {
  let
    { message, con_id, grp_con_id, con_with, dispatch, } = options,
    session = $('.data').data('session'),
    overlay2 = $('.overlay-2'),
    btn = $('.mssg_send')

  overlay2.show()
  btn
    .attr('value', 'Wait..')
    .addClass('a_disabled')

  if (!message) {
    Notify({ value: 'Comment field is empty!!' })
  } else {
    let {
      data: { message_id }
    } = await post('/api/text-message', { message, con_id, grp_con_id, con_with })

    dispatch(messaged({
      con_id,
      grp_con_id,
      message,
      message_id,
      message_time: new Date().getTime(),
      mssg_by: session,
      mssg_to: con_with,
      type: 'text'
    }))

    dispatch(changeLastMssg({
      con_id,
      lastMssg: {
        lastMessage: message,
        lastMssgBy: session,
        lastMssgTime: new Date().getTime(),
        lastMssgType: 'text'
      }
    }))

  }

  messageScroll()
  overlay2.hide()
  btn
    .attr('value', 'Send')
    .removeClass('a_disabled')
}

/** IMAGE COMMENT */
export const imageMessage = async options => {
  let
    { file: messageFile, con_id, grp_con_id, con_with, dispatch } = options,
    session = $('.data').data('session'),
    form = new FormData(),
    file = await imageCompressor(messageFile)

  $('.overlay-2').show()
  Notify({ value: 'Please wait..' })

  form.append('messageFile', file)
  form.append('con_id', con_id)
  form.append('grp_con_id', grp_con_id)
  form.append('con_with', con_with)

  let { data: { message_id, filename } } = await post('/api/image-message', form)

  dispatch(messaged({
    con_id,
    grp_con_id,
    message: filename,
    message_id,
    message_time: new Date().getTime(),
    mssg_by: session,
    mssg_to: con_with,
    type: 'image'
  }))

  dispatch(changeLastMssg({
    con_id,
    lastMssg: {
      lastMessage: filename,
      lastMssgBy: session,
      lastMssgTime: new Date().getTime(),
      lastMssgType: 'image'
    }
  }))

  messageScroll()
  $('.overlay-2').hide()
  Notify({ value: 'Commented!!' })
}

/** STICKER MESSAGE */
export const stickerMessage = async options => {
  let
    { con_id, grp_con_id, con_with, sticker, dispatch } = options,
    session = $('.data').data('session'),
    { data: { filename, message_id } } = await post('/api/sticker-message', { con_id, grp_con_id, con_with, sticker })

  dispatch(messaged({
    con_id,
    grp_con_id,
    message: filename,
    message_id,
    message_time: new Date().getTime(),
    mssg_by: session,
    mssg_to: con_with,
    type: 'sticker'
  }))

  dispatch(changeLastMssg({
    con_id,
    lastMssg: {
      lastMessage: filename,
      lastMssgBy: session,
      lastMssgTime: new Date().getTime(),
      lastMssgType: 'sticker'
    }
  }))

  Notify({ value: 'Messaged!!' })
  messageScroll()
}

/** UNSEND ALL MSSGS */
export const deleteYourMssgs = async options => {
  let
    { con_id, dispatch } = options,
    session = $('.data').data('session')

  await post('/api/unsend-all-mssgs', { con_id })
  dispatch(unsendAllMessages(session))
  Notify({ value: 'Deleted all your messages!!' })
}

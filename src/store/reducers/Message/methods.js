export const addCon = (cons, con) => {
  cons = [con, ...cons]
  return cons
}

export const message = (messages, message) => {
  messages = [...messages, message]
  return messages
}

export const changeLastMssg = (conversations, mssgDet) => {
  return conversations.map(c => {
    if (c.con_id == mssgDet.con_id) {
      c.lastMssg = mssgDet.lastMssg
    }
    return c
  })
}

export const deleteMssg = (messages, message_id) =>
  messages.filter(m => m.message_id != message_id)

export const unsendAllMssgs = (messages, mssg_by) =>
  messages.filter(m => m.mssg_by != mssg_by)

export const deleteConversation = (cons, con_id) =>
  cons.filter(c => c.con_id != con_id)

export const readCon = (cons, con_id) => {
  return cons.map(c => {
    if (c.con_id == con_id) {
      c.unreadMssgs = 0
    }
    return c
  })
}

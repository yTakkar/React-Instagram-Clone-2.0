import React from 'react'
import PropTypes from 'prop-types'
import LastMssg from './lastMssg'
import UnreadMssgs from './unreadMssgs'
import MyLastMssg from './myLastMssg'
import LastMssgTime from './lastMssgTime'
import classNames from 'classnames'

const ConversationTeaser = props => {
  let {
    con_id,
    con_with,
    con_with_username,
    unreadMssgs,
    select,
    lastMssg: { lastMssgTime, lastMessage, lastMssgBy, lastMssgType },
  } = props

  return (
    <div className={classNames('mssg_sr', `mt_${con_id}`)} onClick={select}>
      <img src={`/users/${con_with}/avatar.jpg`} />

      <div className="m_sr_content">
        <span className="m_sr_username">{con_with_username}</span>
        <span className="m_sr_light">
          <MyLastMssg lastMssgBy={lastMssgBy} />

          <LastMssg lastMessage={lastMessage} lastMssgType={lastMssgType} />
        </span>
      </div>

      <LastMssgTime lastMssgTime={lastMssgTime} />
      <UnreadMssgs unreadMssgs={unreadMssgs} />
    </div>
  )
}

ConversationTeaser.propTypes = {
  con_id: PropTypes.number.isRequired,
  con_with: PropTypes.number.isRequired,
  con_with_username: PropTypes.string.isRequired,
  unreadMssgs: PropTypes.number.isRequired,
  lastMssg: PropTypes.shape({
    lastMessage: PropTypes.string,
    lastMssgBy: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // if no last message, it's an empty string else it's a number
    lastMssgTime: PropTypes.string,
    lastMssgType: PropTypes.oneOf(['text', 'image', 'sticker', '']),
  }),
  select: PropTypes.func.isRequired,
}

export default ConversationTeaser

import React from 'react'
import { Link } from 'react-router-dom'
import TimeAgo from 'handy-timeago'
import { connect } from 'react-redux'

const ConversationInfo = ({ cd }) => {
  let {
    con_with, con_with_username, con_with_firstname, con_with_surname, isOnline, lastOnline
  } = cd

  return (
    <div>
      <img
        src={`/users/${con_with}/avatar.jpg`}
        className='con_with_avatar'
      />
      <div className='m_m_t_c'>
        <Link
          to={`/profile/${con_with_username}`}
          className='con_name'
        >{ con_with_username }</Link>
        <span className='m_m_t_useless'>
          {
            isOnline ? 'online'
              : lastOnline ? `Last active ${TimeAgo(lastOnline)}`
                : `${con_with_firstname} ${con_with_surname}`
          }
        </span>
      </div>
    </div>
  )
}

const mapStateToProps = state => (
  { cd: state.Message.conDetails }
)

export default connect(mapStateToProps)(ConversationInfo)

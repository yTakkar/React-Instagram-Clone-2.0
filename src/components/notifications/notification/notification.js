import React from 'react'
import TimeAgo from 'handy-timeago'
import { Link } from 'react-router-dom'
import NotificationType from './type'
import NotificationActionType from './action-type/action-type'
import PropTypes from 'prop-types'

const Notification = props => {
  let {
    notify_by, notify_by_username, notify_time, type, user_username
  } = props

  return (
    <div className='noti follow_noti'>
      <img
        src={`/users/${notify_by}/avatar.jpg`}
        className='noti_avatar'
      />

      <div className='noti_left'>
        <Link
          to={`/profile/${notify_by_username}`}
          className='noti_bold noti_username'
        >{ notify_by_username }</Link>

        <NotificationType
          type={type}
          user_username={user_username}
        />
        <span className='noti_time'>{ TimeAgo(notify_time) }</span>
      </div>

      <NotificationActionType
        details={{ ...props }}
      />
    </div>
  )
}

Notification.propTypes = {
  notify_id: PropTypes.number.isRequired,
  notify_by: PropTypes.number.isRequired,
  notify_by_username: PropTypes.string.isRequired,
  notify_time: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  user: PropTypes.number.isRequired,
  user_username: PropTypes.string.isRequired,
  post_id: PropTypes.number.isRequired,
  group_id: PropTypes.number.isRequired,
  isFollowing: PropTypes.bool.isRequired
}

export default Notification

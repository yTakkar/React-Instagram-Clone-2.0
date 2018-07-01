import React from 'react'
import TimeAgo from 'handy-timeago'
import NotificationType from './type'
import NotificationActionType from './action-type/action-type'
import PropTypes from 'prop-types'
import AppLink from '../../others/link/link'

const Notification = props => {
  let {
    notify_by,
    notify_by_username,
    notify_time,
    type,
    user_username,
  } = props

  return (
    <div className="noti follow_noti">
      <img src={`/users/${notify_by}/avatar.jpg`} className="noti_avatar" />

      <div className="noti_left">
        <AppLink
          url={`/profile/${notify_by_username}`}
          className="noti_bold noti_username"
          label={notify_by_username}
        />

        <NotificationType type={type} user_username={user_username} />
        <span className="noti_time">{TimeAgo(notify_time)}</span>
      </div>

      <NotificationActionType details={{ ...props }} />
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
  isFollowing: PropTypes.bool.isRequired,
}

export default Notification

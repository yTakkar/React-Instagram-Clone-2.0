import React from 'react'
import ToolTip from 'react-tooltip'
import { connect } from 'react-redux'
import Notify from 'handy-notification'
import { clearNotifications } from '../../actions/notification'
import MaterialIcon from '../others/icons/material-icon'

const NotificationsHeader = ({ len, dispatch }) => {
  let clear = () => {
    dispatch(clearNotifications())
    Notify({ value: 'Notifications cleared!!' })
  }

  return (
    <div className="notifications_header">
      <span className="noti_count">{len == 0 ? 'No' : len} notifications</span>

      {len != 0 && (
        <div>
          <span
            onClick={clear}
            className="clear_noti"
            data-tip="Clear notifications"
          >
            <MaterialIcon icon="clear_all" />
          </span>
          <ToolTip />
        </div>
      )}
    </div>
  )
}

const mapStateToProps = state => ({
  len: state.Notification.notifications.length,
})

export default connect(mapStateToProps)(NotificationsHeader)

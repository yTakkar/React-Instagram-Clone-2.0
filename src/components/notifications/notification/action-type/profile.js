import React from 'react'
import PropTypes from 'prop-types'
import AppLink from '../../../others/link/link'

const NotificationTypeProfile = ({ user_username }) => (
  <AppLink
    url={`/profile/${user_username}`}
    className="pri_btn"
    label={`View ${user_username}`}
  />
)

NotificationTypeProfile.propTypes = {
  user_username: PropTypes.string.isRequired,
}

export default NotificationTypeProfile

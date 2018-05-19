import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const NotificationTypeProfile = ({ user_username }) => (
  <Link
    to={`/profile/${user_username}`}
    className='pri_btn'
  >View {user_username}</Link>
)

NotificationTypeProfile.propTypes = {
  user_username: PropTypes.string.isRequired,
}

export default NotificationTypeProfile

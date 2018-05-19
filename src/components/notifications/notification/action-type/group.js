import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const NotificationTypeGroup = ({ group_id }) => (
  <Link
    to={`/group/${group_id}`}
    className='pri_btn'
  >View group</Link>
)

NotificationTypeGroup.propTypes = {
  group_id: PropTypes.number.isRequired
}

export default NotificationTypeGroup

import React from 'react'
import PropTypes from 'prop-types'
import AppLink from '../../../others/link/link'

const NotificationTypeGroup = ({ group_id }) => (
  <AppLink to={`/group/${group_id}`} className="pri_btn" label="View group" />
)

NotificationTypeGroup.propTypes = {
  group_id: PropTypes.number.isRequired,
}

export default NotificationTypeGroup

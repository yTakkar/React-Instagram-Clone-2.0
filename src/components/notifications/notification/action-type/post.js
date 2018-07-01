import React from 'react'
import PropTypes from 'prop-types'
import AppLink from '../../../others/link/link'

const NotificationTypePost = ({ post_id }) => (
  <AppLink url={`/post/${post_id}`} className="pri_btn" label="Open post" />
)

NotificationTypePost.propTypes = {
  post_id: PropTypes.number.isRequired,
}

export default NotificationTypePost

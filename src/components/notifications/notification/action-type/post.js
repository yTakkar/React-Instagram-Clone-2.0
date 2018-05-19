import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const NotificationTypePost = ({ post_id }) => (
  <Link
    to={`/post/${post_id}`}
    className='pri_btn'
  >Open post</Link>
)

NotificationTypePost.propTypes = {
  post_id: PropTypes.number.isRequired,
}

export default NotificationTypePost

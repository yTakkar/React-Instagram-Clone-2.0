import React, { Fragment } from 'react'
import { isAdmin } from '../../../../../utils/admin-utils'
import { post } from 'axios'
import Notify from 'handy-notification'
import { unbookmark } from '../../../../../actions/post'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const RemBookmarkAsAdmin = ({ post_id, user, when, dispatch }) => {
  let remBookmarkAsAdmin = async e => {
    e.preventDefault()
    await post('/api/unbookmark-post', { post: post_id, user })
    dispatch(unbookmark(post_id))
    Notify({ value: 'Post unbookmarked as admin!!' })
  }

  return (
    <Fragment>
      {when == 'bookmarks' &&
        isAdmin() && (
          <li>
            <a href="#" onClick={remBookmarkAsAdmin}>
              Remove bookmark as admin
            </a>
          </li>
        )}
    </Fragment>
  )
}

RemBookmarkAsAdmin.propTypes = {
  post_id: PropTypes.number.isRequired,
  user: PropTypes.number.isRequired,
  when: PropTypes.string.isRequired,
}

export default connect()(RemBookmarkAsAdmin)
export { RemBookmarkAsAdmin as PureRemBookmarkAsAdmin }

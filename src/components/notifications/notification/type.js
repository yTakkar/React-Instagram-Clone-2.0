import React from 'react'
import PropTypes from 'prop-types'

const NotificationType = ({ type, user_username }) => {
  return (
    <span>
      {/* eslint-disable */

        type == 'follow' ? ' started following you'
        : type == 'tag' ? ' tagged you in a post'
        : type == 'like' ? ' liked your post'
        : type == 'share' ? ' shared you a post'
        : type == 'shared_your_post' ? ' shared your post'
        : type == 'comment' ? ' commented on your post'
        : type == 'favourites' ? ' added you to favourites'
        : type == 'recommend' ? ` recommended ${user_username} to you`
        : type == 'add_grp_member' ? ' added you to a group'
        : type == 'invite' ? ' invited to a group'
        : type == 'change_admin' ? ' made you admin of a group'
        : type == 'new_con' ? ' created a conversation with you'
        : type == 'mention_post' ? ' mentioned you in a post'
        : type == 'mention_comment' ? ' mentioned you in a comment'
        : null
        /** eslint-enable */
      }
    </span>
  )
}

NotificationType.propTypes = {
  type: PropTypes.string.isRequired,
  user_username: PropTypes.string
}

export default NotificationType

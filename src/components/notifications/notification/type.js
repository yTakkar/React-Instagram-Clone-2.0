import React from 'react'
import PropTypes from 'prop-types'

const NotificationType = ({ type, user_username }) => {
  let text = ''
  switch (type) {
    case 'follow': text = ' started following you'; break;
    case 'tag': text = ' tagged you in a post'; break;
    case 'like': text = ' liked your post'; break;
    case 'share': text = ' shared you a post'; break;
    case 'shared_your_post': text = ' shared your post'; break;
    case 'comment': text = ' commented on your post'; break;
    case 'favourites': text = ' added you to favourites'; break;
    case 'friend_request': text = ' sent you a friend request'; break;
    case 'friend_accept': text = ' accepted your friend request'; break;
    case 'recommend': text = ` recommended ${user_username} to you`; break;
    case 'add_grp_member': text = ' added you to a group'; break;
    case 'invite': text = ' invited to a group'; break;
    case 'change_admin': text = ' made you admin of a group'; break;
    case 'new_con': text = ' created a conversation with you'; break;
    case 'mention_post': text = ' mentioned you in a post'; break;
    case 'mention_comment': text = ' mentioned you in a comment'; break;
    default: text = ` [${type}]`; break;
  }

  return <span>{text}</span>
}

NotificationType.propTypes = {
  type: PropTypes.string.isRequired,
  user_username: PropTypes.string
}

export default NotificationType

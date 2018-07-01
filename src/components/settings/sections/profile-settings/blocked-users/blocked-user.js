import React from 'react'
import { humanReadable } from '../../../../../utils/utils'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { unblock } from '../../../../../utils/setting-utils'
import SecondaryButton from '../../../../others/button/secondary-btn'
import AppLink from '../../../../others/link/link'

const BlockedUser = props => {
  let {
    block_id,
    user,
    username,
    firstname,
    surname,
    mutualFollowersCount,
    dispatch,
  } = props

  let unblockUser = e => {
    e.preventDefault()
    unblock({ block_id, username, dispatch })
  }

  return (
    <div className="blocked_users">
      <img src={`/users/${user}/avatar.jpg`} />

      <div className="blocked_u_content">
        <div className="blocked_info">
          <AppLink
            url={`/profile/${username}`}
            className="blocked_username"
            label={username}
          />

          <span className="blocked_mutual">
            {mutualFollowersCount == 0
              ? `${firstname} ${surname}`
              : humanReadable(mutualFollowersCount, 'mutual follower')}
          </span>
        </div>

        <SecondaryButton
          label="Unblock"
          onClick={unblockUser}
          extraClass="unblock"
        />
      </div>
    </div>
  )
}

BlockedUser.propTypes = {
  block_id: PropTypes.number.isRequired,
  block_time: PropTypes.string.isRequired,
  user: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  firstname: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  mutualFollowersCount: PropTypes.number.isRequired,
}

export default connect()(BlockedUser)
export { BlockedUser as PureBlockedUser }

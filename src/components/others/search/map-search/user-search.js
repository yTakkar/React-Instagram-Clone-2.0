import React from 'react'
import { Link } from 'react-router-dom'
import { humanReadable } from '../../../../utils/utils'
import PropTypes from 'prop-types'

const UserSearch = props => {
  let {
    id, username, firstname, surname, mutualFollowersCount, clicked
  } = props

  return (
    <div className='s_d_peo' onClick={clicked} >
      <Link className='s_d_p' to={`/profile/${username}`} >
        <img src={`/users/${id}/avatar.jpg`} />
        <div className='s_d_c'>
          <span className='s_d_username'>{username}</span>
          <span>
            {
              mutualFollowersCount == 0
                ? `${firstname} ${surname}`
                : humanReadable(mutualFollowersCount, 'mutual follower')
            }
          </span>
        </div>
      </Link>
    </div>
  )
}

UserSearch.propTypes = {
  id: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  firstname: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  mutualFollowersCount: PropTypes.number.isRequired,
  clicked: PropTypes.func.isRequired
}

export default UserSearch

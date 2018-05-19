import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { humanReadable } from '../../../utils/utils'

const MonTopInfo = ({ info, basedOnMutuals }) => {
  let {
    user, username, firstname, surname, mutuals
  } = info


  return (
    <div className='m_top'>
      <img src={`/users/${user}/avatar.jpg`} />
      <div className='m_top_right'>
        <Link to={`/profile/${username}`} >{username}</Link>
        {
          basedOnMutuals ?
            <span>
              {
                mutuals == 0 ?
                  `${firstname} ${surname}`
                  : humanReadable(mutuals, 'mutual follower')
              }
            </span>
            :
            <span>{firstname} {surname}</span>
        }
      </div>
    </div>
  )
}

MonTopInfo.defaultProps = {
  basedOnMutuals: false,
  mutuals: 0
}

MonTopInfo.propTypes = {
  info: PropTypes.shape({
    user: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    firstname: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    mutuals: PropTypes.number
  }).isRequired,
  basedOnMutuals: PropTypes.bool
}

export default MonTopInfo

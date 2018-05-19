import React from 'react'
import { Link } from 'react-router-dom'
import ToolTip from 'react-tooltip'
import { connect } from 'react-redux'
import { humanReadable } from '../../utils/utils'
import PropTypes from 'prop-types'
import FAIcon from '../others/icons/font-awesome-icon'

const MutualUsers = ({ mutuals, username }) => {
  let
    len = mutuals.length,
    map_mutuals = mutuals.map(u =>
      <Link
        key={u.follow_id}
        to={`/profile/${u.username}`}
        data-tip={u.username}
        className='mutual_links'
      >
        <img src={`/users/${u.user}/avatar.jpg`} />
      </Link>
    )

  return (
    <div>

      {
        len == 0
          ?
          <div className='no_such_mutual'>
            <span>No followers you know</span>
          </div>
          :
          <div className='mutuals'>
            <div className='mutual_info'>
              <span>{ humanReadable(len, 'follower') } you might know</span>
              <Link to={`/profile/${username}/people-you-know`} data-tip='view all' className='view_all_yk'>
                <FAIcon icon='chevron-right' />
              </Link>
            </div>
            <div className='mutual_main'>
              { map_mutuals }
            </div>
            <ToolTip/>
          </div>
      }

    </div>
  )
}

MutualUsers.propTypes = {
  username: PropTypes.string.isRequired
}

const mapStateToProps = state => (
  { mutuals: state.User.mutualUsers }
)

export default connect(mapStateToProps)(MutualUsers)

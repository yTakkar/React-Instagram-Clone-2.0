import React from 'react'
import ToolTip from 'react-tooltip'
import { connect } from 'react-redux'
import { humanReadable } from '../../../utils/utils'
import PropTypes from 'prop-types'
import FAIcon from '../../others/icons/font-awesome-icon'
import AppLink from '../../others/link/link'

const MutualUsers = ({ mutuals, username }) => {
  let len = mutuals.length,
    map_mutuals = mutuals.map(u => (
      <AppLink
        key={u.follow_id}
        url={`/profile/${u.username}`}
        data-tip={u.username}
        className="mutual_links"
      >
        <img src={`/users/${u.user}/avatar.jpg`} />
      </AppLink>
    ))

  return (
    <div>
      {len == 0 ? (
        <div className="no_such_mutual">
          <span>No followers you know</span>
        </div>
      ) : (
        <div className="mutuals">
          <div className="mutual_info">
            <span>{humanReadable(len, 'follower')} you might know</span>

            <AppLink
              url={`/profile/${username}/people-you-know`}
              data-tip="view all"
              className="view_all_yk"
            >
              <FAIcon icon="chevron-right" />
            </AppLink>
          </div>

          <div className="mutual_main">{map_mutuals}</div>

          <ToolTip />
        </div>
      )}
    </div>
  )
}

MutualUsers.propTypes = {
  username: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({ mutuals: state.User.mutualUsers })

export default connect(mapStateToProps)(MutualUsers)

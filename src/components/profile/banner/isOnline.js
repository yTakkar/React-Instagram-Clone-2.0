import React, { Fragment } from 'react'
import { Me } from '../../../utils/utils'
import TimeAgo from 'handy-timeago'
import { connect } from 'react-redux'

const IsOnline = ({ ud }) => {
  let { id, isOnline, lastOnline } = ud

  return (
    <Fragment>
      {!Me(id) &&
        isOnline && (
          <span className="grp_admin user_online">
            <span className="user_online_circle" />
            <span>online</span>
          </span>
        )}

      {!Me(id) &&
        !isOnline &&
        lastOnline && (
          <span className="last_online">Last active {TimeAgo(lastOnline)}</span>
        )}
    </Fragment>
  )
}

const mapStateToProps = state => ({
  ud: state.User.user_details,
})

export default connect(mapStateToProps)(IsOnline)

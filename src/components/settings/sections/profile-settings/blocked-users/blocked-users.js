import React from 'react'
import BlockedUser from './blocked-user'
import Nothing from '../../../../others/nothing'
import { connect } from 'react-redux'

const BlockedUsers = ({ blockedUsers }) => {
  let map_users = blockedUsers.map(b => <BlockedUser key={b.block_id} {...b} />)

  return (
    <div className="blocking">
      <div className="set_header block_header">
        <span className="acc_type_h">Your blocked members</span>
      </div>
      {blockedUsers.length == 0 ? (
        <Nothing mssg="No blocked members" />
      ) : (
        map_users
      )}
    </div>
  )
}

const mapStateToProps = state => ({
  blockedUsers: state.Setting.blockedUsers,
})

export default connect(mapStateToProps)(BlockedUsers)

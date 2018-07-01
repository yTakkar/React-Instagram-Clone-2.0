import React from 'react'
import TimeAgo from 'handy-timeago'
import { object } from 'prop-types'
import AppLink from '../../../../others/link/link'

const UserGroupInfo = ({ info }) => {
  let { group_id, name, member, joined_group, admin } = info

  return (
    <div className="m_top">
      <img src={`/groups/${group_id}/avatar.jpg`} />
      <div className="m_top_right">
        <AppLink url={`/group/${group_id}`} label={name} />
        {member == admin && <span className="grp_admin">admin</span>}
        <span>{TimeAgo(joined_group)}</span>
      </div>
    </div>
  )
}

UserGroupInfo.propTypes = {
  info: object.isRequired,
}

export default UserGroupInfo

import React from 'react'
import { Link } from 'react-router-dom'
import TimeAgo from 'handy-timeago'
import { object } from 'prop-types'

const UserGroupInfo = ({ info }) => {
  let { group_id, name, member, joined_group, admin } = info

  return (
    <div className='m_top'>
      <img src={`/groups/${group_id}/avatar.jpg`} />
      <div className='m_top_right'>
        <Link to={`/group/${group_id}`} >{ name }</Link>
        {
          member == admin
            ? <span className='grp_admin'>admin</span>
            : null
        }
        <span>{ TimeAgo(joined_group) }</span>
      </div>
    </div>
  )
}

UserGroupInfo.propTypes = {
  info: object.isRequired
}

export default UserGroupInfo

import React from 'react'
import { Link } from 'react-router-dom'
import ToolTip from 'react-tooltip'
import { connect } from 'react-redux'

@connect(store => {
  return {
    mutualMembers: store.Group.mutualMembers
  }
})

export default class MutualMembers extends React.Component {
  render() {
    let
      { mutualMembers, group } = this.props,
      len = mutualMembers.length,
      map_mutuals = mutualMembers.map(u =>
        <Link key={u.user} to={`/profile/${u.username}`} data-tip={u.username} className='mutual_links'>
          <img src={`/users/${u.user}/avatar.jpg`} />
        </Link>
      )

    return (
      <div>

        {
          len != 0
            ?
            <div className='mutuals'>
              <div className='mutual_info'>
                <span>Members you know</span>
                <Link to={`/group/${group}/members`} data-tip='view all' className='view_all_yk'>
                  <i className='fa fa-chevron-right' aria-hidden='true'></i>
                </Link>
              </div>
              <div className='mutual_main'>
                { map_mutuals }
              </div>
              <ToolTip/>
            </div>
            : null
        }

      </div>
    )
  }
}

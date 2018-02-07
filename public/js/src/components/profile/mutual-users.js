import React from 'react'
import { Link } from 'react-router-dom'
import ToolTip from 'react-tooltip'
import { connect } from 'react-redux'
import { humanReadable } from '../../utils/utils'

@connect(store => {
  return {
    _mutuals: store.User.mutualUsers
  }
})

export default class MutualUsers extends React.Component {
  render() {
    let
      { _mutuals, username } = this.props,
      mutuals = _mutuals.slice(0, 10),
      len = mutuals.length,
      map_mutuals = mutuals.map(u =>
        <Link key={u.follow_id} to={`/profile/${u.username}`} data-tip={u.username} className='mutual_links'>
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
                  <i className='fa fa-chevron-right' aria-hidden='true'></i>
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
}

import React from 'react'
import { Link } from 'react-router-dom'
import { humanReadable } from '../../../utils/utils'

export default class GroupSearch extends React.Component {
  render() {
    let { group_id, name, membersCount, mutualMembersCount } = this.props

    return (
      <div className='s_d_peo'>
        <Link className='s_d_p' to={`/group/${group_id}`} >
          <img src={`/groups/${group_id}/avatar.jpg`} />
          <div className='s_d_c'>
            <span className='s_d_username'>{ name }</span>
            <span>
              {
                mutualMembersCount == 0 ?
                  humanReadable(membersCount, 'member')
                  : humanReadable(mutualMembersCount, 'mutual member')
              }
            </span>
          </div>
        </Link>
      </div>
    )
  }
}

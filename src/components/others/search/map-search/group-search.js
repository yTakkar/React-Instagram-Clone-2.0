import React from 'react'
import { Link } from 'react-router-dom'
import { humanReadable } from '../../../../utils/utils'
import PropTypes from 'prop-types'

const GroupSearch = props => {
  let {
    group_id, name, membersCount, mutualMembersCount, clicked
  } = props

  return (
    <div className='s_d_peo' onClick={clicked} >
      <Link className='s_d_p' to={`/group/${group_id}`} >
        <img src={`/groups/${group_id}/avatar.jpg`} />
        <div className='s_d_c'>
          <span className='s_d_username'>{ name }</span>
          <span>
            {
              mutualMembersCount == 0
                ? humanReadable(membersCount, 'member')
                : humanReadable(mutualMembersCount, 'mutual member')
            }
          </span>
        </div>
      </Link>
    </div>
  )
}

GroupSearch.propTypes = {
  group_id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  membersCount: PropTypes.number.isRequired,
  mutualMembersCount: PropTypes.number.isRequired,
  clicked: PropTypes.func.isRequired
}

export default GroupSearch

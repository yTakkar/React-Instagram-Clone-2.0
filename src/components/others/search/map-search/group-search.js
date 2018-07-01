import React, { Fragment } from 'react'
import { humanReadable } from '../../../../utils/utils'
import PropTypes from 'prop-types'
import AppLink from '../../link/link'

const GroupSearch = props => {
  let { group_id, name, membersCount, mutualMembersCount, clicked } = props

  return (
    <div className="s_d_peo" onClick={clicked}>
      <AppLink className="s_d_p" url={`/group/${group_id}`}>
        <Fragment>
          <img src={`/groups/${group_id}/avatar.jpg`} />
          <div className="s_d_c">
            <span className="s_d_username">{name}</span>
            <span>
              {mutualMembersCount == 0
                ? humanReadable(membersCount, 'member')
                : humanReadable(mutualMembersCount, 'mutual member')}
            </span>
          </div>
        </Fragment>
      </AppLink>
    </div>
  )
}

GroupSearch.propTypes = {
  group_id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  membersCount: PropTypes.number.isRequired,
  mutualMembersCount: PropTypes.number.isRequired,
  clicked: PropTypes.func.isRequired,
}

export default GroupSearch

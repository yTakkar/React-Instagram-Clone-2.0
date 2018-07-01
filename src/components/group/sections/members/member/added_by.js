import React from 'react'
import { Me } from '../../../../../utils/utils'
import PropTypes from 'prop-types'
import AppLink from '../../../../others/link/link'

const MemberAddedBy = ({ memberDetails }) => {
  let { member, added_by, added_by_username } = memberDetails

  return (
    <span className="recommend_by">
      {member != added_by && (
        <div>
          by{' '}
          <AppLink
            url={`/profile/${added_by_username}`}
            label={Me(added_by) ? 'You' : added_by_username}
          />
        </div>
      )}
    </span>
  )
}

MemberAddedBy.propTypes = {
  memberDetails: PropTypes.shape({
    member: PropTypes.number.isRequired,
    added_by: PropTypes.number.isRequired,
    added_by_username: PropTypes.string.isRequired,
  }).isRequired,
}

export default MemberAddedBy

import React from 'react'
import { Me } from '../../../../../utils/utils'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const MemberAddedBy = ({ memberDetails }) => {
  let { member, added_by, added_by_username } = memberDetails

  return (
    <span className='recommend_by' >
      {
        member != added_by ?
          <div>
            by <Link
              to={`/profile/${added_by_username}`}
            >{ Me(added_by) ? 'You' : added_by_username }</Link>
          </div>
          : null
      }
    </span>
  )
}

MemberAddedBy.propTypes = {
  memberDetails: PropTypes.shape({
    member: PropTypes.number.isRequired,
    added_by: PropTypes.number.isRequired,
    added_by_username: PropTypes.string.isRequired
  }).isRequired
}

export default MemberAddedBy

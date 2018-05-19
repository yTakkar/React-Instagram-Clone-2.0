import React from 'react'
import { Me } from '../../../../utils/utils'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const SharerInfo = ({ sharerDetails }) => {
  let {
    share_by, share_to, share_by_username, share_to_username
  } = sharerDetails

  return (
    <div className='modal_it_info'>
      <Link to={`/profile/${share_by_username}`} className='modal_it_username' >
        { Me(share_by) ? 'You' : share_by_username }
      </Link>
      <span className='modal_it_light' >
        to { Me(share_to) ? 'You' : share_to_username }
      </span>
    </div>
  )
}

SharerInfo.propTypes = {
  sharerDetails: PropTypes.shape({
    share_by: PropTypes.number.isRequired,
    share_to: PropTypes.number.isRequired,
    share_by_username: PropTypes.string.isRequired,
    share_to_username: PropTypes.string.isRequired
  }).isRequired
}

export default SharerInfo

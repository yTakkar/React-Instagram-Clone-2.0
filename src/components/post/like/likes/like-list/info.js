import React from 'react'
import { Link } from 'react-router-dom'
import TimeAgo from 'handy-timeago'
import { Me } from '../../../../../utils/utils'
import { number, shape, string } from 'prop-types'

const LikeInfo = ({ likeDetails }) => {
  let { like_by, username, like_time } = likeDetails

  return (
    <div className='modal_it_info'>
      <Link to={`/profile/${username}`} className='modal_it_username' >
        { Me(like_by) ? 'You' : username }
      </Link>
      <span className='modal_it_light' >{TimeAgo(like_time)}</span>
    </div>
  )
}

LikeInfo.propTypes = {
  likeDetails: shape({
    like_by: number.isRequired,
    username: string.isRequired,
    like_time: string.isRequired
  })
}

export default LikeInfo

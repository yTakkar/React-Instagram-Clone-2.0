import React from 'react'
import { Me } from '../../../utils/utils'
import { connect } from 'react-redux'
import { toggleFollow } from '../../../store/actions/follow_a'
import { Link } from 'react-router-dom'
import Unfollow from '../../others/follow/unfollow'
import Follow from '../../others/follow/follow'

const BannerFollow = ({ ud, isFollowing, dispatch }) => {
  let { id, username } = ud
  let user = id ? id : 0 

  let toggle = what =>
    dispatch(toggleFollow(what))

  return (
    <div className='pro_ff' >
      {
        Me(id)
          ? <Link
            to='/edit-profile'
            className='pri_btn ff'
          >Edit profile</Link>

          : isFollowing
            ? <Unfollow
              user={user}
              unfollowed={() => toggle(false)}
              updateFollowers
            />

            : <Follow
              userDetails={{ user, username }}
              followed={() => toggle(true)}
              updateFollowers
            />
      }
    </div>
  )
}

const mapStateToProps = state => (
  {
    ud: state.User.user_details,
    isFollowing: state.Follow.isFollowing
  }
)

export default connect(mapStateToProps)(BannerFollow)

import React from 'react'
import { Me } from '../../../utils/utils'
import { connect } from 'react-redux'
import { toggleFollow } from '../../../actions/follow'
import Unfollow from '../../others/follow/unfollow'
import Follow from '../../others/follow/follow'
import AppLink from '../../others/link/link'

const BannerFollow = ({ ud, isFollowing, dispatch }) => {
  let { id, username } = ud
  let user = id ? id : 0

  let toggle = what => dispatch(toggleFollow(what))

  return (
    <div className="pro_ff">
      {Me(id) ? (
        <AppLink
          url="/edit-profile"
          label="Edit profile"
          className="pri_btn ff"
        />
      ) : isFollowing ? (
        <Unfollow
          user={user}
          unfollowed={() => toggle(false)}
          updateFollowers
        />
      ) : (
        <Follow
          userDetails={{ user, username }}
          followed={() => toggle(true)}
          updateFollowers
        />
      )}
    </div>
  )
}

const mapStateToProps = state => ({
  ud: state.User.user_details,
  isFollowing: state.Follow.isFollowing,
})

export default connect(mapStateToProps)(BannerFollow)

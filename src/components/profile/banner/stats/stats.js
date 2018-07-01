import React from 'react'
import { Me } from '../../../../utils/utils'
import { connect } from 'react-redux'
import BannerStat from './stat'

const BannerStats = props => {
  let {
    id,
    followers,
    followings,
    recommendations,
    profile_views,
    favourites,
    posts,
  } = props

  return (
    <div className="pro_bottom">
      <BannerStat disabled statType="posts" statValue={posts} />
      <BannerStat statType="followers" statValue={followers} />
      <BannerStat statType="followings" statValue={followings} />
      {Me(id) ? (
        <BannerStat statType="recommendations" statValue={recommendations} />
      ) : (
        <BannerStat statType="favourites" statValue={favourites} />
      )}
      <BannerStat disabled statType="profile views" statValue={profile_views} />
    </div>
  )
}

const mapStateToProps = state => ({
  id: state.User.user_details.id,
  posts: state.Post.posts.length,
  followers: state.Follow.followers.length,
  followings: state.Follow.followings.length,
  recommendations: state.Follow.recommendations.length,
  favourites: state.Follow.favourites.length,
  profile_views: state.Follow.profile_views,
})

export default connect(mapStateToProps)(BannerStats)

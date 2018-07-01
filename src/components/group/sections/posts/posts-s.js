import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FadeIn } from 'animate-components'
import PostItTeaser from '../../../post/post-it/post-it-teaser'
import Post from '../../../post/post/post'
import { getMutualAndNewestMembers } from '../../../../actions/group'
import MutualMembers from '../../mutual-members/mutual-members'
import NewestMembers from '../../newest-members/newest-members'
import CreateGroup from '../../create-group/create-group'
import GroupHashtags from '../../../hashtag/group-hashtags'
import GroupBio from './grp-bio'
import MapPosts from '../../../post/map-posts/map-posts'
import SectionsEnd from '../../../others/sections-end'
import AppLink from '../../../others/link/link'

class GroupPosts extends Component {
  componentDidMount = () => {
    let { dispatch, grp_id } = this.props
    dispatch(getMutualAndNewestMembers(grp_id))
  }

  render() {
    let {
        gd: { group_id, name },
        posts,
        joined,
      } = this.props,
      len = posts.length,
      map_posts = posts.map(p => (
        <Post key={p.post_id} {...p} when="groupPosts" />
      ))

    return (
      <div>
        <FadeIn duration="300ms">
          <div className="senapati pro_senapati">
            <div className="srajkumar">
              <GroupBio />
              <NewestMembers group={group_id} />
              <MutualMembers group={group_id} />
              <GroupHashtags group={group_id} />
              <CreateGroup />

              <div className="recomm_teaser">
                <span>Explore more groups from all around Instagram.</span>
                <AppLink
                  url="/explore/explore-groups"
                  className="sec_btn"
                  label="Explore"
                />
              </div>
            </div>

            <div className="prajkumar">
              {joined && <PostItTeaser type="group" group={group_id} />}
              <MapPosts
                posts={map_posts}
                nothingMssg={`${name} group has no posts!!`}
              />
            </div>
          </div>

          <SectionsEnd len={len} />
        </FadeIn>
      </div>
    )
  }
}

const mapStateToProps = store => ({
  gd: store.Group.group_details,
  joined: store.Group.joined,
  posts: store.Post.posts,
})

export default connect(mapStateToProps)(GroupPosts)
export { GroupPosts as PureGroupPosts }

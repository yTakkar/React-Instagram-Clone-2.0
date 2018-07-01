import React, { Component } from 'react'
import Post from '../../../post/post/post'
import { connect } from 'react-redux'
import { FadeIn } from 'animate-components'
import { Me } from '../../../../utils/utils'
import PropTypes from 'prop-types'
import MapPosts from '../../../post/map-posts/map-posts'
import UserPostsLeftSection from './left-section'
import SectionsEnd from '../../../others/sections-end'

@connect(store => ({
  posts: store.Post.posts,
  ud: store.User.user_details,
}))
export default class Posts extends Component {
  render() {
    let {
        posts,
        ud: { id },
        param: username,
      } = this.props,
      len = posts.length,
      map_posts = posts.map(p => (
        <Post key={p.post_id} {...p} when="userPosts" />
      ))

    return (
      <div>
        <FadeIn duration="300ms">
          <div className="senapati pro_senapati">
            <div className="srajkumar">
              <UserPostsLeftSection username={username} />
            </div>

            <div className="prajkumar">
              <MapPosts
                posts={map_posts}
                nothingMssg={
                  Me(id) ? 'You have no posts!!' : `${username} has no posts!!`
                }
              />
            </div>
          </div>

          <SectionsEnd len={len} />
        </FadeIn>
      </div>
    )
  }
}

Posts.propTypes = {
  param: PropTypes.string.isRequired,
}

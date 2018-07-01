import React, { Fragment } from 'react'
import SectionsEnd from '../../others/sections-end'
import MapPosts from '../../post/map-posts/map-posts'
import { connect } from 'react-redux'
import Post from '../../post/post/post'
import { Instagram } from 'react-content-loader'
import { bool, string } from 'prop-types'

const HashtagMiddleSection = ({ loading, hashtag, posts }) => {
  let len = posts.length
  let map_posts = posts.map(p => <Post key={p.post_id} {...p} when="hashtag" />)

  return (
    <Fragment>
      {(len == 0 || loading) && <div style={{ marginTop: 10 }} />}

      {loading && <Instagram />}

      <MapPosts
        posts={map_posts}
        nothingMssg={`No post with #${hashtag} tag found!!`}
      />

      <SectionsEnd len={len} />
      <div style={{ marginBottom: 20 }} />
    </Fragment>
  )
}

HashtagMiddleSection.propTypes = {
  loading: bool.isRequired,
  hashtag: string.isRequired,
}

const mapStateToProps = state => ({
  posts: state.Hashtag.hashtagPosts,
})

export default connect(mapStateToProps)(HashtagMiddleSection)
export { HashtagMiddleSection as PureHashtagMiddleSection }

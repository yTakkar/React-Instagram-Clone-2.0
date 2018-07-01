import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import End from '../others/end'
import Post from '../post/post/post'
import MapPosts from '../post/map-posts/map-posts'

const Feed = ({ feed }) => {
  let len = feed.length
  let map_feed = feed.map(f => <Post key={f.post_id} {...f} when="feed" />)

  let nothingMssg =
    "Looks like you're new, Follow some to fill up your feed or post from above options!!"

  return (
    <Fragment>
      <div className="posts_div" style={{ marginTop: len == 0 ? 10 : 0 }}>
        <MapPosts posts={map_feed} nothingMssg={nothingMssg} />
      </div>

      {len != 0 && <End />}
    </Fragment>
  )
}

const mapStateToProps = state => ({
  feed: state.Post.feed,
})

export default connect(mapStateToProps)(Feed)

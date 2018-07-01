import React, { Fragment } from 'react'
import Post from '../post/post'
import End from '../../others/end'
import Nothing from '../../others/nothing'
import { connect } from 'react-redux'

const ShowPost = ({ post }) => {
  let { post_id } = post

  return (
    <Fragment>
      {post_id ? (
        <Fragment>
          <Post key={post_id} {...post} when="viewPost" />
          <End />
        </Fragment>
      ) : (
        <Nothing mssg="No such post found!!" />
      )}
    </Fragment>
  )
}

const mapStateToProps = state => ({
  post: state.Post.viewPost,
})

export default connect(mapStateToProps)(ShowPost)

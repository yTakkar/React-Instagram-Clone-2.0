import React, { Component, Fragment } from 'react'
import * as PostUtils from '../../../utils/post-utils'
import { post } from 'axios'
import PropTypes from 'prop-types'
import MaterialIcon from '../../others/icons/material-icon'

export default class PostLike extends Component {
  state = {
    liked: false,
  }

  componentDidMount = async () => {
    let {
        postDetails: { post_id },
      } = this.props,
      { data: liked } = await post('/api/liked-or-not', { post: post_id })
    await this.setState({ liked })
  }

  like = async () => {
    let {
      postDetails: { post_id, user },
      incrementWhat,
    } = this.props
    PostUtils.like({
      post_id,
      user,
      done: () => {
        this.setState({ liked: true })
        incrementWhat('likes_count')
      },
    })
  }

  unlike = async () => {
    let {
      postDetails: { post_id },
      decrementWhat,
    } = this.props
    PostUtils.unlike({
      post_id,
      done: () => {
        this.setState({ liked: false })
        decrementWhat('likes_count')
      },
    })
  }

  render() {
    let { liked } = this.state

    return (
      <Fragment>
        <div className="p_Like_wra">
          {liked ? (
            <span
              className="p_like p_unlike_icon"
              data-tip="Unlike"
              onClick={this.unlike}
            >
              <MaterialIcon icon="favorite" />
            </span>
          ) : (
            <span
              className="p_like p_like_icon"
              data-tip="Like"
              onClick={this.like}
            >
              <MaterialIcon icon="favorite_border" />
            </span>
          )}
        </div>
      </Fragment>
    )
  }
}

PostLike.propTypes = {
  postDetails: PropTypes.shape({
    post_id: PropTypes.number.isRequired,
    user: PropTypes.number.isRequired,
  }).isRequired,
  incrementWhat: PropTypes.func.isRequired,
  decrementWhat: PropTypes.func.isRequired,
}

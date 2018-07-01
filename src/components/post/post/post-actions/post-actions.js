import React, { Component } from 'react'
import PostLike from '../../like/post-like'
import PostBookmark from '../../bookmark/post-bookmark'
import PostShare from '../../share/post-share'
import { shape, number, string } from 'prop-types'
import ShowLikes from './show-likes'
import ShowShares from './show-sharers'

export default class PostActions extends Component {
  state = {
    likes_count: 0,
    shares_count: 0,
  }

  incrementWhat = what => this.setState({ [what]: this.state[what] + 1 })
  decrementWhat = what => this.setState({ [what]: this.state[what] - 1 })

  componentDidMount = () => {
    let {
      postDetails: { likes_count, shares_count },
    } = this.props
    this.setState({ likes_count, shares_count })
  }

  render() {
    let {
      postDetails: { post_id, user, when },
    } = this.props
    let { likes_count, shares_count } = this.state

    let childProps = {
      postDetails: { post_id, user },
      incrementWhat: this.incrementWhat,
      decrementWhat: this.decrementWhat,
    }

    return (
      <div>
        <div className="p_a">
          <div className="p_do">
            <PostLike {...childProps} />
            <PostBookmark postDetails={{ post_id, when }} />
            <PostShare {...childProps} />
          </div>

          <div className="p_did">
            <ShowLikes
              post_id={post_id}
              likes_count={likes_count}
              decrementLikes={() => this.decrementWhat('likes_count')}
            />

            <ShowShares
              post_id={post_id}
              shares_count={shares_count}
              decrementSharers={() => this.decrementWhat('shares_count')}
            />
          </div>
        </div>
      </div>
    )
  }
}

PostActions.propTypes = {
  postDetails: shape({
    post_id: number.isRequired,
    user: number.isRequired,
    when: string.isRequired,
    likes_count: number.isRequired,
    shares_count: number.isRequired,
  }).isRequired,
}

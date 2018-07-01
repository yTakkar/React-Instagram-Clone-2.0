import React, { Component } from 'react'
import TimeAgo from 'handy-timeago'
import PostTop from './post-top/post-top'
import PropTypes from 'prop-types'
import PostImage from './post-middle/post-image'
import PostActions from './post-actions/post-actions'
import PostBottom from './post-bottom/post-bottom'
import AppLink from '../../others/link/link'

export default class Post extends Component {
  state = {
    description: '',
  }

  componentDidMount = async () =>
    this.setState({ description: this.props.description })

  render() {
    let { when, share_by_username, share_time } = this.props
    let { description } = this.state

    return (
      <div className="posts">
        {when == 'shared' && (
          <div className="post_share_info">
            by{' '}
            <AppLink
              url={`/profile/${share_by_username}`}
              label={share_by_username}
            />
            <span>{share_time ? TimeAgo(share_time) : null}</span>
          </div>
        )}

        <PostTop
          postDetails={{
            ...this.props,
            description,
          }}
          updateDescription={value => this.setState({ description: value })}
        />

        <PostImage
          postDetails={{
            ...this.props,
            description,
          }}
        />

        <hr className="img_d_hr" />
        <PostActions postDetails={{ ...this.props }} />
        <hr />
        <PostBottom postDetails={{ ...this.props }} />
      </div>
    )
  }
}

Post.propTypes = {
  post_id: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  user: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  firstname: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  filter: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['user', 'group']).isRequired,
  group_id: PropTypes.number,
  group_name: PropTypes.string,
  post_time: PropTypes.string.isRequired,
  share_by_username: PropTypes.string,
  share_time: PropTypes.string,
  when: PropTypes.oneOf([
    'feed',
    'viewPost',
    'userPosts',
    'bookmarks',
    'shared',
    'tagged',
    'groupPosts',
    'hashtag',
  ]).isRequired,
  likes_count: PropTypes.number.isRequired,
  shares_count: PropTypes.number.isRequired,
  comments_count: PropTypes.number.isRequired,
  tags_count: PropTypes.number.isRequired,
  comments: PropTypes.array,
}

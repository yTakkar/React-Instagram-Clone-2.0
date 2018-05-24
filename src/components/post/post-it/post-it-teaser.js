import React, { Component } from 'react'
import PostIt from './post-it'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

@connect(store => (
  { session: store.User.session }
))

export default class PostItTeaser extends Component {

  state = {
    postIt: false
  }

  togglePostIt = e => {
    e ? e.preventDefault() : null
    this.setState({ postIt: !this.state.postIt })
  }

  render() {
    let { postIt } = this.state
    let {
      type, group, disabled,
      session: { id, username }
    } = this.props

    return (
      <div>

        <div
          className='post_it inst'
          style={{ marginBottom: type == 'group' ? 10 : null }}
        >
          <img src={`/users/${id}/avatar.jpg`} alt='Your avatar' />
          <div className='post_teaser'>
            <span
              className='p_whats_new'
              onClick={disabled ? null : this.togglePostIt}
            >What's new with you, @{username}? #cool</span>
          </div>
        </div>

        {
          postIt ?
            <PostIt
              back={this.togglePostIt}
              type={type}
              group={group}
            />
            : null
        }

      </div>
    )
  }
}

PostItTeaser.defaultProps = {
  disabled: false
}

PostItTeaser.propTypes = {
  type: PropTypes.oneOf([ 'user', 'group' ]).isRequired,
  disabled: PropTypes.bool,
  group: PropTypes.number,
}

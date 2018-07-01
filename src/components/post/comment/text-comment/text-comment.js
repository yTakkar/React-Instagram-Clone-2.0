import React, { Component, Fragment } from 'react'
import TextCommentModal from './comment-modal'
import PropTypes from 'prop-types'

export default class TextComment extends Component {
  state = {
    comment: false,
  }

  render() {
    let { comment } = this.state
    let {
      postDetails: { post_id, user, when },
      incrementComments,
    } = this.props

    return (
      <Fragment>
        <div
          className="p_cit_teaser"
          onClick={() => this.setState({ comment: true })}
        >
          <span>Wanna comment?</span>
        </div>

        {comment && (
          <TextCommentModal
            post={post_id}
            postOwner={user}
            back={() => this.setState({ comment: false })}
            incrementComments={incrementComments}
            when={when}
          />
        )}
      </Fragment>
    )
  }
}

TextComment.propTypes = {
  postDetails: PropTypes.shape({
    post_id: PropTypes.number.isRequired,
    user: PropTypes.number.isRequired,
    when: PropTypes.string.isRequired,
  }).isRequired,
  incrementComments: PropTypes.func.isRequired,
}

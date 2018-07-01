import React, { Component, Fragment } from 'react'
import * as PostUtils from '../../../utils/post-utils'
import { post } from 'axios'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import MaterialIcon from '../../others/icons/material-icon'

class PostBookmark extends Component {
  state = {
    bookmarked: false,
  }

  componentDidMount = async () => {
    let {
        postDetails: { post_id },
      } = this.props,
      { data: bookmarked } = await post('/api/bookmarked-or-not', {
        post: post_id,
      })
    this.setState({ bookmarked })
  }

  bookmark = async () => {
    let {
      postDetails: { post_id },
    } = this.props
    PostUtils.bookmark({
      post_id,
      done: () => this.setState({ bookmarked: true }),
    })
  }

  unbookmark = async () => {
    let {
      postDetails: { post_id, when },
      dispatch,
      ud: { id },
    } = this.props
    PostUtils.unbookmark({
      post_id,
      when,
      user: id,
      dispatch,
      done: () => this.setState({ bookmarked: false }),
    })
  }

  render() {
    let { bookmarked } = this.state

    return (
      <Fragment>
        <div className="p_bmrk_wra">
          {bookmarked ? (
            <span
              className="p_bookmark undo_bookmark"
              data-tip="Undo bookmark"
              onClick={this.unbookmark}
            >
              <MaterialIcon icon="bookmark" />
            </span>
          ) : (
            <span
              className="p_bookmark"
              data-tip="Bookmark"
              onClick={this.bookmark}
            >
              <MaterialIcon icon="bookmark_border" />
            </span>
          )}
        </div>
      </Fragment>
    )
  }
}

PostBookmark.propTypes = {
  postDetails: PropTypes.shape({
    post_id: PropTypes.number.isRequired,
    when: PropTypes.string.isRequired,
  }).isRequired,
}

const mapStateToProps = store => ({
  ud: store.User.user_details,
})

export default connect(mapStateToProps)(PostBookmark)
export { PostBookmark as PurePostBookmark }

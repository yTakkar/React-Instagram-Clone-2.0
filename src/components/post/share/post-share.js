import React, { Component, Fragment } from 'react'
import Share from './share/share'
import PropTypes from 'prop-types'
import MaterialIcon from '../../others/icons/material-icon'

export default class PostShare extends Component {
  state = {
    showShare: false,
  }

  _toggle = what => this.setState({ [what]: !this.state[what] })

  render() {
    let {
      postDetails: { post_id, user },
      incrementWhat,
      decrementWhat,
    } = this.props
    let { showShare } = this.state

    return (
      <Fragment>
        <div className="p_send_wra">
          <span
            className="p_send"
            data-tip="Share"
            onClick={() => this._toggle('showShare')}
          >
            <MaterialIcon icon="send" />
          </span>
        </div>

        {showShare && (
          <Share
            post={post_id}
            back={() => this._toggle('showShare')}
            postOwner={user}
            incrementShares={() => incrementWhat('shares_count')}
            decrementShares={() => decrementWhat('shares_count')}
          />
        )}
      </Fragment>
    )
  }
}

PostShare.propTypes = {
  postDetails: PropTypes.shape({
    post_id: PropTypes.number.isRequired,
    user: PropTypes.number.isRequired,
  }).isRequired,
  incrementWhat: PropTypes.func.isRequired,
  decrementWhat: PropTypes.func.isRequired,
}

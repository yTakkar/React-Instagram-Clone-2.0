import React, { Component } from 'react'
import TimeAgo from 'handy-timeago'
import { Me, wait } from '../../../../utils/utils'
import PropTypes from 'prop-types'
import MonTopInfo from '../../../others/m-on/mon-topinfo'
import MonSticky from '../../../others/m-on/mon-sticky'
import SecondaryButton from '../../../others/button/secondary-btn'
import AppLink from '../../../others/link/link'
import { connect } from 'react-redux'
import { unfriend } from '../../../../utils/friend-utils'

class FriendsList extends Component {
  state = {
    showTime: false,
    loading: false,
  }

  showTime = () => this.setState({ showTime: true })
  hideTime = () => this.setState({ showTime: false })

  unfriendUser = e => {
    e.preventDefault()

    let { friend_id, dispatch } = this.props
    if (this.state.loading) return

    this.setState({ loading: true })
    wait()

    unfriend({
      user_id: friend_id,
      friend_id,
      dispatch,
      update_list: true,
      done: () => this.setState({ loading: false }),
    })
  }

  render() {
    let { friend_id, username, firstname, surname, friends_since } = this.props
    let { showTime, loading } = this.state

    return (
      <div
        className="m_on followers_m_on"
        onMouseOver={this.showTime}
        onMouseOut={this.hideTime}
      >
        <MonTopInfo info={{ user: friend_id, username, firstname, surname }} />

        <MonSticky show={showTime} text={TimeAgo(friends_since)} />

        <div className="m_bottom">
          {Me(friend_id) ? (
            <AppLink
              url={`/profile/${username}`}
              className="sec_btn"
              label="Profile"
            />
          ) : (
            <SecondaryButton
              label="Unfriend"
              onClick={this.unfriendUser}
              disabled={loading}
            />
          )}
        </div>
      </div>
    )
  }
}

FriendsList.propTypes = {
  request_id: PropTypes.number.isRequired,
  friend_id: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  firstname: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  friends_since: PropTypes.string.isRequired,
}

export default connect()(FriendsList)
export { FriendsList as PureFriendsList }

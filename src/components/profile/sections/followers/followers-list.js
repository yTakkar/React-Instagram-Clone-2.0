import React, { Component } from 'react'
import TimeAgo from 'handy-timeago'
import { Me } from '../../../../utils/utils'
import { post } from 'axios'
import PropTypes from 'prop-types'
import MonTopInfo from '../../../others/m-on/mon-topinfo'
import MonSticky from '../../../others/m-on/mon-sticky'
import Follow from '../../../others/follow/follow'
import Unfollow from '../../../others/follow/unfollow'
import { connect } from 'react-redux'
import AppLink from '../../../others/link/link'

class FollowersList extends Component {
  state = {
    isFollowing: false,
    showTime: false,
  }

  componentDidMount = async () => {
    let { follow_by, username } = this.props
    if (!Me(follow_by)) {
      let { data } = await post('/api/is-following', { username })
      await this.setState({ isFollowing: data })
    }
  }

  showTime = () => this.setState({ showTime: true })
  hideTime = () => this.setState({ showTime: false })

  render() {
    let {
      follow_by,
      username,
      firstname,
      surname,
      follow_time,
      id,
    } = this.props
    let { isFollowing, showTime } = this.state

    return (
      <div
        className="m_on followers_m_on"
        onMouseOver={this.showTime}
        onMouseOut={this.hideTime}
      >
        <MonTopInfo info={{ user: follow_by, username, firstname, surname }} />

        <MonSticky show={showTime} text={TimeAgo(follow_time)} />

        <div className="m_bottom">
          {Me(follow_by) ? (
            <AppLink
              url={`/profile/${username}`}
              className="sec_btn"
              label="Profile"
            />
          ) : isFollowing ? (
            <Unfollow
              user={follow_by}
              unfollowed={() => this.setState({ isFollowing: false })}
              updateFollowings={Me(id)}
            />
          ) : (
            <Follow
              userDetails={{
                user: follow_by,
                username,
                firstname,
                surname,
              }}
              followed={() => this.setState({ isFollowing: true })}
              updateFollowings={Me(id)}
            />
          )}
        </div>
      </div>
    )
  }
}

FollowersList.propTypes = {
  follow_id: PropTypes.number.isRequired,
  follow_by: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  firstname: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  follow_to: PropTypes.number.isRequired,
  follow_time: PropTypes.string.isRequired,
}

const mapStateToProps = store => ({
  id: store.User.user_details.id,
})

export default connect(mapStateToProps)(FollowersList)
export { FollowersList as PureFollowersList }

import React, { Component } from 'react'
import TimeAgo from 'handy-timeago'
import { Me } from '../../../../../utils/utils'
import { post } from 'axios'
import PropTypes from 'prop-types'
import RemoveFav from './rem-fav'
import MonTopInfo from '../../../../others/m-on/mon-topinfo'
import MonSticky from '../../../../others/m-on/mon-sticky'
import Unfollow from '../../../../others/follow/unfollow'
import Follow from '../../../../others/follow/follow'
import { connect } from 'react-redux'
import AppLink from '../../../../others/link/link'

class Favourite extends Component {
  state = {
    isFollowing: false,
    showTime: false,
  }

  componentDidMount = async () => {
    let { user, username } = this.props
    if (!Me(user)) {
      let { data: isFollowing } = await post('/api/is-following', { username })
      await this.setState({ isFollowing })
    }
  }

  showTime = () => this.setState({ showTime: true })
  hideTime = () => this.setState({ showTime: false })

  render() {
    let {
      fav_id,
      user,
      username,
      firstname,
      surname,
      fav_time,
      id,
    } = this.props
    let { isFollowing, showTime } = this.state

    return (
      <div
        className="m_on followers_m_on"
        onMouseOver={this.showTime}
        onMouseOut={this.hideTime}
      >
        <MonTopInfo info={{ user, username, firstname, surname }} />

        <MonSticky show={showTime} text={TimeAgo(fav_time)} />

        <div className="m_bottom">
          <RemoveFav fav_id={fav_id} username={username} />
          {Me(user) ? (
            <AppLink
              url={`/profile/${username}`}
              className="sec_btn"
              label="Profile"
            />
          ) : isFollowing ? (
            <Unfollow
              user={user}
              unfollowed={() => this.setState({ isFollowing: false })}
              updateFollowings={Me(id)}
            />
          ) : (
            <Follow
              userDetails={{
                user,
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

Favourite.propTypes = {
  fav_id: PropTypes.number.isRequired,
  fav_by: PropTypes.number.isRequired,
  user: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  firstname: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  fav_time: PropTypes.string.isRequired,
}

const mapStateToProps = store => ({
  id: store.User.user_details.id,
})

export default connect(mapStateToProps)(Favourite)
export { Favourite as PureFavourite }

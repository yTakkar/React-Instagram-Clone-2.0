import React, { Component } from 'react'
import { Me } from '../../../../utils/utils'
import { post } from 'axios'
import PropTypes from 'prop-types'
import MonTopInfo from '../../../others/m-on/mon-topinfo'
import Follow from '../../../others/follow/follow'
import Unfollow from '../../../others/follow/unfollow'
import { connect } from 'react-redux'
import AppLink from '../../../others/link/link'

class PeopleYouKnowList extends Component {
  state = {
    isFollowing: false,
  }

  componentDidMount = async () => {
    let { user, username } = this.props
    if (!Me(user)) {
      let { data: isFollowing } = await post('/api/is-following', { username })
      await this.setState({ isFollowing })
    }
  }

  render() {
    let {
      user,
      username,
      firstname,
      surname,
      mutualUsersCount,
      id,
    } = this.props
    let { isFollowing } = this.state

    return (
      <div className="m_on followers_m_on">
        <MonTopInfo
          info={{
            user,
            username,
            firstname,
            surname,
            mutuals: mutualUsersCount,
          }}
          basedOnMutuals
        />

        <div className="m_bottom">
          {Me(user) ? (
            <AppLink
              url={`/profile/${username}`}
              className="sec_btn "
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

PeopleYouKnowList.propTypes = {
  follow_id: PropTypes.number.isRequired,
  user: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  firstname: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  mutualUsersCount: PropTypes.number.isRequired,
}

const mapStateToProps = store => ({
  id: store.User.user_details.id,
})

export default connect(mapStateToProps)(PeopleYouKnowList)
export { PeopleYouKnowList as PurePeopleYouKnowList }

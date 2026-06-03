import React, { Component } from 'react'
import { humanReadable } from '../../../utils/utils'
import PropTypes from 'prop-types'
import AdvancedFollow from '../follow/advancedFollow'
import AdvancedUnfollow from '../follow/advancedUnfollow'
import AppLink from '../link/link'
import { connect } from 'react-redux'
import { t } from '../../../utils/translation'

class SuggestedList extends Component {
  state = {
    isFollowing: false,
  }

  render() {
    let { isFollowing } = this.state
    let { id, username, firstname, surname, mutualUsersCount, lang } = this.props

    return (
      <div className="recomms">
        <img src={`/users/${id}/avatar.jpg`} alt="" />
        <div className="recomms_cont">
          <AppLink
            url={`/profile/${username}`}
            className="recomms_username"
            label={username}
          />
          <span>
            {mutualUsersCount == 0
              ? `${firstname} ${surname}`
              : mutualUsersCount == 1
                ? `1 ${t(lang, 'actions', 'mutualFollower')}`
                : `${mutualUsersCount} ${t(lang, 'actions', 'mutualFollowers')}`}
          </span>
        </div>
        <div className="recomms_ff">
          {isFollowing ? (
            <AdvancedUnfollow
              user={id}
              unfollowed={() => this.setState({ isFollowing: false })}
            />
          ) : (
            <AdvancedFollow
              userDetails={{
                user: id,
                username,
                firstname,
                surname,
              }}
              followed={() => this.setState({ isFollowing: true })}
            />
          )}
        </div>
      </div>
    )
  }
}

SuggestedList.propTypes = {
  id: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  firstname: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  when: PropTypes.oneOf(['home', 'profile']),
  mutualUsersCount: PropTypes.number.isRequired,
}

const mapStateToProps = state => ({
  lang: state.Language.language
})

export default connect(mapStateToProps)(SuggestedList)

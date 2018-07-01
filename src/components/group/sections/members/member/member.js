import React, { Component } from 'react'
import TimeAgo from 'handy-timeago'
import { Me } from '../../../../../utils/utils'
import { isAdmin } from '../../../../../utils/admin-utils'
import { connect } from 'react-redux'
import { post } from 'axios'
import MemberAddedBy from './added_by'
import MemberTop from './top'
import RemoveMember from './remove-member'
import PropTypes from 'prop-types'
import MonSticky from '../../../../others/m-on/mon-sticky'
import Follow from '../../../../others/follow/follow'
import Unfollow from '../../../../others/follow/unfollow'
import AppLink from '../../../../others/link/link'

class MembersList extends Component {
  state = {
    isFollowing: false,
    showTime: false,
  }

  componentDidMount = async () => {
    let { member, username } = this.props
    if (!Me(member)) {
      let { data } = await post('/api/is-following', { username })
      await this.setState({ isFollowing: data })
    }
  }

  showTime = () => this.setState({ showTime: true })
  hideTime = () => this.setState({ showTime: false })

  render() {
    let {
      grp_member_id,
      member,
      username,
      firstname,
      surname,
      added_by,
      added_by_username,
      mutualUsersCount,
      joined_group,
      gd,
    } = this.props
    let { isFollowing, showTime } = this.state

    return (
      <div
        className="m_on followers_m_on"
        onMouseOver={this.showTime}
        onMouseOut={this.hideTime}
      >
        <MemberTop
          memberDetails={{
            member,
            username,
            firstname,
            surname,
            mutualUsersCount,
          }}
        />

        <MonSticky show={showTime} text={TimeAgo(joined_group)} />

        <div className="m_bottom">
          <MemberAddedBy
            memberDetails={{ member, added_by, added_by_username }}
          />

          {Me(member) ? (
            <AppLink
              url={`/profile/${username}`}
              className="sec_btn"
              label="Profile"
            />
          ) : Me(gd.admin) || isAdmin() ? (
            <RemoveMember memberDetails={{ grp_member_id, member, username }} />
          ) : isFollowing ? (
            <Unfollow
              user={member}
              unfollowed={() => this.setState({ isFollowing: false })}
            />
          ) : (
            <Follow
              userDetails={{ user: member, username }}
              followed={() => this.setState({ isFollowing: true })}
            />
          )}
        </div>
      </div>
    )
  }
}

MembersList.propTypes = {
  grp_member_id: PropTypes.number.isRequired,
  member: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  firstname: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  added_by: PropTypes.number.isRequired,
  added_by_username: PropTypes.string.isRequired,
  joined_group: PropTypes.string.isRequired,
  mutualUsersCount: PropTypes.number.isRequired,
  group_id: PropTypes.number.isRequired,
}

const mapStateToProps = store => ({
  gd: store.Group.group_details,
})

export default connect(mapStateToProps)(MembersList)
export { MembersList as PureMembersList }

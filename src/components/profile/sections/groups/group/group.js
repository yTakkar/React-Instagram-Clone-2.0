import React, { Component } from 'react'
import { Me } from '../../../../../utils/utils'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import UserGroupInfo from './info'
import Join from '../../../../group/join-group/join'
import Leave from '../../../../group/join-group/leave'
import AppLink from '../../../../others/link/link'

class UserGroupList extends Component {
  state = {
    joined: false,
  }

  componentDidMount = () => this.setState({ joined: this.props.joined })

  render() {
    let {
      group_id,
      admin,
      session: { id: user },
    } = this.props
    let { joined } = this.state

    return (
      <div className="m_on followers_m_on">
        <UserGroupInfo info={{ ...this.props }} />

        <div className="m_bottom">
          {Me(admin) ? (
            <AppLink
              url={`/group/${group_id}`}
              className="sec_btn"
              label="View group"
            />
          ) : joined ? (
            <Leave
              leaveDetails={{ user, group_id }}
              leaved={() => this.setState({ joined: false })}
              updateGroups
            />
          ) : (
            <Join
              joinDetails={{
                user,
                addedBy: user,
                group_id,
              }}
              joined={() => this.setState({ joined: true })}
            />
          )}
        </div>
      </div>
    )
  }
}

UserGroupList.propTypes = {
  group_id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  member: PropTypes.number.isRequired,
  admin: PropTypes.number.isRequired,
  joined: PropTypes.bool.isRequired,
  joined_group: PropTypes.string.isRequired,
}

const mapStateToProps = store => ({
  session: store.User.session,
})

export default connect(mapStateToProps)(UserGroupList)
export { UserGroupList as PureUserGroupList }

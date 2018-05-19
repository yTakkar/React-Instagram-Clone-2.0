import React, { Component } from 'react'
import { humanReadable } from '../../../utils/utils'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import TimeAgo from 'handy-timeago'
import MonSticky from '../../others/m-on/mon-sticky'
import Join from '../../group/join-group/join'
import Leave from '../../group/join-group/leave'

@connect(store => (
  { session: store.User.session }
))

export default class ExploreGroupsList extends Component {

  state = {
    joined: false,
    showTime: false
  }

  componentDidMount = () =>
    this.setState({ joined: this.props.joined })

  showTime = () => this.setState({ showTime: true })
  hideTime = () => this.setState({ showTime: false })

  render() {
    let {
      group_id, name, created, membersCount, mutualMembersCount,
      session: { id: user }
    } = this.props
    let { joined, showTime } = this.state

    return (
      <div
        className='m_on exp_groups_m_on'
        onMouseOver={this.showTime}
        onMouseOut={this.hideTime}
      >

        <div className='m_top'>
          <img src={`/groups/${group_id}/avatar.jpg`} />
          <div className='m_top_right'>
            <Link to={`/group/${group_id}`} >{name}</Link>
            <span>
              {
                mutualMembersCount == 0
                  ? humanReadable(membersCount, 'member')
                  : humanReadable(mutualMembersCount, 'mutual member')
              }
            </span>
          </div>
        </div>

        <MonSticky
          show={showTime}
          text={TimeAgo(created)}
        />

        <div className='m_bottom'>
          {
            joined
              ? <Leave
                leaveDetails={{ user, group_id }}
                leaved={() => this.setState({ joined: false })}
              />

              : <Join
                joinDetails={{
                  user, addedBy: user, group_id
                }}
                joined={() => this.setState({ joined: true })}
              />
          }
        </div>

      </div>
    )
  }
}

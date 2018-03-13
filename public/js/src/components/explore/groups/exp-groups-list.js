import React from 'react'
import { toggle, humanReadable } from '../../../utils/utils'
import { joinGroup, leaveGroup } from '../../../utils/user-interact-utils'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import TimeAgo from 'handy-timeago'
import $ from 'jquery'

@connect(store => (
  { store }
))

export default class ExploreGroupsList extends React.Component {

  state = {
    joined: false
  }

  componentDidMount = () =>
    this.setState({
      joined: this.props.joined
    })

  toggleTime = () => toggle(this.time)

  joinGroup = e => {
    e.preventDefault()
    let
      user = $('.data').data('session'),
      { group_id } = this.props
    joinGroup({
      user,
      added_by: user,
      group: group_id,
      when: 'normal',
      done: () => this.setState({ joined: true })
    })
  }

  leaveGroup = e => {
    e.preventDefault()
    leaveGroup({
      user: $('.data').data('session'),
      group: this.props.group_id,
      done: () => this.setState({ joined: false })
    })
  }

  render() {
    let
      { group_id, name, created, membersCount, mutualMembersCount } = this.props,
      { joined } = this.state

    return (
      <div
        className='m_on exp_groups_m_on'
        onMouseOver={this.toggleTime}
        onMouseOut={this.toggleTime}
      >

        <div className='m_top'>
          <img src={`/groups/${group_id}/avatar.jpg`} alt='' />
          <div className='m_top_right'>
            <Link to={`/group/${group_id}`} >{name}</Link>
            <span>
              {
                mutualMembersCount == 0 ? humanReadable(membersCount, 'member')
                  : humanReadable(mutualMembersCount, 'mutual member')
              }
            </span>
          </div>
        </div>

        <span
          className='recommend_time'
          style={{ display: 'none' }}
          ref={t => this.time = t}
        >{ TimeAgo(created) }</span>

        <div className='m_bottom'>
          {
            joined
              ? <a href='#' className='pri_btn unfollow' onClick={this.leaveGroup} >Leave group</a>
              : <a href='#' className='pri_btn follow' onClick={this.joinGroup} >Join group</a>
          }
        </div>

      </div>
    )
  }
}

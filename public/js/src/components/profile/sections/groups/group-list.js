import React from 'react'
import TimeAgo from 'handy-timeago'
import { toggle, Me, } from '../../../../utils/utils'
import { joinGroup, leaveGroup } from '../../../../utils/user-interact-utils'
import { Link } from 'react-router-dom'
import $ from 'jquery'
import { connect } from 'react-redux'

@connect(store => (
  { store }
))

export default class GroupList extends React.Component {

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
    let
      user = $('.data').data('session'),
      { group_id, dispatch } = this.props
    leaveGroup({
      user,
      group: group_id,
      updateGroups: true,
      dispatch,
      done: () => this.setState({ joined: false })
    })
  }

  render() {
    let
      { name, group_id, admin, member, joined_group } = this.props,
      { joined } = this.state

    return (
      <div className='m_on followers_m_on'>

        <div className='m_top'>
          <img src={`/groups/${group_id}/avatar.jpg`} />
          <div className='m_top_right'>
            <Link to={`/group/${group_id}`} >{ name }</Link>
            { member == admin ? <span className='grp_admin'>admin</span> : null }
            <span>{ TimeAgo(joined_group) }</span>
          </div>
        </div>

        <div className='m_bottom'>
          {
            Me(admin) ? <Link to={`/group/${group_id}`} className='pri_btn' >View group</Link>
              : joined ? <a href='#' className='pri_btn unfollow' onClick={this.leaveGroup} >Leave group</a>
                : <a href='#' className='pri_btn follow' onClick={this.joinGroup} >Join group</a>
          }
        </div>

      </div>
    )
  }
}

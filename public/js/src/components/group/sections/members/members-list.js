import React from 'react'
import TimeAgo from 'handy-timeago'
import { toggle, Me, follow, unfollow, humanReadable } from '../../../../utils/utils'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { post } from 'axios'
import { removeMember } from '../../../../store/actions/group-a'
import Notify from 'handy-notification'
import Prompt from '../../../others/prompt'
import Overlay from '../../../others/overlay'

@connect(store => (
  { gd: store.Group.group_details }
))

export default class MembersList extends React.Component {

  state = {
    isFollowing: false,
    remove: false
  }

  componentDidMount = async () => {
    let { member, username } = this.props
    if (!Me(member)) {
      let { data: isFollowing } = await post('/api/is-following', { username })
      await this.setState({ isFollowing })
    }
  }

  _toggle = what => {
    this.setState({
      [what]: !this.state[what]
    })
  }

  removePrompt = e => {
    e.preventDefault()
    this._toggle('remove')
  }

  toggleTime = () => toggle(this.time)

  follow = e => {
    e.preventDefault()
    let
      { member, username } = this.props,
      obj = {
        user: member,
        username,
        done: () => this.setState({ isFollowing: true })
      }
    follow(obj)
  }

  unfollow = e => {
    e.preventDefault()
    let
      { member } = this.props,
      obj = {
        user: member,
        done: () => this.setState({ isFollowing: false })
      }
    unfollow(obj)
  }

  removeMember = async e => {
    e.preventDefault()
    let { dispatch, grp_member_id, member, username, gd: { group_id } } = this.props
    await post('/api/remove-group-member', { member, group_id })
    dispatch(removeMember(grp_member_id))
    Notify({ value: `Removed ${username}!!` })
  }

  render() {
    let
      { member, username, firstname, surname, added_by, added_by_username, mutualUsersCount, joined_group, gd } = this.props,
      { isFollowing, remove } = this.state

    return (
      <div
        className='m_on followers_m_on'
        onMouseOver={this.toggleTime}
        onMouseOut={this.toggleTime}
      >

        <div className='m_top'>
          <img src={`/users/${member}/avatar.jpg`} alt='' />
          <div className='m_top_right'>
            <Link to={`/profile/${username}`} >{username}</Link>
            { member == gd.admin ? <span className='grp_admin'>admin</span> : null }
            <span>
              {
                !Me(member)
                  ? mutualUsersCount == 0 ? `${firstname} ${surname}` : humanReadable(mutualUsersCount, 'mutual follower')
                  : `${firstname} ${surname}`
              }
            </span>
          </div>
        </div>

        <span
          className='recommend_time'
          style={{ display: 'none' }}
          ref={t => this.time = t}
        >{TimeAgo(joined_group)}</span>

        <div className='m_bottom'>
          <span className='recommend_by' >
            {
              member != added_by ?
                <div>by <Link to={`/profile/${added_by_username}`} >{ Me(added_by) ? 'You' : added_by_username }</Link></div>
                : null
            }
          </span>

          {
            Me(member) ? <Link to={`/profile/${username}`} className='sec_btn' >Profile</Link>
              : Me(gd.admin) ? <a href='#' className='sec_btn' onClick={this.removePrompt} >Remove</a>
                : isFollowing
                  ? <a href='#' className='pri_btn unfollow' onClick={this.unfollow} >Unfollow</a>
                  : <a href='#' className='pri_btn follow' onClick={this.follow} >Follow</a>
          }
        </div>

        {
          remove ?
            <div>
              <Overlay/>
              <Prompt
                title={`Remove ${username}`}
                content="This member will be premanently removed. Member would have to re-join the group."
                actionText= 'Delete'
                action={this.removeMember}
                back={() => this._toggle('remove')}
              />
            </div>
            : null
        }

      </div>
    )
  }
}

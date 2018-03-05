/* eslint indent:0 */
import React from 'react'
import TimeAgo from 'handy-timeago'
import { follow, unfollow } from '../../utils/utils'
import { Link } from 'react-router-dom'

export default class Notification extends React.Component {

  state = { isFollowing: false }

  componentDidMount = () =>
    this.setState({ isFollowing: this.props.isFollowing })

  componentWillReceiveProps = ({ isFollowing }) =>
    this.setState({ isFollowing })

  follow = e => {
    e.preventDefault()
    let { notify_by, notify_by_username } = this.props
    follow({
      user: notify_by,
      username: notify_by_username,
      done: () => this.setState({ isFollowing: true })
    })
  }

  unfollow = e => {
    e.preventDefault()
    let { notify_by } = this.props
    unfollow({
      user: notify_by,
      done: () => this.setState({ isFollowing: false })
    })
  }

  render() {
    let
      { notify_by, notify_by_username, notify_time, post_id, group_id, type, user_username } = this.props,
      { isFollowing } = this.state,
      follow = <a href='#' className='pri_btn follow' onClick={this.follow} >Follow</a>,
      unfollow = <a href='#' className='pri_btn unfollow' onClick={this.unfollow} >Unfollow</a>,
      post = <Link to={`/post/${post_id}`} className='pri_btn'>Open post</Link>,
      profile = <Link to={`/profile/${user_username}`} className='pri_btn' >View {user_username}</Link>,
      group = <Link to={`/group/${group_id}`} className='pri_btn' >View group</Link>,
      con = <Link to='/messages' className='pri_btn' >View conversation</Link>

    return (
      <div className='noti follow_noti'>
        <img src={`/users/${notify_by}/avatar.jpg`} alt='' className='noti_avatar' />
        <div className='noti_left'>
          <Link to={`/profile/${notify_by_username}`} className='noti_bold noti_username'>{ notify_by_username }</Link>
          <span>
            {
              type == 'follow' ? ' started following you'
              : type == 'tag' ? ' tagged you in a post'
              : type == 'like' ? ' liked your post'
              : type == 'share' ? ' shared you a post'
              : type == 'shared_your_post' ? ' shared your post'
              : type == 'comment' ? ' commented on your post'
              : type == 'favourites' ? ' added you to favourites'
              : type == 'recommend' ? ` recommended ${user_username} to you`
              : type == 'add_grp_member' ? ' added you to a group'
              : type == 'invite' ? ' invited to a group'
              : type == 'change_admin' ? ' made you admin of a group'
              : type == 'new_con' ? ' created a conversation with you'
              : type == 'mention_post' ? ' mentioned you in a post'
              : type == 'mention_comment' ? ' mentioned you in a comment'
              : null
            }
          </span>
          <span className='noti_time'>{ TimeAgo(notify_time) }</span>
        </div>
        <div className='noti_right follow_noti_right'>
          {
            type == 'follow' || type == 'favourites' ? isFollowing ? unfollow : follow

            : type == 'tag' || type == 'like' || type == 'share' || type == 'shared_your_post' || type == 'comment' || type == 'mention_post' || type == 'mention_comment' ? post

            : type == 'recommend' ? profile
            : type == 'add_grp_member' || type == 'invite' || type == 'change_admin' ? group
            : type == 'new_con' ? con
            : null
          }
        </div>
      </div>
    )
  }
}

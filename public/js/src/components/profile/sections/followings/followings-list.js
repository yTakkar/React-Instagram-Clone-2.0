import React from 'react'
import TimeAgo from 'handy-timeago'
import { toggle, Me, follow, unfollow } from '../../../../utils/utils'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { post } from 'axios'

@connect(store => (
  { ud: store.User.user_details }
))

export default class FollowingsList extends React.Component {

  state = { isFollowing: false }

  componentDidMount = async () => {
    let { follow_to, username } = this.props
    if (!Me(follow_to)) {
      let { data: isFollowing } = await post('/api/is-following', { username })
      await this.setState({ isFollowing })
    }
  }

  toggleTime = () => toggle(this.time)

  follow = e => {
    e.preventDefault()
    let
      { dispatch, follow_to, username, firstname, surname, ud: { id } } = this.props,
      obj = {
        user: follow_to,
        username,
        firstname,
        surname,
        dispatch,
        update_followings: Me(id),
        done: () => this.setState({ isFollowing: true })
      }
    follow(obj)
  }

  unfollow = e => {
    e.preventDefault()
    let
      { dispatch, follow_to, ud: { id } } = this.props,
      obj = {
        user: follow_to,
        dispatch,
        update_followings: Me(id),
        done: () => this.setState({ isFollowing: false })
      }
    unfollow(obj)
  }

  render() {
    let
      { follow_to, username, firstname, surname, follow_time } = this.props,
      { isFollowing } = this.state

    return (
      <div
        className='m_on followers_m_on'
        onMouseOver={this.toggleTime}
        onMouseOut={this.toggleTime}
      >

        <div className='m_top'>
          <img src={`/users/${follow_to}/avatar.jpg`} alt='' />
          <div className='m_top_right'>
            <Link to={`/profile/${username}`} >{username}</Link>
            <span>{firstname} {surname}</span>
          </div>
        </div>

        <span
          className='recommend_time'
          style={{ display: 'none' }}
          ref={t => this.time = t}
        >{TimeAgo(follow_time)}</span>

        <div className='m_bottom'>
          {
            Me(follow_to)
              ? <Link to={`/profile/${username}`} className='sec_btn '>Profile</Link>
              : isFollowing
                ? <a href='#' className='pri_btn unfollow' onClick={this.unfollow} >Unfollow</a>
                : <a href='#' className='pri_btn follow' onClick={this.follow} >Follow</a>
          }
        </div>

      </div>
    )
  }
}

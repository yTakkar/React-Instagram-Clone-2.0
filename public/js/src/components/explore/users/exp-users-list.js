import React from 'react'
import { toggle, Me, humanReadable, } from '../../../utils/utils'
import { follow, unfollow } from '../../../utils/user-interact-utils'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

@connect(store => (
  { store }
))

export default class ExploreUsersList extends React.Component {

  state = {
    isFollowing: false
  }

  toggleTime = () => toggle(this.time)

  follow = e => {
    e.preventDefault()
    let
      { id, username } = this.props,
      obj = {
        user: id,
        username,
        done: () => this.setState({ isFollowing: true })
      }
    follow(obj)
  }

  unfollow = e => {
    e.preventDefault()
    let
      { id } = this.props,
      obj = {
        user: id,
        done: () => this.setState({ isFollowing: false })
      }
    unfollow(obj)
  }

  render() {
    let
      { id, username, firstname, surname, followers_count, mutualUsersCount } = this.props,
      { isFollowing } = this.state

    return (
      <div
        className='m_on followers_m_on'
        onMouseOver={this.toggleTime}
        onMouseOut={this.toggleTime}
      >

        <div className='m_top'>
          <img src={`/users/${id}/avatar.jpg`} alt='' />
          <div className='m_top_right'>
            <Link to={`/profile/${username}`} >{username}</Link>
            <span>
              { mutualUsersCount == 0 ? `${firstname} ${surname}` : humanReadable(mutualUsersCount, 'mutual follower') }
            </span>
          </div>
        </div>

        <span
          className='recommend_time'
          style={{ display: 'none' }}
          ref={t => this.time = t}
        >{ humanReadable(followers_count, 'follower') }</span>

        <div className='m_bottom'>
          {
            Me(id)
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

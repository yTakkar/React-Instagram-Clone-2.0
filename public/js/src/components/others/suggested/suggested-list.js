import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Me, humanReadable } from '../../../utils/utils'
import { follow, unfollow } from '../../../utils/user-interact-utils'

@connect(store => (
  { ud: store.User.user_details }
))

export default class SuggestedList extends React.Component {

  state = {
    isFollowing: false
  }

  follow = e => {
    e.preventDefault()
    let
      { dispatch, id: user, username, firstname, surname, ud: { id }, when } = this.props,
      def = {
        user,
        username,
        done: () => this.setState({ isFollowing: true })
      },
      obj

    if (when == 'home') {
      obj = def
    } else if (when == 'profile') {
      if (Me(id)) {
        obj = { ...def, firstname, surname, dispatch, update_followings: true }
      } else if (user == id) {
        obj = { ...def, dispatch, update_followers: true }
      } else {
        obj = def
      }
    }

    follow(obj)
  }

  unfollow = e => {
    e.preventDefault()
    let
      { dispatch, id: user, ud: { id }, when } = this.props,
      def = {
        user,
        done: () => this.setState({ isFollowing: false })
      },
      obj

    if (when == 'home') {
      obj = def
    } else if (when == 'profile') {
      if (Me(id)) {
        obj = { ...def, dispatch, update_followings: true }
      } else if (user == id) {
        obj = { ...def, dispatch, update_followers: true }
      } else {
        obj = def
      }
    }

    unfollow(obj)
  }

  render() {
    let
      { isFollowing } = this.state,
      { id, username, firstname, surname, mutualUsersCount } = this.props

    return (
      <div className='recomms'>
        <img src={`/users/${id}/avatar.jpg`} alt='' />
        <div className='recomms_cont'>
          <Link to={`/profile/${username}`} className='recomms_username' >{username}</Link>
          <span>
            { mutualUsersCount == 0 ? `${firstname} ${surname}` : humanReadable(mutualUsersCount, 'mutual follower') }
          </span>
        </div>
        <div className='recomms_ff' >
          {
            isFollowing ? <a href='#' className='unfollow pri_btn' onClick={this.unfollow} >Unfollow</a>
              : <a href='#' className='follow pri_btn' onClick={this.follow} >Follow</a>
          }
        </div>
      </div>
    )
  }
}

import React from 'react'
import { Me, follow, unfollow, humanReadable } from '../../../../utils/utils'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { post } from 'axios'

@connect(store => (
  { ud: store.User.user_details }
))

export default class PeopleYouKnowList extends React.Component {

  state = { isFollowing: false }

  componentDidMount = async () => {
    let { user, username } = this.props
    if (!Me(user)) {
      let { data: isFollowing } = await post('/api/is-following', { username })
      await this.setState({ isFollowing })
    }
  }

  follow = e => {
    e.preventDefault()
    let
      { dispatch, user, username, firstname, surname, ud: { id } } = this.props,
      obj = {
        user,
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
      { dispatch, user, ud: { id } } = this.props,
      obj = {
        user,
        dispatch,
        update_followings: Me(id),
        done: () => this.setState({ isFollowing: false })
      }
    unfollow(obj)
  }

  render() {
    let
      { user, username, firstname, surname, mutualUsersCount } = this.props,
      { isFollowing } = this.state

    return (
      <div className='m_on followers_m_on' >

        <div className='m_top'>
          <img src={`/users/${user}/avatar.jpg`} alt='' />
          <div className='m_top_right'>
            <Link to={`/profile/${username}`} >{username}</Link>
            <span>
              { mutualUsersCount == 0 ? `${firstname} ${surname}` : humanReadable(mutualUsersCount, 'mutual follower') }
            </span>
          </div>
        </div>

        <div className='m_bottom'>
          {
            Me(user)
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

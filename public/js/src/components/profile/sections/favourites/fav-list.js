import React from 'react'
import TimeAgo from 'handy-timeago'
import { toggle, Me, follow, unfollow } from '../../../../utils/utils'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { post } from 'axios'
import { removeFavourites } from '../../../../store/actions/follow_a'
import Notify from 'handy-notification'

@connect(store => (
  { ud: store.User.user_details }
))

export default class FavList extends React.Component {

  state = { isFollowing: false }

  componentDidMount = async () => {
    let { user, username } = this.props
    if (!Me(user)) {
      let { data: isFollowing } = await post('/api/is-following', { username })
      await this.setState({ isFollowing })
    }
  }

  toggleTime = () => toggle(this.time)

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

  removeFav = async e => {
    e.preventDefault()
    let { fav_id, username, dispatch } = this.props
    await post('/api/remove-favourites', { fav_id })
    dispatch(removeFavourites(fav_id))
    Notify({ value: `Removed ${username} from favourites!!` })
  }

  render() {
    let
      { user, username, firstname, surname, fav_time, ud: { id } } = this.props,
      { isFollowing } = this.state

    return (
      <div
        className='m_on followers_m_on'
        onMouseOver={this.toggleTime}
        onMouseOut={this.toggleTime}
      >

        <div className='m_top'>
          <img src={`/users/${user}/avatar.jpg`} alt='' />
          <div className='m_top_right'>
            <Link to={`/profile/${username}`} >{username}</Link>
            <span>{firstname} {surname}</span>
          </div>
        </div>

        <span
          className='recommend_time'
          style={{ display: 'none' }}
          ref={t => this.time = t}
        >{TimeAgo(fav_time)}</span>

        <div className='m_bottom'>
          { Me(id) ? <a href='#' className='sec_btn' onClick={this.removeFav} >Remove</a> : null }
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

import React from 'react'
import TimeAgo from 'handy-timeago'
import { Link } from 'react-router-dom'
import { Me, isAdmin } from '../../../utils/utils'
import { follow, unfollow } from '../../../utils/user-interact-utils'
import { connect } from 'react-redux'
import { removeLike } from '../../../store/actions/post-a'
import Notify from 'handy-notification'

@connect(store => (
  { ud: store.User.user_details }
))

export default class LikeList extends React.Component {

  state = {
    isFollowing: false
  }

  componentDidMount = () =>
    this.setState({ isFollowing: this.props.isFollowing })

  componentWillReceiveProps = ({ isFollowing }) =>
    this.setState({ isFollowing })

  follow = e => {
    e.preventDefault()
    let
      { dispatch, like_by, username, firstname, surname, ud: { id } } = this.props,
      profile_page = location.pathname.includes('/profile'),
      def = {
        user: like_by,
        username,
        done: () => this.setState({ isFollowing: true })
      },
      obj

    if (!profile_page) {
      obj = def
    } else if (profile_page) {
      if (Me(id)) {
        obj = { ...def, firstname, surname, dispatch, update_followings: true }
      } else if (like_by == id) {
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
      { dispatch, like_by, ud: { id } } = this.props,
      profile_page = location.pathname.includes('/profile'),
      def = {
        user: like_by,
        done: () => this.setState({ isFollowing: false })
      },
      obj

    if (!profile_page) {
      obj = def
    } else {
      if (Me(id)) {
        obj = { ...def, dispatch, update_followings: true }
      } else if (like_by == id) {
        obj = { ...def, dispatch, update_followers: true }
      } else {
        obj = def
      }
    }

    unfollow(obj)
  }

  remLikeAsAdmin = e => {
    e.preventDefault()
    let { dispatch, like_id, decrementLikes } = this.props
    dispatch(removeLike(like_id))
    decrementLikes()
    Notify({ value: 'Removed like as admin!!' })
  }

  render() {
    let
      { like_by, username, like_time } = this.props,
      { isFollowing } = this.state

    return (
      <div className='modal_items fer_items' >
        <div className='modal_it_img'>
          <img src={`/users/${like_by}/avatar.jpg`} />
        </div>
        <div className='modal_it_content'>
          <div className='modal_it_info'>
            <Link to={`/profile/${username}`} className='modal_it_username' >
              { Me(like_by) ? 'You' : username }
            </Link>
            <span className='modal_it_light' >{TimeAgo(like_time)}</span>
          </div>
          <div className='modal_ff'>
            {
              isAdmin() ? <a href='#' className='sec_btn' onClick={this.remLikeAsAdmin} >Remove as admin</a>
                : Me(like_by) ? <Link to={`/profile/${username}`} className='pri_btn follow' >Profile</Link>
                  : isFollowing ? <a href='#' className='pri_btn unfollow' onClick={this.unfollow} >Unfollow</a>
                    : <a href='#' className='pri_btn follow' onClick={this.follow} >Follow</a>
            }
          </div>
        </div>
        <hr />
      </div>
    )
  }

}

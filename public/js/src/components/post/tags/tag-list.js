import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Me, follow, unfollow, isAdmin } from '../../../utils/utils'
import { post } from 'axios'
import { untag } from '../../../store/actions/post-a'
import Notify from 'handy-notification'

@connect(store => (
  {
    isPostMine: store.Post.isPostMine,
    ud: store.User.user_details
  }
))

export default class TagItems extends React.Component {

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
      { dispatch, user, username, firstname, surname, ud: { id } } = this.props,
      profile_page = location.pathname.includes('/profile'),
      def = {
        user,
        username,
        done: () => this.setState({ isFollowing: true })
      },
      obj

    if (!profile_page) {
      obj = def
    } else if (profile_page) {
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
      { dispatch, user, ud: { id } } = this.props,
      profile_page = location.pathname.includes('/profile'),
      def = {
        user,
        done: () => this.setState({ isFollowing: false })
      },
      obj

    if (!profile_page) {
      obj = def
    } else {
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

  untag = async (e, user) => {
    e.preventDefault()
    let { post_id, dispatch, decrementTags } = this.props
    await post('/api/untag', { user, post: post_id })
    dispatch(untag(user))
    decrementTags()
    Notify({ value: 'Untagged!!' })
  }

  render() {
    let
      { user, username, firstname, surname, isPostMine } = this.props,
      { isFollowing } = this.state

    return (
      <div className='modal_items fer_items' >
        <div className='modal_it_img'>
          <img src={`/users/${user}/avatar.jpg`} />
        </div>
        <div className='modal_it_content'>
          <div className='modal_it_info'>
            <Link to={`/profile/${username}`} class='modal_it_username' >{username}</Link>
            <span class='modal_it_light' >{firstname} {surname}</span>
          </div>
          <div className='modal_ff'>
            {
              isPostMine || isAdmin() ? <a href='#' className='sec_btn' onClick={e => this.untag(e, user)} >Untag {isAdmin() ? 'as admin' : null}</a>
                : Me(user) ? <a href='#' className='sec_btn' onClick={e => this.untag(e, user)} >Untag</a>
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

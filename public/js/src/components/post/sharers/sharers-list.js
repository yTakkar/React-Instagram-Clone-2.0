import React from 'react'
import { Link } from 'react-router-dom'
import { Me, follow, unfollow, isAdmin } from '../../../utils/utils'
import { connect } from 'react-redux'
import { post } from 'axios'
import { removeShare } from '../../../store/actions/post-a'

@connect(store => (
  { ud: store.User.user_details }
))

export default class SharerList extends React.Component {

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
      { dispatch, share_by, share_by_username, share_by_firstname, share_by_surname, ud: { id } } = this.props,
      profile_page = location.pathname.includes('/profile'),
      def = {
        user: share_by,
        username: share_by_username,
        done: () => this.setState({ isFollowing: true })
      },
      obj

    if (!profile_page) {
      obj = def
    } else if (profile_page) {
      if (Me(id)) {
        obj = { ...def, share_by_firstname, share_by_surname, dispatch, update_followings: true }
      } else if (share_by == id) {
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
      { dispatch, share_by, ud: { id } } = this.props,
      profile_page = location.pathname.includes('/profile'),
      def = {
        user: share_by,
        done: () => this.setState({ isFollowing: false })
      },
      obj

    if (!profile_page) {
      obj = def
    } else {
      if (Me(id)) {
        obj = { ...def, dispatch, update_followings: true }
      } else if (share_by == id) {
        obj = { ...def, dispatch, update_followers: true }
      } else {
        obj = def
      }
    }

    unfollow(obj)
  }

  removeShare = async e => {
    e.preventDefault()
    let { share_id, dispatch, decrementShares } = this.props
    await post('/api/remove-share', { share_id })
    decrementShares()
    dispatch(removeShare(share_id))
  }

  render() {
    let
      { share_by, share_by_username, share_to, share_to_username } = this.props,
      { isFollowing } = this.state

    return (
      <div className='modal_items fer_items' >
        <div className='modal_it_img'>
          <img src={`/users/${share_by}/avatar.jpg`} />
        </div>
        <div className='modal_it_content'>
          <div className='modal_it_info'>
            <Link to={`/profile/${share_by_username}`} className='modal_it_username' >
              { Me(share_by) ? 'You' : share_by_username }
            </Link>
            <span className='modal_it_light' >to { Me(share_to) ? 'You' : share_to_username }</span>
          </div>
          <div className='modal_ff'>
            {
              Me(share_by) ?
                <Link to={`/profile/${share_by_username}`} className='pri_btn follow' >Profile</Link>

                : Me(share_to) || isAdmin() ?
                  <a href='#' className='rem_share sec_btn' onClick={this.removeShare} >Remove {isAdmin() ? 'as admin' : 'share'}</a>

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

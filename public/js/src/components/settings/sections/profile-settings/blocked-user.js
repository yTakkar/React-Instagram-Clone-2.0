import React from 'react'
import { Link } from 'react-router-dom'
import { humanReadable } from '../../../../utils/utils'
import { connect } from 'react-redux'
import { unblockUser } from '../../../../store/actions/settings-a'
import Notify from 'handy-notification'
import { post } from 'axios'

@connect(store => (
  { store }
))

export default class BlockedUser extends React.Component {

  unblock = async e => {
    e.preventDefault()
    let { block_id, username, dispatch } = this.props
    await post('/api/unblock-user', { block_id })
    dispatch(unblockUser(block_id))
    Notify({ value: `Unblocked ${username}!!` })
  }

  render() {
    let { user, username, firstname, surname, mutualFollowersCount } = this.props

    return (
      <div className='blocked_users' >
        <img src={`/users/${user}/avatar.jpg`} />
        <div className='blocked_u_content'>
          <div className='blocked_info'>
            <Link to={`/profile/${username}`} className='blocked_username'>{ username }</Link>
            <span className='blocked_mutual'>
              {
                mutualFollowersCount == 0
                  ? `${firstname} ${surname}`
                  : humanReadable(mutualFollowersCount, 'mutual follower')
              }
            </span>
          </div>
          <a href='#' className='unblock sec_btn' onClick={this.unblock} >Unblock</a>
        </div>
      </div>
    )
  }
}

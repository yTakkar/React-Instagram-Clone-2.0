import React, { Component } from 'react' // eslint-disable-line no-unused-vars
import { Link } from 'react-router-dom'
import { humanReadable } from '../../../utils/utils'
import { connect } from 'react-redux'
import { newConversation } from '../../../utils/message-utils'

@connect(store => (
  { store }
))

export default class OnlineUser extends Component {

  message = e => {
    e.preventDefault()
    let { user, username, back, dispatch } = this.props
    newConversation({
      user, username, dispatch,
      done: () => back()
    })
  }

  render() {
    let { user, username, firstname, surname, mutualUsersCount } = this.props

    return (
      <div className='modal_items fer_items' >
        <div className='modal_it_img'>
          <img src={`/users/${user}/avatar.jpg`} />
        </div>
        <div className='modal_it_content'>
          <div className='modal_it_info'>
            <Link to={`/profile/${username}`} className='modal_it_username' >{username}</Link>
            <span className='modal_it_light' >
              {
                mutualUsersCount == 0
                  ? `${firstname} ${surname}`
                  : humanReadable(mutualUsersCount, 'mutual follower')
              }
            </span>
          </div>
          <div className='modal_ff'>
            <a href='#' className='pri_btn' onClick={this.message} >Message</a>
          </div>
        </div>
        <hr />
      </div>
    )
  }

}

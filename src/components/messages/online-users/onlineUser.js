import React from 'react'
import { Link } from 'react-router-dom'
import { humanReadable } from '../../../utils/utils'
import { connect } from 'react-redux'
import { newConversation } from '../../../utils/message-utils'
import PropTypes from 'prop-types'
import PrimaryButton from '../../others/button/primary-btn'

const OnlineUser = props => {
  let {
    user, username, firstname, surname, mutualUsersCount, back, dispatch
  } = props

  let message = e => {
    e.preventDefault()
    newConversation({
      user, username, dispatch,
      done: () => back()
    })
  }

  return (
    <div className='modal_items fer_items' >
      <div className='modal_it_img'>
        <img src={`/users/${user}/avatar.jpg`} />
      </div>

      <div className='modal_it_content'>
        <div className='modal_it_info'>
          <Link
            to={`/profile/${username}`} className='modal_it_username'
          >{username}</Link>

          <span className='modal_it_light' >
            {
              mutualUsersCount == 0
                ? `${firstname} ${surname}`
                : humanReadable(mutualUsersCount, 'mutual follower')
            }
          </span>
        </div>

        <div className='modal_ff'>
          <PrimaryButton
            label='Message'
            onClick={message}
          />
        </div>
      </div>

      <hr />

    </div>
  )
}

OnlineUser.propTypes = {
  user: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  firstname: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  mutualUsersCount: PropTypes.number.isRequired,
  back: PropTypes.func.isRequired,
}

export default connect()(OnlineUser)

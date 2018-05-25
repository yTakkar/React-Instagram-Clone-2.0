import React from 'react'
import { connect } from 'react-redux'
import { recommendUser } from '../../../utils/user-interact-utils'
import PrimaryButton from '../button/primary-btn'
import AppLink from '../link/link'

const RecommendUsersList = props => {
  let {
    follow_to, username, firstname, surname, back, ud
  } = props

  let recommend = async e => {
    e.preventDefault()
    recommendUser({
      user: ud.id,
      recommend_to: follow_to
    })
    back()
  }

  return (
    <div className='modal_items'>
      <div className='modal_it_img'>
        <img src={`/users/${follow_to}/avatar.jpg`} />
      </div>

      <div className='modal_it_content '>
        <div className='modal_it_info'>
          <AppLink
            url={`/profile/${username}`} className='modal_it_username'
            label={username}
          />
          <span className='modal_it_light' >{`${firstname} ${surname}`}</span>
        </div>

        <div className='modal_ff'>
          <PrimaryButton
            label='Recommend'
            onClick={recommend}
          />
        </div>
      </div>

      <hr/>
    </div>
  )
}

const mapStateToProps = state => (
  { ud: state.User.user_details }
)

export default connect(mapStateToProps)(RecommendUsersList)

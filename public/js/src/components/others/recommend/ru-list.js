import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { post } from 'axios'
import Notify from 'handy-notification'
import { insta_notify } from '../../../utils/utils'

@connect(store => {
  return {
    ud: store.User.user_details
  }
})

export default class RecommendUsersList extends React.Component {

  recommend = async e => {
    e.preventDefault()
    let { ud: { id, username: getUsername }, follow_to, username, back } = this.props
    let { data: { success } } = await post('/api/recommend-user', { user: id, recommend_to: follow_to })

    if (success) {
      insta_notify({
        to: follow_to,
        type: 'recommend',
        user: id
      })
      Notify({ value: `Recommended ${getUsername} to ${username}` })
    } else {
      Notify({ value: 'Could not recommend' })
    }

    back()
  }

  render() {
    let
      { follow_to, username, firstname, surname } = this.props

    return (
      <div className='modal_items'>
        <div className='modal_it_img'>
          <img src={`/users/${follow_to}/avatar.jpg`} />
        </div>
        <div className='modal_it_content '>
          <div className='modal_it_info'>
            <Link to={`/profile/${username}`} className='modal_it_username' >{username}</Link>
            <span className='modal_it_light' >{`${firstname} ${surname}`}</span>
          </div>
          <div className='modal_ff'>
            <a href='#' className='share_btn pri_btn' onClick={this.recommend} >Recommend</a>
          </div>
        </div>
        <hr/>
      </div>
    )
  }
}

import React from 'react'
import { Link } from 'react-router-dom'
import Notify from 'handy-notification'
import { insta_notify } from '../../../utils/utils'
import $ from 'jquery'
import { post } from 'axios'
import Overlay from '../../others/overlay'
import Prompt from '../../others/prompt'

export default class ChangeAdminList extends React.Component {

  state = {
    change: false
  }

  toggleChange = e => {
    e.preventDefault()
    this.setState({ change: true })
  }

  transfer = async e => {
    e.preventDefault()
    $('.invite_btn').blur()
    let { member, username, group } = this.props
    await post('/api/change-admin', { user: member, group })
    insta_notify({
      to: member,
      type: 'change_admin',
      group_id: group
    })
    Notify({
      value: `${username} is now admin of this group!!`,
      done: () => location.reload()
    })
  }

  render() {
    let
      { member, username, firstname, surname } = this.props,
      { change } = this.state

    return (
      <div>

        <div className='modal_items'>
          <div className='modal_it_img'>
            <img src={`/users/${member}/avatar.jpg`} />
          </div>
          <div className='modal_it_content '>
            <div className='modal_it_info'>
              <Link to={`/profile/${username}`} className='modal_it_username' >{username}</Link>
              <span className='modal_it_light' >{`${firstname} ${surname}`}</span>
            </div>
            <div className='modal_ff'>
              <a href='#' className='t_admin_btn pri_btn' onClick={this.toggleChange} >Transfer</a>
            </div>
          </div>
          <hr/>
        </div>

        {
          change ?
            <div>
              <Overlay/>
              <Prompt
                title='Transfer admin position'
                content={`${username} will now be the admin of this group. There's no undo and you will no longer be the admin.`}
                actionText= 'Transfer'
                action={this.transfer}
                back={() => this.setState({ change: false })}
                blurred={true}
              />
            </div>
            : null
        }

      </div>
    )
  }
}

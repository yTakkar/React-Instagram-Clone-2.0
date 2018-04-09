import React from 'react'
import { FadeIn } from 'animate-components'
import Title from '../../others/title'
import $ from 'jquery'
import Notify from 'handy-notification'
import { post } from 'axios'

export default class ChangePassword extends React.Component {

  change = async e => {
    e.preventDefault()

    let
      old = $('.c_p_old_text').val(),
      new_ = $('.c_p_new_text').val(),
      new_a = $('.c_p_new_a_text').val(),
      btn = $('.c_p_btn'),
      overlay2 = $('.overlay-2')

    if (!old || !new_ || !new_a) {
      Notify({ value: 'Some values are missing!!' })
    } else if (new_ != new_a) {
      Notify({ value: 'New passwords don\'t match' })
    } else {

      btn
        .addClass('a_disabled')
        .text('Changing password..')
      overlay2.show()

      let {
        data: { mssg, success }
      } = await post('/user/change-password', { old, new_, new_a })

      if (success) {
        Notify({
          value: mssg,
          done: () => location.reload()
        })
      } else {
        Notify({ value: typeof(mssg) == 'object' ? mssg.length > 1 ? mssg[0] : mssg : mssg })

        btn
          .removeClass('a_disabled')
          .text('Change password')
        overlay2.hide()

      }

    }

  }

  render() {
    return (
      <div>

        <Title value='Change password' />

        <FadeIn duration='300ms'>

          <div className='change_pass'>
            <div className='c_p_header'>
              <span>CHANGE PASSWORD</span>
            </div>

            <div className='c_p_main'>
              <div className='c_p_old'>
                <span>Current password</span>
                <input type='password' placeholder='Current password' autoFocus spellCheck='false' className='c_p_old_text' />
              </div>
              <div className='c_p_new'>
                <span>New password</span>
                <input type='password' placeholder='New password' spellCheck='false' className='c_p_new_text' />
              </div>
              <div className='c_p_new_a'>
                <span>Confirm new password</span>
                <input type='password' placeholder='Confirm current password' spellCheck='false' className='c_p_new_a_text' />
              </div>
              <a href='#' className='c_p_btn pri_btn' onClick={this.change} >Change password</a>
            </div>

          </div>

        </FadeIn>

      </div>
    )
  }
}

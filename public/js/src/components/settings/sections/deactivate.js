import React from 'react'
import { FadeIn } from 'animate-components'
import Title from '../../others/title'
import { post } from 'axios'
import $ from 'jquery'
import Prompt from '../../others/prompt'
import Overlay from '../../others/overlay'
import Notify from 'handy-notification'

export default class Deactivate extends React.Component {

  state = {
    password: '',
    showPrompt: false
  }

  showPrompt = e => {
    e.preventDefault()
    this.setState({ showPrompt: true })
  }

  changePassword = e =>
    this.setState({ password: e.target.value })

  deactivate = async e => {
    e.preventDefault()
    let
      { password } = this.state,
      btn = $('.prompt-done'),
      o = $('.overlay-2')

    btn.addClass('a_disabled').text('Deactivating..')
    o.show()

    let { data, data: { mssg, success } } = await post('/user/deactivate-account', { password })
    console.log(data)

    btn.removeClass('a_disabled').text('Deactivated')
    o.hide()

    Notify({
      value: mssg,
      done: () => success ? location.href = '/login': null
    })
  }

  render() {
    let { password, showPrompt } = this.state

    return (
      <div>

        <Title value='Deactivate your account' />

        <FadeIn duration='300ms'>
          <div className='dlt_acc'>

            <div className='c_p_header'>
              <span>Deactivate your account</span>
            </div>

            <form className='dlt_acc_form' onSubmit={this.showPrompt} >
              <input
                type='password'
                placeholder='Your password..'
                autoFocus
                required
                value={password}
                onChange={e => this.changePassword(e)}
              />
              <input type='submit' value='Deactivate' disabled={!password} />
            </form>

            <div className='dlt_acc_info'>
              <span className='dlt_acc_bold'>Note:</span>
              <span>All of your <span className='dlt_acc_bold'>posts, followers, followings, recommendations, messages, groups, settings, notifications, bookmarks & other info will be permanently deleted.</span> And you won't be able to find it again.</span>
            </div>

          </div>
        </FadeIn>

        {
          showPrompt ?
            <div>
              <Overlay/>
              <Prompt
                title='Deactivate account'
                content="Are you sure, you wanna permanently deactivate your account? There's no undo so you won't be able login with this account."
                actionText= 'Deactivate'
                action={this.deactivate}
                back={() => this.setState({ showPrompt: false })}
                blurred={true}
              />
            </div>
            : null
        }

      </div>
    )
  }
}

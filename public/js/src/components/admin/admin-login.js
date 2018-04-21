import React, { Component } from 'react' // eslint-disable-line no-unused-vars
import { FadeIn } from 'animate-components'
import Title from '../others/title'
import { viewPassword, isAdmin } from '../../utils/utils'
import $ from 'jquery'
import Notify from 'handy-notification'
import { post } from 'axios'
import { Redirect } from 'react-router-dom'
import qs from 'query-string'

export default class AdminLogin extends Component {

  state = {
    password: ''
  }

  changeValue = (what, e) =>
    this.setState({ [what]: e.target.value })

  componentDidMount = () => {
    $('.nav_options').hide()
    $('.m_n_a_admin').addClass('sidebar_active')
  }

  componentWillUnmount = () =>
    $('.m_n_a_admin').removeClass('sidebar_active')

  toggleViewPassword = () => {
    viewPassword({
      input: document.getElementById('al_password'),
      icon: $('.s_p_l')
    })
  }

  submit = async e => {
    e.preventDefault()
    let
      { password } = this.state,
      { search } = this.props.location,
      toURL = qs.parse(search)

    if (!password) {
      Notify({ value: 'Password field is missing!!' })
    } else {
      $('.al_submit')
        .addClass('a_disabled')
        .attr('value', 'Please wait..')

      let
        { data: { mssg, success } } = await post('/api/check-is-admin', { password }),
        to = toURL.to ? toURL.to : '/is-admin'

      Notify({
        value: mssg,
        done: () => success ? location.href = to : null
      })

      $('.al_submit')
        .removeClass('a_disabled')
        .attr('value', 'Continue as admin')
    }

  }

  render() {
    let { password } = this.state

    return (
      <div>

        { isAdmin() ? <Redirect to='/is-admin' /> : null }

        <Title
          value='Are you the admin?'
          desc='Verify you are admin with the admin password'
        />

        <FadeIn duration='300ms'>

          <div className='cua are-you-admin'>
            <div className='display_text'>
              <span>Are you the admin?</span>
            </div>
            <form className='form_login' onSubmit={this.submit} >
              <input
                type='password'
                id='al_password'
                required
                placeholder='Admin password'
                autoFocus
                value={password}
                onChange={e => this.changeValue('password', e)}
              />
              <span className='show_psswrd s_p_l' onClick={this.toggleViewPassword} >
                <i className='fas fa-lock'></i>
              </span>
              <input type='submit' value='Continue as admin' className='al_submit' />
            </form>
          </div>

        </FadeIn>

      </div>
    )
  }
}

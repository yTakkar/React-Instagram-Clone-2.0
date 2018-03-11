import React, { Component } from 'react' // eslint-disable-line no-unused-vars
import { FadeIn } from 'animate-components'
import Title from '../others/title'
import $ from 'jquery'
import { Redirect } from 'react-router-dom'
import { isAdmin } from '../../utils/utils'

export default class IsAdmin extends Component {

  componentDidMount = () =>
    $('.nav_options').hide()

  render() {
    return (
      <div>

        { !isAdmin() ? <Redirect to='/admin-login' /> : null }

        <Title value='You are the admin' />

        <FadeIn duration='300ms'>
          <div className='registered email_verification' >
            <span>You can now remove and edit any post, comment, user, group, message, etc. as an admin</span>
          </div>
        </FadeIn>
      </div>
    )
  }
}

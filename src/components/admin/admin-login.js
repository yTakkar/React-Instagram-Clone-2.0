import React, { Component } from 'react'
import { FadeIn } from 'animate-components'
import Title from '../others/title'
import { viewPassword } from '../../utils/utils'
import { isAdmin } from '../../utils/admin-utils'
import { Redirect } from 'react-router-dom'
import { adminSubmit } from '../../utils/admin-utils'
import FAIcon from '../others/icons/font-awesome-icon'
import TextInput from '../others/input/text'

export default class AdminLogin extends Component {
  state = {
    password: '',
  }

  changeValue = (what, e) => this.setState({ [what]: e.target.value })

  toggleViewPassword = () => {
    viewPassword({
      input: '#al_password',
      icon: '.s_p_l',
    })
  }

  submit = e => {
    e.preventDefault()
    let { password } = this.state
    let { search } = this.props.location
    adminSubmit({ password, search })
  }

  render() {
    let { password } = this.state

    return (
      <div>
        {isAdmin() && <Redirect to="/is-admin" />}

        <Title
          value="Are you the admin?"
          desc="Verify you are admin with the admin password"
        />

        <FadeIn duration="300ms">
          <div className="cua are-you-admin">
            <div className="display_text">
              <span>Are you the admin?</span>
            </div>
            <form className="form_login" onSubmit={this.submit}>
              <TextInput
                type="password"
                id="al_password"
                placeholder="Admin password"
                autoFocus
                required
                value={password}
                valueChange={e => this.changeValue('password', e)}
              />
              <span
                className="show_psswrd s_p_l"
                onClick={this.toggleViewPassword}
              >
                <FAIcon icon="lock" />
              </span>
              <input
                type="submit"
                value="Continue as admin"
                className="al_submit"
              />
            </form>
          </div>
        </FadeIn>
      </div>
    )
  }
}

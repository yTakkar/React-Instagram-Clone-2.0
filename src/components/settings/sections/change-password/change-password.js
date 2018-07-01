import React, { Component } from 'react'
import { FadeIn } from 'animate-components'
import Title from '../../../others/title'
import PasswordSection from './password-section'
import { changePassword } from '../../../../utils/setting-utils'
import PrimaryButton from '../../../others/button/primary-btn'
import { fieldsToArray } from '../../../../utils/edit-profile-utils'

export default class ChangePassword extends Component {
  state = {
    oldP: '',
    newP: '',
    newPagain: '',
  }

  changeValue = (what, e) => this.setState({ [what]: e.target.value })

  change = e => {
    e.preventDefault()
    let { oldP, newP, newPagain } = this.state
    changePassword(oldP, newP, newPagain)
  }

  decideLabel = key => {
    let label =
      key == 'oldP'
        ? 'Current password'
        : key == 'newP'
          ? 'New password'
          : 'Confirm new password'

    return label
  }

  map = ({ key, value }) => {
    let focus = key == 'oldP' ? true : false
    let label = this.decideLabel(key)

    return (
      <PasswordSection
        label={label}
        value={value}
        change={e => this.changeValue(key, e)}
        autoFocus={focus}
      />
    )
  }

  render() {
    // For disabled key warning
    // Key helps React update virtual DOM, but when we provide key to component of map function, text input inside that component looses focus.
    console.error = () => {}

    let array = fieldsToArray(this.state)
    let mappedFields = array.map(this.map)

    return (
      <div>
        <Title value="Change password" />

        <FadeIn duration="300ms">
          <div className="change_pass">
            <div className="c_p_header">
              <span>CHANGE PASSWORD</span>
            </div>

            <div className="c_p_main">
              {mappedFields}
              <PrimaryButton
                label="Change password"
                onClick={this.change}
                extraClass="c_p_btn"
              />
            </div>
          </div>
        </FadeIn>
      </div>
    )
  }
}

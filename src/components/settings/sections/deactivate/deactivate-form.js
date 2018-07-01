import React, { Component, Fragment } from 'react'
import Prompt from '../../../others/prompt'
import PropTypes from 'prop-types'
import { deactivateAccount } from '../../../../utils/setting-utils'
import TextInput from '../../../others/input/text'

export default class DeactivateForm extends Component {
  state = {
    showPrompt: false,
  }

  showPrompt = e => {
    e.preventDefault()
    this.setState({ showPrompt: true })
  }

  deactivate = async e => {
    e.preventDefault()
    let { password } = this.props
    deactivateAccount(password, () => this.setState({ showPrompt: false }))
  }

  render() {
    let { password, change } = this.props
    let { showPrompt } = this.state

    return (
      <Fragment>
        <form className="dlt_acc_form" onSubmit={this.showPrompt}>
          <TextInput
            type="password"
            placeholder="Your password.."
            autoFocus
            required
            value={password}
            valueChange={change}
          />
          <input type="submit" value="Deactivate" disabled={!password} />
        </form>

        {showPrompt && (
          <Prompt
            title="Deactivate account"
            content="Are you sure, you wanna permanently deactivate your account? There's no undo so you won't be able login with this account."
            actionText="Deactivate"
            action={this.deactivate}
            back={() => this.setState({ showPrompt: false })}
            blurred
          />
        )}
      </Fragment>
    )
  }
}

DeactivateForm.propTypes = {
  password: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
}

import React, { Component } from 'react'
import { FadeIn } from 'animate-components'
import Title from '../../../others/title'
import DeactivateForm from './deactivate-form'

export default class Deactivate extends Component {
  state = {
    password: '',
  }

  changeValue = e => this.setState({ password: e.target.value })

  render() {
    let { password } = this.state

    return (
      <div>
        <Title value="Deactivate your account" />

        <FadeIn duration="300ms">
          <div className="dlt_acc">
            <div className="c_p_header">
              <span>Deactivate your account</span>
            </div>

            <DeactivateForm password={password} change={this.changeValue} />

            <div className="dlt_acc_info">
              <span className="dlt_acc_bold">Note:</span>
              <span>
                All of your{' '}
                <span className="dlt_acc_bold">
                  posts, followers, followings, recommendations, messages,
                  groups, settings, notifications, bookmarks & other info will
                  be permanently deleted.
                </span>{' '}
                And you won't be able to find it again.
              </span>
            </div>
          </div>
        </FadeIn>
      </div>
    )
  }
}

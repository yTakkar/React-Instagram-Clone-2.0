import React, { Component, Fragment } from 'react'
import { newConversation } from '../../utils/message-utils'
import { Redirect } from 'react-router'
import SecondaryButton from '../others/button/secondary-btn'
import { shape, number, string } from 'prop-types'

export default class NewConTeaser extends Component {
  state = {
    messaged: false,
  }

  message = e => {
    e.preventDefault()
    let {
      userDetails: { id, username },
    } = this.props
    newConversation({
      user: id,
      username,
      updateConversations: false,
      done: () => this.setState({ messaged: true }),
    })
  }

  render() {
    let { username } = this.props.userDetails
    let { messaged } = this.state

    return (
      <Fragment>
        <div className="recomm_teaser">
          <span>
            Wanna message {username}? Create a private conversation with{' '}
            {username}.
          </span>
          <SecondaryButton label="Message" onClick={this.message} />
        </div>

        {messaged && <Redirect to="/messages" />}
      </Fragment>
    )
  }
}

NewConTeaser.propTypes = {
  userDetails: shape({
    id: number,
    username: string.isRequired,
  }).isRequired,
}

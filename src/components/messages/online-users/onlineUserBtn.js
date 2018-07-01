import React, { Component, Fragment } from 'react'
import OnlineUsers from './onlineUsers'
import FAIcon from '../../others/icons/font-awesome-icon'
import PrimaryButton from '../../others/button/primary-btn'

export default class OnlineUsersButton extends Component {
  state = {
    showOnlineUsers: false,
  }

  show = e => {
    e.preventDefault()
    this.setState({ showOnlineUsers: true })
  }

  btnLabel = () => (
    <Fragment>
      <FAIcon icon="globe" />
      <span>Online users</span>
    </Fragment>
  )

  render() {
    let { showOnlineUsers } = this.state

    return (
      <Fragment>
        <PrimaryButton label={this.btnLabel} onClick={this.show} />

        {showOnlineUsers && (
          <OnlineUsers back={() => this.setState({ showOnlineUsers: false })} />
        )}
      </Fragment>
    )
  }
}

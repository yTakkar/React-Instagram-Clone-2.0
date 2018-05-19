import React, { Component, Fragment } from 'react'
import Overlay from '../../../others/overlay'
import Invite from '../../invite/invite'
import { connect } from 'react-redux'

@connect(store => (
  { gd: store.Group.group_details }
))

export default class InviteToGroup extends Component {

  state = {
    invite: false,
  }

  showInviteModal = e => {
    e.preventDefault()
    this.setState({ invite: !this.state.invite })
  }

  render() {
    let { invite } = this.state
    let { gd: { group_id }, toggleOptions } = this.props

    return (
      <Fragment>
        <li>
          <a href='#' onClick={this.showInviteModal} >Invite to group</a>
        </li>

        {
          invite ?
            <Fragment>
              <Overlay/>
              <Invite
                back={() => {
                  this.setState({ invite: false })
                  toggleOptions()
                }}
                group={group_id}
              />
            </Fragment>
            : null
        }
      </Fragment>
    )
  }
}

import React, { Component, Fragment } from 'react'
import Invite from '../../invite/invite'
import { connect } from 'react-redux'

class InviteToGroup extends Component {
  state = {
    invite: false,
  }

  showInviteModal = e => {
    e.preventDefault()
    this.setState({ invite: !this.state.invite })
  }

  modalBack = () => {
    this.setState({ invite: false })
    this.props.toggleOptions()
  }

  render() {
    let { invite } = this.state
    let {
      gd: { group_id },
    } = this.props

    return (
      <Fragment>
        <li>
          <a href="#" onClick={this.showInviteModal}>
            Invite to group
          </a>
        </li>

        {invite && <Invite back={this.modalBack} group={group_id} />}
      </Fragment>
    )
  }
}

const mapStateToProps = store => ({
  gd: store.Group.group_details,
})

export default connect(mapStateToProps)(InviteToGroup)
export { InviteToGroup as PureInviteToGroup }

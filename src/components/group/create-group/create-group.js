import React, { Component } from 'react'
import CreateGroupModal from './cg-modal'
import SecondaryButton from '../../others/button/secondary-btn'

export default class CreateGroup extends Component {
  state = {
    createGroup: false,
  }

  toggleCreateGroup = e => {
    e.preventDefault()
    this.setState({ createGroup: !this.state.createGroup })
  }

  render() {
    let { createGroup } = this.state

    return (
      <div>
        <div className="recomm_teaser">
          <span>
            Create public or private group of your interest with people you
            know.
          </span>

          <SecondaryButton
            label="Create group"
            onClick={this.toggleCreateGroup}
          />
        </div>

        {createGroup && <CreateGroupModal back={this.toggleCreateGroup} />}
      </div>
    )
  }
}

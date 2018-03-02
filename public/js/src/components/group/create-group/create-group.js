import React, { Fragment } from 'react'
import CreateGroupModal from './cg-modal'
import Overlay from '../../others/overlay'

export default class CreateGroup extends React.Component {

  state = {
    createGroup: false
  }

  toggleCreateGroup = e => {
    e.preventDefault()
    this.setState({ createGroup: !this.state.createGroup })
  }

  render() {
    let { createGroup } = this.state

    return (
      <div>

        <div className='recomm_teaser' >
          <span>Create public or private group of your interest with people you know.</span>
          <a href='#' className='sec_btn' onClick={this.toggleCreateGroup} >Create group</a>
        </div>

        {
          createGroup ?
            <Fragment>
              <Overlay/>
              <CreateGroupModal back={this.toggleCreateGroup} />
            </Fragment>
            : null
        }

      </div>
    )
  }
}

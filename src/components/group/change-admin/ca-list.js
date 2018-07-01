import React, { Component, Fragment } from 'react'
import Prompt from '../../others/prompt'
import { changeAdmin } from '../../../utils/group-utils'
import PrimaryButton from '../../others/button/primary-btn'
import ModalItemInfo from '../../others/modal/modal-item-info'
import { number, string } from 'prop-types'

export default class ChangeAdminList extends Component {
  state = {
    change: false,
  }

  toggleChange = e => {
    e.preventDefault()
    this.setState({ change: true })
  }

  transfer = e => {
    e.preventDefault()
    let { member, group } = this.props
    changeAdmin({ member, group })
  }

  render() {
    let { member, username, firstname, surname } = this.props
    let { change } = this.state

    return (
      <Fragment>
        <div className="modal_items">
          <div className="modal_it_img">
            <img src={`/users/${member}/avatar.jpg`} />
          </div>

          <div className="modal_it_content ">
            <ModalItemInfo info={{ username, firstname, surname }} />
            <div className="modal_ff">
              <PrimaryButton label="Transfer" onClick={this.toggleChange} />
            </div>
          </div>

          <hr />
        </div>

        {change && (
          <Prompt
            title="Transfer admin position"
            content={`${username} will now be the admin of this group. There's no undo and you will no longer be the admin.`}
            actionText="Transfer"
            action={this.transfer}
            back={() => this.setState({ change: false })}
            blurred
          />
        )}
      </Fragment>
    )
  }
}

ChangeAdminList.propTypes = {
  grp_member_id: number.isRequired,
  member: number.isRequired,
  username: string.isRequired,
  firstname: string.isRequired,
  surname: string.isRequired,
  group: number,
}

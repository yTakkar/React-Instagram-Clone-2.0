import React, { Fragment, Component } from 'react'
import { Link } from 'react-router-dom'
import Overlay from '../../others/overlay'
import Prompt from '../../others/prompt'
import { changeAdmin } from '../../../utils/group-utils'
import PrimaryButton from '../../others/button/primary-btn'

export default class ChangeAdminList extends Component {

  state = {
    change: false
  }

  toggleChange = e => {
    e.preventDefault()
    this.setState({ change: true })
  }

  transfer = async e => {
    e.preventDefault()
    let { member, group } = this.props
    changeAdmin({ member, group })
  }

  render() {
    let { member, username, firstname, surname } = this.props
    let { change } = this.state

    return (
      <div>

        <div className='modal_items'>
          <div className='modal_it_img'>
            <img src={`/users/${member}/avatar.jpg`} />
          </div>
          <div className='modal_it_content '>
            <div className='modal_it_info'>
              <Link to={`/profile/${username}`} className='modal_it_username' >{username}</Link>
              <span className='modal_it_light' >{`${firstname} ${surname}`}</span>
            </div>
            <div className='modal_ff'>
              <PrimaryButton
                label='Transfer'
                onClick={this.toggleChange}
              />
            </div>
          </div>
          <hr/>
        </div>

        {
          change ?
            <Fragment>
              <Overlay/>
              <Prompt
                title='Transfer admin position'
                content={`${username} will now be the admin of this group. There's no undo and you will no longer be the admin.`}
                actionText='Transfer'
                action={this.transfer}
                back={() => this.setState({ change: false })}
                blurred={true}
              />
            </Fragment>
            : null
        }

      </div>
    )
  }
}

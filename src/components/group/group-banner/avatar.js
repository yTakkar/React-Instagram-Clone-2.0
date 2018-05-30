import React, { Component, Fragment } from 'react'
import { Me, toggle } from '../../../utils/utils'
import { connect } from 'react-redux'
import d from '../../../utils/API/DOM'
import ViewAvatarAction from '../../others/avatar/actions/view-avatar'
import ChangeAvatarAction from '../../others/avatar/actions/change-avatar'

@connect(store => (
  { gd: store.Group.group_details }
))

export default class GroupAvatar extends Component {

  state = {
    viewAvatar: false,
    changeAvatar: false,
  }

  _toggle = what =>
    this.setState({ [what]: !this.state[what] })

  toggleOptions = () =>
    toggle(new d('.pro_avatar_ch_teaser').toDOM())

  render() {
    let { group_id, admin } = this.props.gd
    let { viewAvatar, changeAvatar } = this.state

    return (
      <Fragment>
        <div
          className='pro_avatar'
          onMouseOver={this.toggleOptions}
          onMouseOut={this.toggleOptions}
        >
          <img
            src={group_id ? `/groups/${group_id}/avatar.jpg`: '/images/wheel.jpg'}
            alt='avatar'
          />
          <div className='pro_avatar_ch_teaser' style={{ display: 'none' }} >
            <span
              className='view_avatar_span'
              onClick={() => this._toggle('viewAvatar')}
            >View</span>
            {
              Me(admin)
                ? <span
                  className='change_pro'
                  onClick={() => this._toggle('changeAvatar')}
                >Change</span>
                : null
            }
          </div>
        </div>

        <ViewAvatarAction
          view={viewAvatar}
          back={() => this._toggle('viewAvatar')}
          when='group'
        />

        <ChangeAvatarAction
          change={changeAvatar}
          back={() => this._toggle('changeAvatar')}
          when='group'
        />

      </Fragment>
    )
  }
}

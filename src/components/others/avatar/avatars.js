import React, { Component, Fragment } from 'react'
import { post } from 'axios'
import PropTypes from 'prop-types'
import MapAvatars from './map-avatars'
import UploadAvatar from './upload-avatar'
import d from '../../../utils/API/DOM'
import AvatarActions from './avatar-actions'
import MaterialIcon from '../icons/material-icon'
import Overlay from '../overlay'

export default class Avatars extends Component {
  state = {
    loading: true,
    avatars: [],
    selectedAvatar: '',
  }

  componentDidMount = async () => {
    let { data: avatars } = await post('/api/get-avatars')
    this.setState({ avatars, loading: false })
  }

  selectAvatar = e => {
    let avatar = new d(`[data-avatar='avatar-${e}']`)
    let siblings = new d('.pro_ava_avts')

    siblings.removeClass('pro_ava_active')
    avatar.addClass('pro_ava_active')
    new d('.btn_select_avatar').focus()

    this.setState({ selectedAvatar: e })
  }

  render() {
    let { avatars, loading, selectedAvatar } = this.state
    let { of, group, back } = this.props

    return (
      <Fragment>
        <Overlay />

        <div className="pro_avatars">
          <div className="pro_ava_top">
            <div className="pro_ava_info">
              <span>Change your avatar</span>
            </div>
            <span className="pro_ava_close" onClick={back}>
              <MaterialIcon icon="close" />
            </span>
          </div>
          <MapAvatars
            avatars={avatars}
            loading={loading}
            selectAvatar={this.selectAvatar}
          />
          <div className="pro_ava_bottom">
            <UploadAvatar of={of} group={group} />

            <AvatarActions
              loading={loading}
              avatar={selectedAvatar}
              {...this.props}
            />
          </div>
        </div>
      </Fragment>
    )
  }
}

Avatars.propTypes = {
  back: PropTypes.func.isRequired,
  of: PropTypes.oneOf(['user', 'group']).isRequired,
  group: PropTypes.number,
}

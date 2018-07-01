import React, { Fragment, Component } from 'react'
import { Me, toggle } from '../../../utils/utils'
import { connect } from 'react-redux'
import d from '../../../utils/API/DOM'
import ChangeAvatarAction from '../../others/avatar/actions/change-avatar'
import ViewAvatarAction from '../../others/avatar/actions/view-avatar'

class BannerAvatar extends Component {
  state = {
    viewAvatar: false,
    changeAvatar: false,
  }

  toggleAvatarOptions = () => toggle(new d('.pro_avatar_ch_teaser').toDOM())

  _toggle = what => this.setState({ [what]: !this.state[what] })

  render() {
    let { id } = this.props.ud
    let { changeAvatar, viewAvatar } = this.state

    let imgSrc = id ? `/users/${id}/avatar.jpg` : '/images/spacecraft.jpg'

    return (
      <Fragment>
        <div
          className="pro_avatar"
          onMouseOver={this.toggleAvatarOptions}
          onMouseOut={this.toggleAvatarOptions}
        >
          <img src={imgSrc} alt="avatar" />

          <div className="pro_avatar_ch_teaser" style={{ display: 'none' }}>
            <span
              className="view_avatar_span"
              onClick={() => this._toggle('viewAvatar')}
            >
              View
            </span>

            {Me(id) && (
              <span
                className="change_pro"
                onClick={() => this._toggle('changeAvatar')}
              >
                Change
              </span>
            )}
          </div>
        </div>

        <ChangeAvatarAction
          change={changeAvatar}
          back={() => this._toggle('changeAvatar')}
          when="user"
        />

        <ViewAvatarAction
          view={viewAvatar}
          back={() => this._toggle('viewAvatar')}
          when="user"
        />
      </Fragment>
    )
  }
}

const mapStateToProps = store => ({
  ud: store.User.user_details,
})

export default connect(mapStateToProps)(BannerAvatar)
export { BannerAvatar as PureBannerAvatar }

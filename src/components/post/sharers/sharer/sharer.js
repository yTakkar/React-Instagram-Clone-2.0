import React, { Component } from 'react'
import { Me } from '../../../../utils/utils'
import { isAdmin } from '../../../../utils/admin-utils'
import PropTypes from 'prop-types'
import RemoveShare from './remove-share'
import SharerInfo from './sharer-info'
import AdvancedFollow from '../../../others/follow/advancedFollow'
import AdvancedUnfollow from '../../../others/follow/advancedUnfollow'
import AppLink from '../../../others/link/link'

export default class Sharer extends Component {
  state = {
    isFollowing: false,
  }

  componentDidMount = () =>
    this.setState({ isFollowing: this.props.isFollowing })

  componentWillReceiveProps = ({ isFollowing }) =>
    this.setState({ isFollowing })

  render() {
    let {
      share_id,
      share_by,
      share_by_username,
      share_by_firstname,
      share_by_surname,
      share_to,
      decrementSharers,
    } = this.props
    let { isFollowing } = this.state

    return (
      <div className="modal_items fer_items">
        <div className="modal_it_img">
          <img src={`/users/${share_by}/avatar.jpg`} />
        </div>

        <div className="modal_it_content">
          <SharerInfo sharerDetails={{ ...this.props }} />

          <div className="modal_ff">
            {Me(share_by) ? (
              <AppLink
                url={`/profile/${share_by_username}`}
                className="pri_btn follow"
                label="Profile"
              />
            ) : Me(share_to) || isAdmin() ? (
              <RemoveShare
                share_id={share_id}
                decrementSharers={decrementSharers}
              />
            ) : isFollowing ? (
              <AdvancedUnfollow
                user={share_by}
                unfollowed={() => this.setState({ isFollowing: false })}
              />
            ) : (
              <AdvancedFollow
                userDetails={{
                  user: share_by,
                  username: share_by_username,
                  firstname: share_by_firstname,
                  surname: share_by_surname,
                }}
                followed={() => this.setState({ isFollowing: true })}
              />
            )}
          </div>
        </div>
        <hr />
      </div>
    )
  }
}

Sharer.propTypes = {
  share_id: PropTypes.number.isRequired,
  share_by: PropTypes.number.isRequired,
  share_by_username: PropTypes.string.isRequired,
  share_by_firstname: PropTypes.string.isRequired,
  share_by_surname: PropTypes.string.isRequired,
  share_to: PropTypes.number.isRequired,
  share_to_username: PropTypes.string.isRequired,
  share_time: PropTypes.string.isRequired,
  post_id: PropTypes.number.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  decrementSharers: PropTypes.func.isRequired,
}

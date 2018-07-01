import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Me } from '../../../../utils/utils'
import { isAdmin } from '../../../../utils/admin-utils'
import PropTypes from 'prop-types'
import Untag from './untag'
import AdvancedFollow from '../../../others/follow/advancedFollow'
import AdvancedUnfollow from '../../../others/follow/advancedUnfollow'
import ModalItemInfo from '../../../others/modal/modal-item-info'

class TagItems extends Component {
  state = {
    isFollowing: false,
  }

  componentDidMount = () =>
    this.setState({ isFollowing: this.props.isFollowing })

  componentWillReceiveProps = ({ isFollowing }) =>
    this.setState({ isFollowing })

  render() {
    let {
      user,
      username,
      firstname,
      surname,
      post_id,
      decrementTags,
      isPostMine,
    } = this.props
    let { isFollowing } = this.state
    let untagOptions = {
      post_id,
      user,
      decrementTags,
    }

    return (
      <div className="modal_items fer_items">
        <div className="modal_it_img">
          <img src={`/users/${user}/avatar.jpg`} />
        </div>
        <div className="modal_it_content">
          <ModalItemInfo info={{ username, firstname, surname }} />

          <div className="modal_ff">
            {isPostMine || isAdmin() ? (
              <Untag {...untagOptions} />
            ) : Me(user) ? (
              <Untag {...untagOptions} />
            ) : isFollowing ? (
              <AdvancedUnfollow
                user={user}
                unfollowed={() => this.setState({ isFollowing: false })}
              />
            ) : (
              <AdvancedFollow
                userDetails={{
                  user,
                  username,
                  firstname,
                  surname,
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

TagItems.propTypes = {
  post_id: PropTypes.number.isRequired,
  post_tag_id: PropTypes.number.isRequired,
  user: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  firstname: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  decrementTags: PropTypes.func.isRequired,
}

const mapStateToProps = store => ({
  isPostMine: store.Post.isPostMine,
  ud: store.User.user_details,
})

export default connect(mapStateToProps)(TagItems)

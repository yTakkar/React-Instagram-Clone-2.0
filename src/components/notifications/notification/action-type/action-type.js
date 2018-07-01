import React, { Component, Fragment } from 'react'
import NotificationTypeProfile from './profile'
import NotificationTypeGroup from './group'
import NotificationTypeCon from './conversation'
import NotificationTypePost from './post'
import PropTypes from 'prop-types'
import Follow from '../../../others/follow/follow'
import Unfollow from '../../../others/follow/unfollow'

export default class NotificationActionType extends Component {
  state = { isFollowing: false }

  componentDidMount = () =>
    this.setState({
      isFollowing: this.props.details.isFollowing,
    })

  componentWillReceiveProps = ({ details: { isFollowing } }) =>
    this.setState({ isFollowing })

  render() {
    let {
      details: {
        type,
        user_username,
        group_id,
        post_id,
        notify_by,
        notify_by_username,
      },
    } = this.props
    let { isFollowing } = this.state

    return (
      <Fragment>
        <div className="noti_right follow_noti_right">
          {/* eslint-disable */

            // show follow button if..
            type == 'follow'
            || type == 'favourites'

              ? isFollowing
                ? <Unfollow
                  user={notify_by}
                  unfollowed={() => this.setState({ isFollowing: false })}
                />
                : <Follow
                  userDetails={{
                    user: notify_by,
                    username: notify_by_username
                  }}
                  followed={() => this.setState({ isFollowing: true })}
                />

            // show post button if..
            : type == 'tag'
            || type == 'like'
            || type == 'share'
            || type == 'shared_your_post'
            || type == 'comment'
            || type == 'mention_post'
            || type == 'mention_comment'
            ? <NotificationTypePost post_id={post_id} />

            // show profile button if..
            : type == 'recommend'
            ? <NotificationTypeProfile user_username={user_username} />

            // show group button if..
            : type == 'add_grp_member'
            || type == 'invite'
            || type == 'change_admin'
            ? <NotificationTypeGroup group_id={group_id} />

            // show conversation button if..
            : type == 'new_con' ? <NotificationTypeCon />

            // else null
            : null

            /* eslint-enable */
          }
        </div>
      </Fragment>
    )
  }
}

NotificationActionType.propTypes = {
  details: PropTypes.shape({
    type: PropTypes.string.isRequired,
    user_username: PropTypes.string.isRequired,
    notify_by: PropTypes.number.isRequired,
    notify_by_username: PropTypes.string.isRequired,
    post_id: PropTypes.number.isRequired,
    group_id: PropTypes.number.isRequired,
    isFollowing: PropTypes.bool.isRequired,
  }).isRequired,
}

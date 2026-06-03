import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Me, wait } from '../../../utils/utils'
import PrimaryButton from '../../others/button/primary-btn'
import SecondaryButton from '../../others/button/secondary-btn'
import { getFriendStatus, setFriendStatus } from '../../../actions/friend'
import {
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  cancelFriendRequest,
  unfriend,
} from '../../../utils/friend-utils'

class BannerFriend extends Component {
  state = { loading: false }

  componentDidMount = () => this.syncStatus(this.props)

  componentDidUpdate(prevProps) {
    if (prevProps.ud.id !== this.props.ud.id) {
      this.syncStatus(this.props)
    }
  }

  syncStatus = props => {
    let { ud, dispatch } = props

    if (!ud.id || Me(ud.id)) {
      dispatch(
        setFriendStatus({
          status: 'none',
          request_id: 0,
          is_sender: false,
        })
      )
      return
    }

    dispatch(getFriendStatus(ud.id))
  }

  runRequest = async action => {
    if (this.state.loading) return
    this.setState({ loading: true })
    wait()
    await action()
    this.setState({ loading: false })
  }

  noop = e => e.preventDefault()

  addFriend = e => {
    e.preventDefault()
    let { ud, dispatch } = this.props
    this.runRequest(() =>
      sendFriendRequest({
        to_user: ud.id,
        dispatch,
        update_status: true,
      })
    )
  }

  cancelRequest = e => {
    e.preventDefault()
    let { friendStatus, dispatch } = this.props
    this.runRequest(() =>
      cancelFriendRequest({
        request_id: friendStatus.request_id,
        dispatch,
        update_status: true,
      })
    )
  }

  acceptRequest = e => {
    e.preventDefault()
    let { friendStatus, dispatch } = this.props
    this.runRequest(() =>
      acceptFriendRequest({
        request_id: friendStatus.request_id,
        dispatch,
        update_status: true,
      })
    )
  }

  rejectRequest = e => {
    e.preventDefault()
    let { friendStatus, dispatch } = this.props
    this.runRequest(() =>
      rejectFriendRequest({
        request_id: friendStatus.request_id,
        dispatch,
        update_status: true,
      })
    )
  }

  unfriendUser = e => {
    e.preventDefault()
    let { ud, dispatch } = this.props
    this.runRequest(() =>
      unfriend({
        user_id: ud.id,
        dispatch,
        update_status: true,
      })
    )
  }

  render() {
    let { ud, friendStatus } = this.props
    let { loading } = this.state
    let { id } = ud

    if (!id || Me(id)) return null

    let status = friendStatus && friendStatus.status ? friendStatus.status : 'none'
    let is_sender = friendStatus && friendStatus.is_sender ? true : false
    let hasRequest = friendStatus && friendStatus.request_id

    return (
      <Fragment>
        {status == 'none' ? (
          <PrimaryButton
            label="Add Friend"
            onClick={this.addFriend}
            disabled={loading}
          />
        ) : status == 'pending' && is_sender ? (
          <Fragment>
            <PrimaryButton
              label="Requested"
              onClick={this.noop}
              disabled
            />
            <SecondaryButton
              label="Cancel"
              onClick={this.cancelRequest}
              disabled={loading}
            />
          </Fragment>
        ) : status == 'pending' ? (
          <Fragment>
            <PrimaryButton
              label="Accept"
              onClick={this.acceptRequest}
              disabled={loading || !hasRequest}
            />
            <SecondaryButton
              label="Reject"
              onClick={this.rejectRequest}
              disabled={loading || !hasRequest}
            />
          </Fragment>
        ) : status == 'accepted' ? (
          <Fragment>
            <PrimaryButton
              label="Friends"
              onClick={this.noop}
              disabled
            />
            <SecondaryButton
              label="Unfriend"
              onClick={this.unfriendUser}
              disabled={loading}
            />
          </Fragment>
        ) : null}
      </Fragment>
    )
  }
}

BannerFriend.propTypes = {
  ud: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  friendStatus: PropTypes.shape({
    status: PropTypes.string,
    request_id: PropTypes.number,
    is_sender: PropTypes.bool,
  }).isRequired,
}

const mapStateToProps = state => ({
  ud: state.User.user_details,
  friendStatus: state.Friend.status,
})

export default connect(mapStateToProps)(BannerFriend)

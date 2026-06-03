import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import PrimaryButton from '../../../others/button/primary-btn'
import SecondaryButton from '../../../others/button/secondary-btn'
import { acceptFriendRequest, rejectFriendRequest } from '../../../../utils/friend-utils'
import { wait } from '../../../../utils/utils'

class NotificationTypeFriendRequest extends Component {
  state = {
    status: 'pending',
    loading: false,
  }

  noop = e => e.preventDefault()

  runRequest = async action => {
    if (this.state.loading) return
    this.setState({ loading: true })
    wait()
    await action()
    this.setState({ loading: false })
  }

  acceptRequest = e => {
    e.preventDefault()
    let { request_id } = this.props

    this.runRequest(async () => {
      let data = await acceptFriendRequest({ request_id })
      if (data.success) {
        this.setState({ status: 'accepted' })
      }
    })
  }

  rejectRequest = e => {
    e.preventDefault()
    let { request_id } = this.props

    this.runRequest(async () => {
      let data = await rejectFriendRequest({ request_id })
      if (data.success) {
        this.setState({ status: 'rejected' })
      }
    })
  }

  render() {
    let { request_id } = this.props
    let { status, loading } = this.state

    if (!request_id) {
      return (
        <SecondaryButton
          label="Request expired"
          onClick={this.noop}
          disabled
        />
      )
    }

    return (
      <Fragment>
        {status == 'accepted' ? (
          <SecondaryButton label="Friends" onClick={this.noop} disabled />
        ) : status == 'rejected' ? (
          <SecondaryButton label="Rejected" onClick={this.noop} disabled />
        ) : (
          <Fragment>
            <PrimaryButton
              label="Accept"
              onClick={this.acceptRequest}
              disabled={loading}
            />
            <SecondaryButton
              label="Reject"
              onClick={this.rejectRequest}
              disabled={loading}
            />
          </Fragment>
        )}
      </Fragment>
    )
  }
}

NotificationTypeFriendRequest.propTypes = {
  request_id: PropTypes.number,
}

NotificationTypeFriendRequest.defaultProps = {
  request_id: 0,
}

export default NotificationTypeFriendRequest

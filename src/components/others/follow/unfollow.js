import React, { Fragment } from 'react'
import { unfollow } from '../../../utils/user-interact-utils'
import { number, func, bool } from 'prop-types'
import { connect } from 'react-redux'
import PrimaryButton from '../button/primary-btn'

/**
 * If there's no need to update store, then only provide user (within userDetails) & followed arguements.
 */

const Unfollow = ({
  user,
  unfollowed,
  updateFollowings,
  updateFollowers,
  dispatch,
}) => {
  let unfollowUser = e => {
    e.preventDefault()
    let obj = {
      user,
      dispatch,
      update_followings: updateFollowings,
      update_followers: updateFollowers,
      done: () => unfollowed(),
    }
    unfollow(obj)
  }

  return (
    <Fragment>
      <PrimaryButton
        label="Unfollow"
        onClick={unfollowUser}
        extraClass="unfollow"
      />
    </Fragment>
  )
}

Unfollow.defaultProps = {
  updateFollowings: false,
  updateFollowers: false,
}

Unfollow.propTypes = {
  user: number.isRequired,
  unfollowed: func.isRequired,
  updateFollowings: bool,
  updateFollowers: bool,
}

export default connect()(Unfollow)

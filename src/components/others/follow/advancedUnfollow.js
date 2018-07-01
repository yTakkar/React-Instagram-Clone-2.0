import React from 'react'
import { Me } from '../../../utils/utils'
import { unfollow } from '../../../utils/user-interact-utils'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import PrimaryButton from '../button/primary-btn'

const AdvancedUnfollow = ({ user, unfollowed, ud, dispatch }) => {
  let { id } = ud

  let unfollowUser = e => {
    e.preventDefault()
    let profile_page = location.pathname.includes('/profile'),
      def = {
        user,
        done: () => unfollowed(),
      },
      obj

    if (!profile_page) {
      obj = def
    } else {
      if (Me(id)) {
        obj = { ...def, dispatch, update_followings: true }
      } else if (user == id) {
        obj = { ...def, dispatch, update_followers: true }
      } else {
        obj = def
      }
    }

    unfollow(obj)
  }

  return (
    <PrimaryButton
      label="Unfollow"
      onClick={unfollowUser}
      extraClass="unfollow"
    />
  )
}

AdvancedUnfollow.propTypes = {
  user: PropTypes.number.isRequired,
  unfollowed: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  ud: state.User.user_details,
})

export default connect(mapStateToProps)(AdvancedUnfollow)

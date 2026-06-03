import React, { Fragment } from 'react'
import { follow } from '../../../utils/user-interact-utils'
import { shape, number, string, func, bool } from 'prop-types'
import { connect } from 'react-redux'
import PrimaryButton from '../button/primary-btn'
import { t } from '../../../utils/translation'

/**
 * If there's no need to update store, then only provide user, username (within userDetails) & followed arguements.
 *
 * Provide firstname & surname when update_followings=true
 */

const Follow = ({
  userDetails,
  followed,
  updateFollowings,
  updateFollowers,
  dispatch,
  lang
}) => {
  let { user, username, firstname, surname } = userDetails

  let followUser = e => {
    e.preventDefault()
    let obj = {
      user,
      username,
      firstname,
      surname,
      dispatch,
      update_followings: updateFollowings,
      update_followers: updateFollowers,
      done: () => followed(),
    }
    follow(obj)
  }

  return (
    <Fragment>
      <PrimaryButton label={t(lang, 'actions', 'follow')} onClick={followUser} extraClass="follow" />
    </Fragment>
  )
}

Follow.defaultProps = {
  updateFollowings: false,
  updateFollowers: false,
}

Follow.propTypes = {
  userDetails: shape({
    user: number.isRequired,
    username: string.isRequired,
    firstname: string,
    surname: string,
  }).isRequired,
  followed: func.isRequired,
  updateFollowings: bool,
  updateFollowers: bool,
}

const mapStateToProps = state => ({
  lang: state.Language.language
})

export default connect(mapStateToProps)(Follow)

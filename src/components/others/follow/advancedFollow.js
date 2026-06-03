import React from 'react'
import { Me } from '../../../utils/utils'
import { follow } from '../../../utils/user-interact-utils'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import PrimaryButton from '../button/primary-btn'
import { t } from '../../../utils/translation'

const AdvancedFollow = ({ userDetails, followed, ud, dispatch, lang }) => {
  let { user, username, firstname, surname } = userDetails
  let { id } = ud

  let followUser = e => {
    e.preventDefault()
    let profile_page = location.pathname.includes('/profile'),
      def = {
        user,
        username,
        done: () => followed(),
      },
      obj

    if (!profile_page) {
      obj = def
    } else if (profile_page) {
      if (Me(id)) {
        obj = {
          ...def,
          firstname,
          surname,
          dispatch,
          update_followings: true,
        }
      } else if (user == id) {
        obj = { ...def, dispatch, update_followers: true }
      } else {
        obj = def
      }
    }

    follow(obj)
  }

  return (
    <PrimaryButton label={t(lang, 'actions', 'follow')} onClick={followUser} extraClass="follow" />
  )
}

AdvancedFollow.propTypes = {
  userDetails: PropTypes.shape({
    user: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    firstname: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
  }).isRequired,
  followed: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  ud: state.User.user_details,
  lang: state.Language.language
})

export default connect(mapStateToProps)(AdvancedFollow)

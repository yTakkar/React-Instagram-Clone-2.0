import React, { Fragment } from 'react'
import { Me } from '../../../utils/utils'
import Nothing from '../nothing'
import End from '../end'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const FollowSectionEnd = ({ loading, len, when, ud }) => {
  let { id, username } = ud

  return (
    <Fragment>
      {!loading && len == 0 ? (
        <Nothing
          mssg={
            Me(id) ? `You have no ${when}!!` : `${username} have no ${when}!!`
          }
        />
      ) : !loading && len != 0 ? (
        <End />
      ) : null}
    </Fragment>
  )
}

FollowSectionEnd.propTypes = {
  loading: PropTypes.bool.isRequired,
  len: PropTypes.number.isRequired,
  when: PropTypes.oneOf(['followers', 'followings']).isRequired,
}

const mapStateToProps = state => ({
  ud: state.User.user_details,
})

export default connect(mapStateToProps)(FollowSectionEnd)

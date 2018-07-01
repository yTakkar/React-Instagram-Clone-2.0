import React, { Fragment } from 'react'
import { leaveGroup } from '../../../utils/group-utils'
import { shape, number, func } from 'prop-types'
import { connect } from 'react-redux'
import PrimaryButton from '../../others/button/primary-btn'

/**
 * Provide dispatch when updateGroups=true
 */

const Leave = ({ leaveDetails, leaved, updateGroups, dispatch }) => {
  let { user, group_id } = leaveDetails

  let leave = e => {
    e.preventDefault()
    leaveGroup({
      user,
      group: group_id,
      updateGroups,
      dispatch,
      done: () => leaved(),
    })
  }

  return (
    <Fragment>
      <PrimaryButton
        label="Leave group"
        onClick={leave}
        extraClass="unfollow"
      />
    </Fragment>
  )
}

Leave.defaultProps = {
  updateGroups: false,
}

Leave.propTypes = {
  leaveDetails: shape({
    user: number.isRequired,
    group_id: number.isRequired,
  }).isRequired,
  leaved: func.isRequired,
}

export default connect()(Leave)
export { Leave as PureLeave }

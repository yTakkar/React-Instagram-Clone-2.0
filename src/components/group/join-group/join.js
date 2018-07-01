import React, { Fragment } from 'react'
import { joinGroup } from '../../../utils/group-utils'
import { shape, number, func } from 'prop-types'
import PrimaryButton from '../../others/button/primary-btn'

const Join = ({ joinDetails, joined }) => {
  let { user, addedBy, group_id } = joinDetails

  let join = e => {
    e.preventDefault()
    joinGroup({
      user,
      added_by: addedBy,
      group: group_id,
      done: () => joined(),
    })
  }

  return (
    <Fragment>
      <PrimaryButton label="Join group" onClick={join} extraClass="follow" />
    </Fragment>
  )
}

Join.propTypes = {
  joinDetails: shape({
    user: number.isRequired,
    addedBy: number.isRequired,
    group_id: number.isRequired,
  }).isRequired,
  joined: func.isRequired,
}

export default Join

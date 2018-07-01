import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import DeleteGroup from './deleteGroup'
import ChangeGroupAdmin from './changeAdmin'
import InviteToGroup from './invite'
import CopyLink from '../../../others/copyLink'

const GroupOptions = ({ toggleOptions }) => {
  return (
    <Fragment>
      <ul>
        <InviteToGroup toggleOptions={toggleOptions} />
        <ChangeGroupAdmin toggleOptions={toggleOptions} />
        <DeleteGroup toggleOptions={toggleOptions} />
        <CopyLink
          label="Copy group link"
          url={location.href}
          done={toggleOptions}
        />
      </ul>
    </Fragment>
  )
}

GroupOptions.propTypes = {
  toggleOptions: PropTypes.func.isRequired,
}

export default GroupOptions

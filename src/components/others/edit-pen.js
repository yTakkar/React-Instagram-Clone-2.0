import React from 'react'
import ToolTip from 'react-tooltip'
import PropTypes from 'prop-types'
import MaterialIcon from './icons/material-icon'
import AppLink from './link/link'

const EditPen = ({ to, when }) => (
  <div className="a_edit" style={{ display: 'none' }} data-tip={`Edit ${when}`}>
    <AppLink url={to}>
      <MaterialIcon icon="mode_edit" />
    </AppLink>

    <ToolTip />
  </div>
)

EditPen.propTypes = {
  to: PropTypes.string.isRequired,
  when: PropTypes.oneOf(['profile', 'group']).isRequired,
}

export default EditPen

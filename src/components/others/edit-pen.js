import React from 'react'
import { Link } from 'react-router-dom'
import ToolTip from 'react-tooltip'
import PropTypes from 'prop-types'
import MaterialIcon from './icons/material-icon'

const EditPen = ({ to, when }) => (
  <div
    className='a_edit'
    style={{ display: 'none' }}
    data-tip={`Edit ${when}`}
  >
    <Link to={to} >
      <MaterialIcon icon='mode_edit' />
    </Link>

    <ToolTip/>
  </div>
)

EditPen.propTypes = {
  to: PropTypes.string.isRequired,
  when: PropTypes.oneOf([ 'profile', 'group' ]).isRequired
}

export default EditPen

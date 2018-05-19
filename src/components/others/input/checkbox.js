import React, { Fragment } from 'react'
import { string, bool, func } from 'prop-types'

const CheckBox = ({ label, checked, disabled, changeValue }) => {
  return (
    <Fragment>
      <input
        type='checkbox'
        className='inst_checkbox'
        id='grp_private'
        disabled={disabled}
        checked={checked}
        onChange={changeValue}
      />
      <label for='grp_private'>{label}</label>
    </Fragment>
  )
}

CheckBox.defaultProps = {
  checked: false,
  disabled: false,
  label: ''
}

CheckBox.propTypes = {
  label: string.isRequired,
  checked: bool.isRequired,
  disabled: bool.isRequired,
  changeValue: func.isRequired
}

export default CheckBox

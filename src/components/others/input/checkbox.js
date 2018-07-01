import React, { Fragment } from 'react'
import { string, bool, func } from 'prop-types'

const CheckBox = ({ label, checked, disabled, changeValue, ...props }) => {
  return (
    <Fragment>
      <input
        type="checkbox"
        className="inst_checkbox"
        id="grp_private"
        disabled={disabled}
        checked={checked}
        onChange={changeValue}
        {...props}
      />
      <label for="grp_private">{label}</label>
    </Fragment>
  )
}

CheckBox.defaultProps = {
  checked: false,
  disabled: false,
  label: '',
}

CheckBox.propTypes = {
  label: string.isRequired,
  checked: bool.isRequired,
  changeValue: func.isRequired,
  disabled: bool,
}

export default CheckBox

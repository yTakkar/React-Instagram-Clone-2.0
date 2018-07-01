import React from 'react'
import PropTypes from 'prop-types'
import TextInput from '../../../others/input/text'

const PasswordSection = ({ label, value, change, autoFocus }) => (
  <div>
    <span>{label}</span>
    <TextInput
      type="password"
      placeholder={label}
      value={value}
      autoFocus={autoFocus}
      valueChange={change}
    />
  </div>
)

PasswordSection.defaultProps = {
  autoFocus: false,
}

PasswordSection.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
  autoFocus: PropTypes.bool,
}

export default PasswordSection

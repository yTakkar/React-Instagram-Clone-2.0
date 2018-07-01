import React from 'react'
import { string, func, oneOf, bool } from 'prop-types'

const TextInput = ({ type, placeholder, value, valueChange, ...props }) => (
  <input
    type={type}
    placeholder={placeholder}
    spellCheck="false"
    autoComplete="false"
    value={value}
    onChange={valueChange}
    {...props}
  />
)

TextInput.defaultProps = {
  type: 'text',
  placeholder: '',
  value: '',
  maxLength: '255',
  disabled: false,
}

TextInput.propTypes = {
  type: oneOf(['text', 'email', 'password']),
  placeholder: string.isRequired,
  value: string.isRequired,
  valueChange: func.isRequired,
  maxLength: string,
  disabled: bool,
}

export default TextInput

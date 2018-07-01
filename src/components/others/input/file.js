import React, { Fragment } from 'react'
import { string, func, oneOfType } from 'prop-types'

const FileInput = ({ label, value, fileChange, labelClass, ...props }) => {
  return (
    <Fragment>
      <input
        type="file"
        id="file_input"
        accept="image/*"
        value={value}
        onChange={fileChange}
        {...props}
      />
      <label for="file_input" className={labelClass}>
        {typeof label == 'function' ? label() : label}
      </label>
    </Fragment>
  )
}

FileInput.defaultProps = {
  value: '',
  label: '',
  labelClass: '',
}

FileInput.propTypes = {
  value: string.isRequired,
  fileChange: func.isRequired,
  label: oneOfType([string, func]).isRequired,
  labelClass: string,
}

export default FileInput

import React, { Fragment } from 'react'
import { number, func, oneOfType, string } from 'prop-types'

const RangeInput = ({ value, min, max, onChange, ...props }) => (
  <Fragment>
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={onChange}
      {...props}
    />
  </Fragment>
)

RangeInput.defaultProps = {
  value: '',
  min: 0,
}

RangeInput.propTypes = {
  value: oneOfType([string, number]).isRequired,
  min: number.isRequired,
  max: number.isRequired,
  onChange: func.isRequired,
}

export default RangeInput

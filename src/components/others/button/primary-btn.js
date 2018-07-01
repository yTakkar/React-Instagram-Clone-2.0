import React, { Fragment } from 'react'
import { string, func, bool, oneOfType } from 'prop-types'
import classNames from 'classnames'

const PrimaryButton = ({ label, onClick, extraClass, disabled, ...props }) => {
  let disabledClass = disabled ? 'a_disabled' : ''

  return (
    <Fragment>
      <a
        href="#"
        className={classNames('pri_btn', extraClass, disabledClass)}
        onClick={onClick}
        {...props}
      >
        {typeof label == 'function' ? label() : label}
      </a>
    </Fragment>
  )
}

PrimaryButton.defaultProps = {
  label: '',
  disabled: false,
  extraClass: '',
}

PrimaryButton.propTypes = {
  label: oneOfType([string, func]).isRequired,
  onClick: func.isRequired,
  extraClass: string,
  disabled: bool,
}

export default PrimaryButton

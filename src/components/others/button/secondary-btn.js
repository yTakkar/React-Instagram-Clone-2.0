import React, { Fragment } from 'react'
import { string, func, bool, oneOfType } from 'prop-types'
import classNames from 'classnames'

const SecondaryButton = ({
  label,
  onClick,
  extraClass,
  disabled,
  ...props
}) => {
  let disabledClass = disabled ? 'sec_btn_disabled' : ''

  return (
    <Fragment>
      <a
        href="#"
        className={classNames('sec_btn', extraClass, disabledClass)}
        onClick={onClick}
        {...props}
      >
        {typeof label == 'function' ? label() : label}
      </a>
    </Fragment>
  )
}

SecondaryButton.defaultProps = {
  label: '',
  disabled: false,
  extraClass: '',
}

SecondaryButton.propTypes = {
  label: oneOfType([string, func]).isRequired,
  onClick: func.isRequired,
  extraClass: string,
  disabled: bool,
}

export default SecondaryButton

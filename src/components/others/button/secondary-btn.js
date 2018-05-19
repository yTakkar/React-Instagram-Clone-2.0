import React, { Fragment } from 'react'
import { string, func, bool, oneOfType } from 'prop-types'

const SecondaryButton = ({ label, onClick, extraClass, disabled }) => {
  let disabledClass = disabled ? 'sec_btn_disabled' : ''

  return (
    <Fragment>
      <a
        href='#'
        className={`sec_btn ${extraClass} ${disabledClass}`}
        onClick={onClick}
      >
        {
          typeof(label) == 'function'
            ? label()
            : label
        }
      </a>
    </Fragment>
  )
}

SecondaryButton.defaultProps = {
  label: '',
  disabled: false,
  extraClass: ''
}

SecondaryButton.propTypes = {
  label: oneOfType([
    string,
    func
  ]).isRequired,
  onClick: func.isRequired,
  extraClass: string,
  disabled: bool,
}

export default SecondaryButton

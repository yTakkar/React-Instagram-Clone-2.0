import React, { Fragment } from 'react'
import { string } from 'prop-types'
import classNames from 'classnames'

const FAIcon = ({ icon, ...props }) => (
  <Fragment>
    <i className={classNames('fas', `fa-${icon}`)} {...props} />
  </Fragment>
)

FAIcon.propTypes = {
  icon: string.isRequired,
}

export default FAIcon

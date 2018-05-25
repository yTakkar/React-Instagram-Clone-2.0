import React, { Fragment } from 'react'
import { string } from 'prop-types'

const FAIcon = ({ icon,...props }) => (
  <Fragment>
    <i
      className={`fas fa-${icon}`}
      {...props}
    ></i>
  </Fragment>
)

FAIcon.propTypes = {
  icon: string.isRequired
}

export default FAIcon

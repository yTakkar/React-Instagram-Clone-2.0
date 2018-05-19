import React, { Fragment } from 'react'
import { string } from 'prop-types'

const FAIcon = ({ icon }) => (
  <Fragment>
    <i
      className={`fas fa-${icon}`}
    ></i>
  </Fragment>
)

FAIcon.propTypes = {
  icon: string.isRequired
}

export default FAIcon
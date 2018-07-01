import React, { Fragment } from 'react'
import { string } from 'prop-types'

const MaterialIcon = ({ icon, ...props }) => (
  <Fragment>
    <i className="material-icons" {...props}>
      {icon}
    </i>
  </Fragment>
)

MaterialIcon.propTypes = {
  icon: string.isRequired,
}

export default MaterialIcon

import React, { Fragment } from 'react'
import { string } from 'prop-types'

const MaterialIcon = ({ icon }) => (
  <Fragment>
    <i className='material-icons'>{icon}</i>
  </Fragment>
)

MaterialIcon.propTypes = {
  icon: string.isRequired
}

export default MaterialIcon

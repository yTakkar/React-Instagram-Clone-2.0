import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

const ProfileNavLink = ({ url, label }) => {
  return (
    <li>
      <NavLink
        to={url}
        exact
        activeClassName="pro_nav_active"
        className="inst_nav"
      >
        {label}
      </NavLink>
    </li>
  )
}

ProfileNavLink.propTypes = {
  url: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
}

export default ProfileNavLink

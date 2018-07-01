import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

const SettingsNav = ({ url }) => {
  let commonProps = {
    activeClassName: 'settings_nav_active',
    className: 'settings_nav',
  }

  return (
    <div className="settings_nav_div">
      <ul>
        <li>
          <NavLink to={`${url}`} exact {...commonProps}>
            Profile settings
          </NavLink>
        </li>

        <li>
          <NavLink to={`${url}/change-password`} {...commonProps}>
            Change password
          </NavLink>
        </li>

        <li>
          <NavLink to={`${url}/deactivate`} {...commonProps}>
            Deactivate
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

SettingsNav.propTypes = {
  url: PropTypes.string.isRequired,
}

export default SettingsNav

import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

const SettingsNav = ({ url }) => (
  <div className='settings_nav_div'>
    <ul>
      <li>
        <NavLink
          to={`${url}`} exact
          activeClassName='settings_nav_active'
          className='settings_nav'
        >Profile settings</NavLink>
      </li>
      <li>
        <NavLink
          to={`${url}/change-password`}
          activeClassName='settings_nav_active'
          className='settings_nav'
        >Change password</NavLink>
      </li>
      <li>
        <NavLink
          to={`${url}/deactivate`}
          activeClassName='settings_nav_active'
          className='settings_nav'
        >Deactivate</NavLink>
      </li>
    </ul>
  </div>
)

SettingsNav.propTypes = {
  url: PropTypes.string.isRequired
}

export default SettingsNav

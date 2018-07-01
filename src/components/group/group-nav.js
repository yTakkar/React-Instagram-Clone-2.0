import React from 'react'
import { Me } from '../../utils/utils'
import { isAdmin } from '../../utils/admin-utils'
import ProfileNavLink from '../others/profile-navlink'
import PropTypes from 'prop-types'

const GroupNav = ({ url, admin }) => (
  <div className="pro_nav user_nav">
    <ul>
      <ProfileNavLink url={url} label="Posts" />
      <ProfileNavLink url={`${url}/members`} label="Members" />
      <ProfileNavLink url={`${url}/gallery`} label="Gallery" />
      {(Me(admin) || isAdmin()) && (
        <ProfileNavLink url={`${url}/edit`} label="Edit" />
      )}
      {Me(admin) && (
        <ProfileNavLink url={`${url}/add-members`} label="Add members" />
      )}
      <ProfileNavLink url={`${url}/about`} label="About" />
    </ul>
  </div>
)

GroupNav.propTypes = {
  url: PropTypes.string.isRequired,
  admin: PropTypes.number,
}

export default GroupNav

import React from 'react'
import ProfileNavLink from '../others/profile-navlink'
import PropTypes from 'prop-types'
import { Me } from '../../utils/utils'

const Nav = ({ url, user }) => {
  return (
    <div
      className={`pro_nav user_nav ${!Me(user) ? 'not_me_nav' : ''}`}
    >
      <ul>
        <ProfileNavLink url={url} label='Posts' />
        <ProfileNavLink url={`${url}/tagged`} label='Tagged' />
        <ProfileNavLink url={`${url}/shared`} label='Shared' />
        <ProfileNavLink url={`${url}/gallery`} label='Gallery' />
        {
          Me(user) ?
            <ProfileNavLink url={`${url}/bookmarks`} label='Bookmarks' />
            : null
        }
        <ProfileNavLink url={`${url}/groups`} label='Groups' />
        <ProfileNavLink url={`${url}/about`} label='About' />
      </ul>
    </div>
  )
}

Nav.propTypes = {
  url: PropTypes.string.isRequired,
  user: PropTypes.number
}

export default Nav

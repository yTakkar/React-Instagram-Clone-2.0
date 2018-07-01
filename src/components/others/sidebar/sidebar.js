import React from 'react'
import { isAdmin } from '../../../utils/admin-utils'
import { NavLink } from 'react-router-dom'
import { post } from 'axios'
import Notify from 'handy-notification'
import PropTypes from 'prop-types'
import SidebarBottom from './bottom'
import SidebarLink from './link'
import { uData } from '../../../utils/utils'

const SideBar = ({ uc, un }) => {
  let username = uData('username')
  let profile = `/profile/${username}`

  let adminLogout = async e => {
    e.preventDefault()
    await post('/api/admin-logout')
    Notify({
      value: 'Logged out as admin',
      done: () => location.reload(),
    })
  }

  return (
    <div className="m_n_wrapper">
      <div className="m_n">
        <ul className="m_n_ul">
          <SidebarLink link={profile} label={`@${username}`} />
          <SidebarLink link="/" label="Home" />
          <SidebarLink link="/explore" label="Explore" />
          <SidebarLink
            link="/notifications"
            label="Notifications"
            showNumbers
            numbers={un}
          />
          <SidebarLink
            link="/messages"
            label="Messages"
            showNumbers
            numbers={uc}
          />
          <SidebarLink link={`${profile}/bookmarks`} label="Bookmarks" />
          <SidebarLink link={`${profile}/gallery`} label="Gallery" />
          <SidebarLink link={`${profile}/favourites`} label="Favourites" />
          <SidebarLink link={`${profile}/groups`} label="Groups" />
          <SidebarLink
            link={`${profile}/recommendations`}
            label="Recommendations"
          />
          <SidebarLink link="/edit-profile" label="Edit profile" />
          <SidebarLink link="/settings" label="Settings" />
          <li>
            {isAdmin() ? (
              <a href="#" className="admin-logout" onClick={adminLogout}>
                Log out as admin
              </a>
            ) : (
              <NavLink
                to={`/admin-login?to=${location.pathname}`}
                className="m_n_a_admin"
              >
                Are you admin?
              </NavLink>
            )}
          </li>
        </ul>
      </div>

      <SidebarBottom />
    </div>
  )
}

SideBar.propTypes = {
  un: PropTypes.number.isRequired,
  uc: PropTypes.number.isRequired,
}

export default SideBar

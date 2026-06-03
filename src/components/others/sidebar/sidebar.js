import React from 'react'
import { isAdmin } from '../../../utils/admin-utils'
import { NavLink } from 'react-router-dom'
import { post } from 'axios'
import Notify from 'handy-notification'
import PropTypes from 'prop-types'
import SidebarBottom from './bottom'
import SidebarLink from './link'
import { uData } from '../../../utils/utils'
import { connect } from 'react-redux'
import { t } from '../../../utils/translation'
import { setLanguage } from '../../../actions/language'

const SideBar = ({ uc, un, lang, dispatch }) => {
  let username = uData('username')
  let profile = `/profile/${username}`

  let adminLogout = async e => {
    e.preventDefault()
    await post('/api/admin-logout')
    Notify({
      value: t(lang, 'sidebar', 'adminLogout'),
      done: () => location.reload(),
    })
  }

  return (
    <div className="m_n_wrapper">
      <div className="m_n">
        <ul className="m_n_ul">
          <SidebarLink link={profile} label={`@${username}`} />
          <SidebarLink link="/" label={t(lang, 'sidebar', 'home')} />
          <SidebarLink link="/explore" label={t(lang, 'sidebar', 'explore')} />
          <SidebarLink
            link="/notifications"
            label={t(lang, 'sidebar', 'notifications')}
            showNumbers
            numbers={un}
          />
          <SidebarLink
            link="/messages"
            label={t(lang, 'sidebar', 'messages')}
            showNumbers
            numbers={uc}
          />
          <SidebarLink link={`${profile}/bookmarks`} label={t(lang, 'sidebar', 'bookmarks')} />
          <SidebarLink link={`${profile}/gallery`} label={t(lang, 'sidebar', 'gallery')} />
          <SidebarLink link={`${profile}/favourites`} label={t(lang, 'sidebar', 'favourites')} />
          <SidebarLink link={`${profile}/groups`} label={t(lang, 'sidebar', 'groups')} />
          <SidebarLink
            link={`${profile}/recommendations`}
            label={t(lang, 'sidebar', 'recommendations')}
          />
          <SidebarLink link="/edit-profile" label={t(lang, 'sidebar', 'editProfile')} />
          <SidebarLink link="/settings" label={t(lang, 'sidebar', 'settings')} />
          {isAdmin() && (
            <SidebarLink link="/admin-dashboard" label={t(lang, 'sidebar', 'adminDashboard')} />
          )}
          <li>
             {isAdmin() ? (
              <a href="#" className="admin-logout" onClick={adminLogout}>
                {t(lang, 'sidebar', 'adminLogout')}
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

const mapStateToProps = state => ({
  lang: state.Language.language
})

export default connect(mapStateToProps)(SideBar)

import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { uData } from '../../../utils/utils'
import MaterialIcon from '../icons/material-icon'

const HeaderTopLinks = () => {
  let id = uData('session')
  let username = uData('username')

  return (
    <Fragment>
      <NavLink
        to="/notifications"
        activeClassName="ha_active"
        className="notification"
      >
        <span className="notification_span nav_icon">
          <MaterialIcon icon="notifications_none" />
        </span>
        <span className="links_span">Notifications</span>
      </NavLink>

      <NavLink
        to={`/profile/${username}`}
        activeClassName="ha_active"
        className="sp"
      >
        <img src={`/users/${id}/avatar.jpg`} alt="avatar" className="sp_img" />
        <span className="sp_span">{username}</span>
      </NavLink>
    </Fragment>
  )
}

export default HeaderTopLinks

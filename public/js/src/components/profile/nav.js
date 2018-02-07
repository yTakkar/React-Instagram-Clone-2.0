import React from 'react'
import { NavLink } from 'react-router-dom'

export default class Nav extends React.Component {
  render() {
    let { url } = this.props

    return (
      <div className="pro_nav user_nav">
        <ul>
          <li>
            <NavLink
              to={`${url}`}
              exact
              activeClassName='pro_nav_active'
              className="inst_nav">Posts</NavLink>
          </li>
          <li>
            <NavLink
              to={`${url}/tagged`}
              activeClassName='pro_nav_active'
              className="inst_nav">Tagged</NavLink>
          </li>
          <li>
            <NavLink
              to={`${url}/shared`}
              activeClassName='pro_nav_active'
              className="inst_nav">Shared</NavLink>
          </li>
          <li>
            <NavLink
              to={`${url}/gallery`}
              activeClassName='pro_nav_active'
              className="inst_nav">Gallery</NavLink>
          </li>
          <li>
            <NavLink
              to={`${url}/bookmarks`}
              activeClassName='pro_nav_active'
              className="inst_nav">Bookmarks</NavLink>
          </li>
          <li>
            <NavLink
              to={`${url}/groups`}
              activeClassName='pro_nav_active'
              className="inst_nav">Groups</NavLink>
          </li>
          <li>
            <NavLink
              to={`${url}/about`}
              activeClassName='pro_nav_active'
              className="inst_nav">About</NavLink>
          </li>
        </ul>
      </div>
    )
  }
}

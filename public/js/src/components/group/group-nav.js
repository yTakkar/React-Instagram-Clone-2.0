import React from 'react'
import { NavLink } from 'react-router-dom'
import { Me } from '../../utils/utils'

export default class GroupNav extends React.Component {
  render() {
    let { url, admin } = this.props

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
              to={`${url}/members`}
              activeClassName='pro_nav_active'
              className="inst_nav">Members</NavLink>
          </li>
          <li>
            <NavLink
              to={`${url}/gallery`}
              activeClassName='pro_nav_active'
              className="inst_nav">gallery</NavLink>
          </li>
          {
            Me(admin) ?
              <li>
                <NavLink
                  to={`${url}/edit`}
                  activeClassName='pro_nav_active'
                  className="inst_nav">Edit</NavLink>
              </li>
              : null
          }
          {
            Me(admin) ?
              <li>
                <NavLink
                  to={`${url}/add-members`}
                  activeClassName='pro_nav_active'
                  className="inst_nav">Add members</NavLink>
              </li>
              : null
          }
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

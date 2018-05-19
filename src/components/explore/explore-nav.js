import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

const ExploreNav = ({ url }) => (
  <Fragment>
    <ul>
      <li>
        <NavLink
          to={`${url}`}
          exact activeClassName='exp_nav_active'
          className='exp_nav_link'
        >Users</NavLink>
      </li>
      <li>
        <NavLink
          to={`${url}/explore-photos`}
          activeClassName='exp_nav_active'
          className='exp_nav_link'
        >Photos</NavLink>
      </li>
      <li>
        <NavLink
          to={`${url}/explore-groups`}
          activeClassName='exp_nav_active'
          className='exp_nav_link'
        >Groups</NavLink>
      </li>
    </ul>
  </Fragment>
)

ExploreNav.propTypes = {
  url: PropTypes.string.isRequired
}

export default ExploreNav

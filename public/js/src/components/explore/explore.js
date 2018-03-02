import React from 'react'
import { FadeIn } from 'animate-components'
import { connect } from 'react-redux'
import { getUnreadNotifications } from '../../store/actions/notification-a'
import { getUnreadMessages } from '../../store/actions/message-a'
import { Route, Switch, Redirect, NavLink } from 'react-router-dom'
import $ from 'jquery'

import ExpUsers from './users/exp-users'
import ExpPhotos from './photos/exp-photos'
import ExpGroups from './groups/exp-groups'
import { getUsersToExplore, getPhotosToExplore, getGroupsToExplore } from '../../store/actions/explore-a'

@connect(store => {
  return {
    store
  }
})

export default class Explore extends React.Component {

  componentDidMount = () => {
    let { dispatch } = this.props
    dispatch(getUnreadNotifications())
    dispatch(getUnreadMessages())
  }

  refresh = e => {
    e.preventDefault()
    let { location: { pathname }, dispatch } = this.props

    if(pathname == '/explore') {
      dispatch(getUsersToExplore())
    } else if(pathname == '/explore/explore-photos') {
      dispatch(getPhotosToExplore())
    } else if (pathname == '/explore/explore-groups') {
      dispatch(getGroupsToExplore())
    }

    $('.exp_refresh').blur()
  }

  render() {
    let { match: { url } } = this.props

    return (
      <div>

        <FadeIn duration='300ms'>

          <div className='exp_nav'>
            <ul>
              <li>
                <NavLink to={`${url}`} exact activeClassName='exp_nav_active' className='exp_nav_link'>Users</NavLink>
              </li>
              <li>
                <NavLink to={`${url}/explore-photos`} activeClassName='exp_nav_active' className='exp_nav_link'>Photos</NavLink>
              </li>
              <li>
                <NavLink to={`${url}/explore-groups`} activeClassName='exp_nav_active' className='exp_nav_link'>Groups</NavLink>
              </li>
            </ul>

            <a className='tir_btn exp_refresh' href='#' onClick={this.refresh} >
              <i className='fa fa-refresh' aria-hidden='true'></i> Refresh
            </a>
          </div>

          <div className='exp_hmm'>
            <Switch>
              <Route path={`${url}`} exact component={ExpUsers} />
              <Route path={`${url}/explore-photos`} component={ExpPhotos} />
              <Route path={`${url}/explore-groups`} component={ExpGroups} />
              <Redirect to='/error' />
            </Switch>
          </div>

        </FadeIn>

      </div>
    )
  }
}

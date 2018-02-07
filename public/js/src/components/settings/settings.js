import React from 'react'
import { FadeIn } from 'animate-components'
import { Switch, Route, Redirect, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUnreadNotifications } from '../../store/actions/notification-a'
import { getUnreadMessages } from '../../store/actions/message-a'

import ChangePassword from './sections/change-password'
import ProfileSettings from './sections/profile-settings'
import Deactivate from './sections/deactivate'

@connect(store => {
  return {
    store
  }
})

export default class Settings extends React.Component {

  componentDidMount = () => {
    let { dispatch } = this.props
    dispatch(getUnreadNotifications())
    dispatch(getUnreadMessages())
  }

  render() {
    let { match: { url } } = this.props

    return (
      <div>

        <FadeIn duration='300ms'>
          <div className='senapati'>

            <div className='srajkumar settings_srajkumar'>
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
            </div>

            <div className='prajkumar settings_prajkumar'>
              <Switch>
                <Route path={`${url}`} exact component={ProfileSettings} />
                <Route path={`${url}/change-password`} component={ChangePassword} />
                <Route path={`${url}/deactivate`} component={Deactivate} />
                <Redirect to='/error' />
              </Switch>
            </div>

          </div>
        </FadeIn>

      </div>
    )
  }
}

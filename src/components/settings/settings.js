import React, { Component } from 'react'
import { FadeIn } from 'animate-components'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUnreadNotifications } from '../../actions/notification'
import { getUnreadMessages } from '../../actions/message'
import SettingsNav from './settings-nav'

import ChangePassword from './sections/change-password/change-password'
import ProfileSettings from './sections/profile-settings/profile-settings'
import Deactivate from './sections/deactivate/deactivate'

@connect()
export default class Settings extends Component {

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
              <SettingsNav url={url} />
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

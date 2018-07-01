import React from 'react'
import { Switch, Route, Redirect } from 'react-router'
import { string } from 'prop-types'

import ProfileSettings from './sections/profile-settings/profile-settings'
import ChangePassword from './sections/change-password/change-password'
import Deactivate from './sections/deactivate/deactivate'

const SettingsRoutes = ({ url }) => (
  <div className="prajkumar settings_prajkumar">
    <Switch>
      <Route path={`${url}`} exact component={ProfileSettings} />
      <Route path={`${url}/change-password`} component={ChangePassword} />
      <Route path={`${url}/deactivate`} component={Deactivate} />
      <Redirect to="/error" />
    </Switch>
  </div>
)

SettingsRoutes.propTypes = {
  url: string.isRequired,
}

export default SettingsRoutes

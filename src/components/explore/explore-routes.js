import React from 'react'
import { Switch, Route, Redirect } from 'react-router'
import { string } from 'prop-types'

import ExploreUsers from './users/explore-users'
import ExplorePhotos from './photos/explore-photos'
import ExploreGroups from './groups/explore-groups'

const ExploreRoutes = ({ url }) => (
  <div className="exp_hmm">
    <Switch>
      <Route path={`${url}`} exact component={ExploreUsers} />
      <Route path={`${url}/explore-photos`} component={ExplorePhotos} />
      <Route path={`${url}/explore-groups`} component={ExploreGroups} />
      <Redirect to="/error" />
    </Switch>
  </div>
)

ExploreRoutes.propTypes = {
  url: string.isRequired,
}

export default ExploreRoutes

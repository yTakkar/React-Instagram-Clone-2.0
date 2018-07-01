import React from 'react'
import { Switch, Route, Redirect } from 'react-router'
import PropTypes from 'prop-types'

// sections
import Posts from './sections/user-posts/posts-s'
import Tagged from './sections/tagged/tagged-s'
import About from './sections/about/about-s'
import Shared from './sections/shared/shared-s'
import Gallery from './sections/gallery/gallery-s'
import Bookmarks from './sections/bookmarks/bookmarks-s'
import Followers from './sections/followers/followers-s'
import Followings from './sections/followings/followings-s'
import Favourites from './sections/favourites/favourites-s'
import Recommendations from './sections/recommends/recommends-s'
import PeopleYouKnow from './sections/people-you-know/puk'
import UserGroups from './sections/groups/groups-s'

const ProfileRoutes = ({ url, param: username }) => (
  <div className="hmm">
    <Switch>
      <Route
        path={`${url}`}
        exact
        component={() => <Posts param={username} />}
      />
      <Route
        path={`${url}/tagged`}
        component={() => <Tagged param={username} />}
      />
      <Route
        path={`${url}/shared`}
        component={() => <Shared param={username} />}
      />
      <Route
        path={`${url}/gallery`}
        component={() => <Gallery param={username} />}
      />
      <Route
        path={`${url}/bookmarks`}
        component={() => <Bookmarks param={username} />}
      />
      <Route path={`${url}/about`} component={About} />
      <Route
        path={`${url}/groups`}
        component={() => <UserGroups param={username} />}
      />
      <Route
        path={`${url}/followers`}
        component={() => <Followers param={username} />}
      />
      <Route
        path={`${url}/followings`}
        component={() => <Followings param={username} />}
      />
      <Route
        path={`${url}/favourites`}
        component={() => <Favourites param={username} />}
      />
      <Route
        path={`${url}/recommendations`}
        component={() => <Recommendations param={username} />}
      />
      <Route
        path={`${url}/people-you-know`}
        component={() => <PeopleYouKnow param={username} />}
      />
      <Redirect to="/error" />
    </Switch>
  </div>
)

ProfileRoutes.propTypes = {
  url: PropTypes.string.isRequired,
  param: PropTypes.string.isRequired,
}

export default ProfileRoutes

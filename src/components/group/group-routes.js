import React from 'react'
import { Switch, Route, Redirect } from 'react-router'
import PropTypes from 'prop-types'

// SECTIONS
import GroupPosts from './sections/posts/posts-s'
import GroupGallery from './sections/gallery/gallery-s'
import AboutGroup from './sections/about/about-s'
import EditGroup from './sections/edit/edit-s'
import GroupMembers from './sections/members/members-s'
import AddGroupMembers from './sections/add-members/add-members-s'

const GroupRoutes = ({ url, grp_id }) => (
  <div className="hmm">
    <Switch>
      <Route
        path={`${url}`}
        exact
        component={() => <GroupPosts grp_id={grp_id} />}
      />
      <Route path={`${url}/gallery`} component={GroupGallery} />
      <Route path={`${url}/about`} component={AboutGroup} />
      <Route
        path={`${url}/edit`}
        component={() => <EditGroup grp_id={grp_id} />}
      />
      <Route path={`${url}/members`} component={GroupMembers} />
      <Route
        path={`${url}/add-members`}
        component={() => <AddGroupMembers grp_id={grp_id} />}
      />
      <Redirect to="/error" />
    </Switch>
  </div>
)

GroupRoutes.propTypes = {
  url: PropTypes.string.isRequired,
  grp_id: PropTypes.string.isRequired,
}

export default GroupRoutes

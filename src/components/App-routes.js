import React from 'react'
import { Switch, Route } from 'react-router'

import Profile from './profile/profile'
import Home from './home/home'
import EmailVerification from './email-verification/email-verification'
import Notifications from './notifications/notifications'
import EditProfile from './edit-profile/edit-profile'
import ViewPost from './post/view-post/view-post'
import Explore from './explore/explore'
import Settings from './settings/settings'
import Group from './group/group'
import Messages from './messages/messages'
import Hashtag from './hashtag/hashtag/hashtag'
import AdminLogin from './admin/admin-login'
import IsAdmin from './admin/is-admin'
import Error from './error/error'

const AppRoutes = () => (
  <div className="badshah">
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/profile/:username" component={Profile} />
      <Route path="/error/:what" component={Error} />
      <Route path="/email-verification/:is" component={EmailVerification} />
      <Route path="/notifications" component={Notifications} />
      <Route path="/edit-profile" component={EditProfile} />
      <Route path="/post/:post_id" component={ViewPost} />
      <Route path="/explore" component={Explore} />
      <Route path="/settings" component={Settings} />
      <Route path="/group/:grp_id" component={Group} />
      <Route path="/messages" component={Messages} />
      <Route path="/hashtag/:hashtag" component={Hashtag} />
      <Route path="/admin-login" component={AdminLogin} />
      <Route path="/is-admin" component={IsAdmin} />
      <Route component={Error} />
    </Switch>
  </div>
)

export default AppRoutes

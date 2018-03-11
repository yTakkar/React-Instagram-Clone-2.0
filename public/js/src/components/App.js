import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUnreadNotifications } from '../store/actions/notification-a'
import { getUnreadMessages } from '../store/actions/message-a'

import Header from './others/header'
import NotiSpeak from './others/noti-speak'
import SideBar from './others/sidebar'
import Profile from './profile/profile'
import Home from './home/home'
import EmailVerification from './email-verification/email-verification'
import Notifications from './notifications/notifications'
import EditProfile from './edit-profile/edit-profile'
import ViewPost from './post/view_post'
import Explore from './explore/explore'
import Settings from './settings/settings'
import Group from './group/group'
import Messages from './messages/messages'
import Hashtag from './hashtag/hashtag'
import AdminLogin from './admin/admin-login'
import IsAdmin from './admin/is-admin'
import Error from './error/error'

@connect(store => (
  {
    unreadNotifications: store.Notification.unreadNotifications,
    unreadMessages: store.Message.unreadMessages
  }
))

export default class App extends React.Component {

  componentDidMount = () => {
    let { dispatch } = this.props
    dispatch(getUnreadNotifications())
    dispatch(getUnreadMessages())
  }

  render() {
    let { unreadNotifications, unreadMessages } = this.props

    return (
      <Router>
        <div className='app'>
          <Header/>
          <NotiSpeak un={unreadNotifications} />
          <SideBar
            un={unreadNotifications}
            uc={unreadMessages}
          />
          <div className='badshah'>
            <Switch>
              <Route path='/' exact component={Home} />
              <Route path='/profile/:username' component={Profile} />
              <Route path='/error/:what' component={Error} />
              <Route path='/email-verification/:is' component={EmailVerification} />
              <Route path='/notifications' component={Notifications} />
              <Route path='/edit-profile' component={EditProfile} />
              <Route path='/post/:post_id' component={ViewPost} />
              <Route path='/explore' component={Explore} />
              <Route path='/settings' component={Settings} />
              <Route path='/group/:grp_id' component={Group} />
              <Route path='/messages' component={Messages} />
              <Route path='/hashtag/:hashtag' component={Hashtag} />
              <Route path='/admin-login' component={AdminLogin} />
              <Route path='/is-admin' component={IsAdmin} />
              <Route component={Error} />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

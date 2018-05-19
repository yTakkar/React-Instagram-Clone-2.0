import React, { Component } from 'react'
import { FadeIn } from 'animate-components'
import { connect } from 'react-redux'
import { getUnreadNotifications } from '../../store/actions/notification-a'
import { getUnreadMessages } from '../../store/actions/message-a'
import { Route, Switch, Redirect } from 'react-router-dom'
import ExploreNav from './explore-nav'
import RefreshExplores from './refresh'

import ExpUsers from './users/exp-users'
import ExpPhotos from './photos/explore-photos'
import ExpGroups from './groups/exp-groups'

@connect()
export default class Explore extends Component {

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

          <div className='exp_nav'>
            <ExploreNav url={url} />
            <RefreshExplores/>
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

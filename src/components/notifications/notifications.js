import React, { Component } from 'react'
import Title from '../others/title'
import { FadeIn } from 'animate-components'
import Notification from './notification/notification'
import { connect } from 'react-redux'
import { getNotifications, readNotifications } from '../../store/actions/notification-a'
import Nothing from '../others/nothing'
import End from '../others/end'
import { getUnreadMessages } from '../../store/actions/message-a'
import NotificationsHeader from './n-header'
import IsLoading from '../others/isLoading'
import { cLoading } from '../../utils/utils'

@connect(store => (
  { notifications: store.Notification.notifications }
))

export default class Notifications extends Component {

  state = { loading: true }

  componentDidMount = () => {
    let { dispatch } = this.props
    dispatch(readNotifications())
    dispatch(getNotifications())
    dispatch(getUnreadMessages())
  }

  componentWillReceiveProps = () =>
    this.setState({ loading: false })

  render() {
    let
      { notifications } = this.props,
      { loading } = this.state,
      len = notifications.length,
      map_n = notifications.map(n =>
        <Notification key={n.notify_id} {...n} />
      )

    return (
      <div>
        <IsLoading loading={loading} when='page' />

        <Title value='Notifications' />

        <FadeIn duration='300ms' className={cLoading(loading)} >
          <div className='notifications_div'>
            <NotificationsHeader/>
            { len == 0 ? <Nothing mssg='You have no notifications!!' /> : map_n }
            { len != 0 ? <End/> : null }
          </div>

        </FadeIn>

      </div>
    )
  }
}

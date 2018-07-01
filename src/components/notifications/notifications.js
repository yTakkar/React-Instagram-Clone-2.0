import React, { Component } from 'react'
import Title from '../others/title'
import { FadeIn } from 'animate-components'
import Notification from './notification/notification'
import { connect } from 'react-redux'
import { getNotifications, readNotifications } from '../../actions/notification'
import Nothing from '../others/nothing'
import End from '../others/end'
import { getUnreadMessages } from '../../actions/message'
import NotificationsHeader from './n-header'
import IsLoading from '../others/isLoading'
import { cLoading } from '../../utils/utils'

class Notifications extends Component {
  state = { loading: true }

  componentDidMount = () => {
    let { dispatch } = this.props
    dispatch(readNotifications())
    dispatch(getNotifications())
    dispatch(getUnreadMessages())
  }

  componentWillReceiveProps = () => this.setState({ loading: false })

  render() {
    let { notifications } = this.props,
      { loading } = this.state,
      len = notifications.length,
      map_n = notifications.map(n => <Notification key={n.notify_id} {...n} />)

    return (
      <div>
        <IsLoading loading={loading} when="page" />

        <Title value="Notifications" />

        <FadeIn duration="300ms" className={cLoading(loading)}>
          <div className="notifications_div">
            <NotificationsHeader />
            {len == 0 ? <Nothing mssg="You have no notifications!!" /> : map_n}
            {len != 0 && <End />}
          </div>
        </FadeIn>
      </div>
    )
  }
}

const mapStateToProps = store => ({
  notifications: store.Notification.notifications,
})

export default connect(mapStateToProps)(Notifications)
export { Notifications as PureNotifications }

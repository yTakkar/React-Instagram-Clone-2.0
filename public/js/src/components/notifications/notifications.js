import React from 'react'
import Title from '../others/title'
import { FadeIn } from 'animate-components'
import Notification from './notification'
import { connect } from 'react-redux'
import { getNotifications, clearNotifications, readNotifications } from '../../store/actions/notification-a'
import Nothing from '../others/nothing'
import End from '../others/end'
import Notify from 'handy-notification'
import Loading from '../others/loading'
import ToolTip from 'react-tooltip'
import { getUnreadMessages } from '../../store/actions/message-a'

@connect(store => (
  { notifications: store.Notification.notifications }
))

export default class Notifications extends React.Component {

  state = { loading: true }

  componentDidMount = () => {
    let { dispatch } = this.props
    dispatch(readNotifications())
    dispatch(getNotifications())
    dispatch(getUnreadMessages())
  }

  componentWillReceiveProps = () => this.setState({ loading: false })

  clearNotifications = () => {
    this.props.dispatch(clearNotifications())
    Notify({ value: 'Notifications cleared!!' })
  }

  render() {
    let
      { notifications } = this.props,
      { loading } = this.state,
      len = notifications.length,
      map_n = notifications.map(n => <Notification key={n.notify_id} {...n} />)

    return (
      <div>

        { loading ? <Loading/> : null }

        <Title value='Notifications' />

        <FadeIn duration='300ms' className={loading ? 'cLoading' : ''} >
          <div className='notifications_div'>

            <div className='notifications_header'>
              <span className='noti_count'>{ len == 0 ? 'No' : len } notifications</span>
              {
                len != 0 ?
                  <div>
                    <span
                      onClick={this.clearNotifications}
                      className='clear_noti'
                      data-tip='Clear notifications'
                    >
                      <i className='material-icons'>clear_all</i>
                    </span>
                    <ToolTip/>
                  </div>
                  : null
              }
            </div>

            { len == 0 ? <Nothing mssg='You have no notifications!!' /> : map_n }

            { len != 0 ? <End/> : null }

          </div>

        </FadeIn>

      </div>
    )
  }
}

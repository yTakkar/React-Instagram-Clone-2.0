import React, { Component } from 'react'
import { FadeIn } from 'animate-components'
import { connect } from 'react-redux'
import { getUnreadNotifications } from '../../actions/notification'
import { getUnreadMessages } from '../../actions/message'
import SettingsNav from './settings-nav'
import SettingsRoutes from './settings-routes'

@connect()
export default class Settings extends Component {
  componentDidMount = () => {
    let { dispatch } = this.props
    dispatch(getUnreadNotifications())
    dispatch(getUnreadMessages())
  }

  render() {
    let {
      match: { url },
    } = this.props

    return (
      <div>
        <FadeIn duration="300ms">
          <div className="senapati">
            <div className="srajkumar settings_srajkumar">
              <SettingsNav url={url} />
            </div>

            <SettingsRoutes url={url} />
          </div>
        </FadeIn>
      </div>
    )
  }
}

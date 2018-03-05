// eslint-disable-next-line no-unused-vars
import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'

@connect(store => (
  { un: store.Notification.unreadNotifications }
))

export default class Title extends React.Component {
  render() {
    let { value, un } = this.props

    return (
      <Helmet>
        <title>{ un ? `(${un})` : '' } {`${value}`} • Instagram</title>
      </Helmet>
    )
  }
}

import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import $ from 'jquery'

@connect(store => (
  { un: store.Notification.unreadNotifications }
))

export default class Title extends React.Component {
  render() {
    let { value, desc, un } = this.props

    // for removing description in the topHeader.hbs to avoid two meta tags with description name
    let element = $('meta[data-desc-src="hbs"]')
    element.remove()

    return (
      <Helmet>
        <title>{ un ? `(${un})` : '' } {`${value}`} • Instagram</title>
        <meta name='description' content={desc} />
      </Helmet>
    )
  }
}

Title.defaultProps = {
  value: '',
  desc: 'Instagram lets you capture, follow, like and share world\'s moments in a better way and tell your story with photos, messages, posts and everything in between!!'
}

Title.propTypes = {
  value: PropTypes.string,
  desc: PropTypes.string
}

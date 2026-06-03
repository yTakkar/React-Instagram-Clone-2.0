import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const Title = ({ value, un }) => {
  let user = un ? `(${un})` : ''
  let title =
    value == 'Home'
      ? `${user} Vsocial`
      : `${user} ${value} • Vsocial`

  return (
    <Helmet>
      <title>{title}</title>
      <meta
        name="description"
        content="Vsocial lets you capture, follow, like and share world's moments in a better way and tell your story with photos, messages, posts and everything in between!!"
        data-desc-src="react"
      />
    </Helmet>
  )
}

Title.propTypes = {
  value: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  un: state.Notification.unreadNotifications,
})

export default connect(mapStateToProps)(Title)

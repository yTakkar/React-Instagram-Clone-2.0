import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const UnreadMssgs = ({ unreadMssgs }) => (
  <Fragment>
    {unreadMssgs != 0 && (
      <span className="m_sr_unread">{unreadMssgs > 9 ? '+' : unreadMssgs}</span>
    )}
  </Fragment>
)

UnreadMssgs.propTypes = {
  unreadMssgs: PropTypes.number.isRequired,
}

export default UnreadMssgs

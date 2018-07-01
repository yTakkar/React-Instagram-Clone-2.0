import React from 'react'
import TimeAgo from 'handy-timeago'
import PropTypes from 'prop-types'

const LastMssgTime = ({ lastMssgTime }) => (
  <span className="m_sr_time">
    {lastMssgTime && TimeAgo(lastMssgTime).replace(' ago', '')}
  </span>
)

LastMssgTime.propTypes = {
  lastMssgTime: PropTypes.string,
}

export default LastMssgTime

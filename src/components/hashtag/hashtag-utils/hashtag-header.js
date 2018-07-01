import React from 'react'
import PropTypes from 'prop-types'

const HashtagHeader = ({ text }) => (
  <div className="recomm_top">
    <span>{text}</span>
  </div>
)

HashtagHeader.propTypes = {
  text: PropTypes.string.isRequired,
}

export default HashtagHeader

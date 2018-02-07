/* eslint no-unused-vars:0 */

import React from 'react'
import PropTypes from 'prop-types'

const Nothing = ({ mssg, showMssg, secondMssg, whenMessage }) => {
  return (
    <div
      className='home_last_mssg'
      style={{ border: !showMssg ? 'none' : '' }}
    >
      <img src={`/images/${whenMessage ? 'elephant-march.png' : 'large.jpg'}`} />
      { showMssg ? <span>{mssg}</span> : null }
      <span>{ secondMssg }</span>
    </div>
  )
}

Nothing.defaultProps = {
  showMssg: true,
  mssg: 'Hello, a message for you!!',
  secondMssg: '',
  whenMessage: false
}

Nothing.propTypes = {
  showMssg: PropTypes.bool,
  mssg: PropTypes.string,
  secondMssg: PropTypes.string,
  whenMessage: PropTypes.bool
}

export default Nothing

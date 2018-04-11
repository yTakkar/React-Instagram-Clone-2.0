// eslint-disable-next-line no-unused-vars
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
  mssg: 'Hello, a message for you!!',
  showMssg: true,
  secondMssg: '',
  whenMessage: false
}

Nothing.propTypes = {
  mssg: PropTypes.string,
  showMssg: PropTypes.bool,
  secondMssg: PropTypes.string,
  whenMessage: PropTypes.bool
}

export default Nothing

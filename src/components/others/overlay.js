import React from 'react'
import PropTypes from 'prop-types'

const Overlay = ({ type, close_on_click, close, opacity }) => {
  /* eslint-disable indent */
  let cls =
    type == 'black' ? 'overlay'
    : type == 'white' ? 'hidden_overlay'
    : type == 'colored' ? 'colored_overlay'
    : null
  /* eslint-enable indent */

  return (
    <div
      className={cls}
      style={{
        cursor: close_on_click ? 'zoom-out' : 'inherit',
        opacity
      }}
      onClick={ close_on_click ? close : null }
    ></div>
  )
}

Overlay.defaultProps = {
  type: 'black',
  close_on_click: false,
  opacity: 0.5,
  close: () => null
}

Overlay.propTypes = {
  type: PropTypes.oneOf([ 'black', 'white', 'colored' ]),
  close_on_click: PropTypes.bool,
  opacity: PropTypes.number,
  close: PropTypes.func
}

export default Overlay

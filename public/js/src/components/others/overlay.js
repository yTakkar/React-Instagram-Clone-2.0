// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'

const Overlay = ({ type, close_on_click, close, opacity }) => {
  let cls

  if (type == 'black') {
    cls = 'overlay'
  } else if (type == 'white') {
    cls = 'hidden_overlay'
  } else if (type == 'colored') {
    cls = 'colored_overlay'
  }

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
  close: () => { return }
}

Overlay.propTypes = {
  type: PropTypes.oneOf([ 'black', 'white', 'colored' ]).isRequired,
  close_on_click: PropTypes.bool,
  opacity: PropTypes.number,
  close: PropTypes.func
}

export default Overlay

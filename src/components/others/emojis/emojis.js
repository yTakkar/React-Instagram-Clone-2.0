import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import PropTypes from 'prop-types'
import EmojisList from './emojis-list'

const Emojis = props => {
  let { position } = props

  return (
    <div className="emoji" style={position}>
      <Scrollbars style={{ height: '300px' }} className="emoji_wrapper">
        <EmojisList {...props} />
      </Scrollbars>
    </div>
  )
}

Emojis.defaultProps = {
  position: {
    top: 0,
    left: 0,
  },
  recenterEmojis: false,
}

export const EmojisPropTypes = {
  position: PropTypes.shape({
    top: PropTypes.number,
    left: PropTypes.number,
  }).isRequired,
  textArea: PropTypes.string.isRequired,
  updateStateValue: PropTypes.func.isRequired,
  recenterEmojis: PropTypes.bool,
}

Emojis.propTypes = EmojisPropTypes

export default Emojis

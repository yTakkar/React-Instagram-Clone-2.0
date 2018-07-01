import React, { Fragment } from 'react'
import { shortener } from '../../../utils/utils'
import PropTypes from 'prop-types'
import FAIcon from '../../others/icons/font-awesome-icon'

const LastMssg = ({ lastMessage, lastMssgType }) => (
  <Fragment>
    {lastMessage ? (
      lastMssgType == 'text' ? (
        shortener(lastMessage, 15)
      ) : lastMssgType == 'image' ? (
        <span className="camera">
          <FAIcon icon="camera" />
        </span>
      ) : lastMssgType == 'sticker' ? (
        <span className="camera">
          <FAIcon icon="gift" />
        </span>
      ) : null
    ) : null}
  </Fragment>
)

LastMssg.propTypes = {
  lastMessage: PropTypes.string,
  lastMssgType: PropTypes.oneOf(['text', 'image', 'sticker', '']),
}

export default LastMssg

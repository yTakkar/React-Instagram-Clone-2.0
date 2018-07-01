import React, { Component, Fragment } from 'react'
import TimeAgo from 'handy-timeago'
import ToTags from '../../../hashtag/toTags/toTags'
import PropTypes from 'prop-types'
import ImageTheatre from '../../../others/imageTheatre/imageTheatre'

export default class MessageType extends Component {
  state = {
    showImage: false,
  }

  toggleShowImage = () => this.setState({ showImage: !this.state.showImage })

  render() {
    let { type, message, message_time } = this.props.messageDetails
    let { showImage } = this.state

    return (
      <Fragment>
        <div className="m_m" title={TimeAgo(message_time)}>
          {!message ? (
            <span style={{ fontStyle: 'italic' }}>Empty message</span>
          ) : type == 'text' ? (
            <ToTags str={`${message}`} />
          ) : type == 'image' ? (
            <img
              src={`/messages/${message}`}
              className="m_m_img"
              onClick={this.toggleShowImage}
            />
          ) : type == 'sticker' ? (
            <img src={`/messages/${message}`} className="m_m_sticker" />
          ) : null}
        </div>

        {showImage && (
          <ImageTheatre
            imgSrc={`/messages/${message}`}
            showInfo={false}
            back={this.toggleShowImage}
          />
        )}
      </Fragment>
    )
  }
}

MessageType.propTypes = {
  messageDetails: PropTypes.shape({
    type: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    message_time: PropTypes.string.isRequired,
  }).isRequired,
}

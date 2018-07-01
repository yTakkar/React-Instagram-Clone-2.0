import React, { Component } from 'react'
import { Me } from '../../../../utils/utils'
import TimeAgo from 'handy-timeago'
import MessageType from './message-type'
import MessageTools from './tools/message-tools'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export default class Message extends Component {
  state = {
    message: '',
    showTools: false,
  }

  componentDidMount = () => this.setState({ message: this.props.message })

  toggleTools = () => this.setState({ showTools: !this.state.showTools })

  render() {
    let { message, showTools } = this.state
    let { mssg_by, type, message_time, message_id } = this.props
    let mssgStyle = Me(mssg_by) ? 'my_mm_div' : 'not_my_mm_div'

    return (
      <div>
        <div className={classNames('m_m_divs', mssgStyle)}>
          <div className="toggle_mssg_tools" onClick={this.toggleTools}>
            <MessageType messageDetails={{ message, type, message_time }} />
          </div>

          <span className="m_m_time">
            {TimeAgo(message_time).replace(' ago', '')}
          </span>

          {showTools && (
            <div className="m_m_tools">
              <MessageTools
                messageDetails={{ message_id, message, type, mssg_by }}
                updateMessage={message => this.setState({ message })}
              />
            </div>
          )}
        </div>
      </div>
    )
  }
}

Message.propTypes = {
  con_id: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  message_id: PropTypes.number.isRequired,
  message_time: PropTypes.string.isRequired,
  mssg_by: PropTypes.number.isRequired,
  mssg_to: PropTypes.number.isRequired,
  status: PropTypes.oneOf(['read', 'unread']).isRequired,
  type: PropTypes.oneOf(['text', 'image', 'sticker']).isRequired,
}

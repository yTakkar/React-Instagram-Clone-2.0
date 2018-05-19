import React, { Component } from 'react'
import { Me, toggle } from '../../../../utils/utils'
import TimeAgo from 'handy-timeago'
import MessageType from './message-type'
import MessageTools from './tools/message-tools'
import PropTypes from 'prop-types'

export default class Message extends Component {

  state = {
    message: '',
  }

  componentDidMount = () =>
    this.setState({ message: this.props.message })

  toggleTools = () => toggle(this.tools)

  render() {
    let { message } = this.state
    let { mssg_by, type, message_time, message_id } = this.props

    return (
      <div>

        <div
          className={`m_m_divs ${Me(mssg_by) ? 'my_mm_div' : 'not_my_mm_div'} `}
        >
          <div onClick={this.toggleTools} >
            <MessageType
              messageDetails={{ message, type, message_time }}
            />
          </div>

          <span className='m_m_time'>
            { TimeAgo(message_time).replace(' ago', '') }
          </span>

          <div
            className='m_m_tools'
            style={{ display: 'none' }}
            ref={r => this.tools = r}
          >
            <MessageTools
              messageDetails={{ message_id, message, type, mssg_by }}
              updateMessage={message =>
                this.setState({ message })
              }
            />
          </div>
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
  status: PropTypes.oneOf([ 'read', 'unread' ]).isRequired,
  type: PropTypes.oneOf([ 'text', 'image', 'sticker' ]).isRequired
}

import React, { Component, Fragment } from 'react'
import { textMessage } from '../../../../utils/message-utils'
import { connect } from 'react-redux'
import ConversationAddEmojis from './add-emojis'
import TextArea from '../../../others/input/textArea'

class TextMessage extends Component {
  state = {
    messageValue: '',
  }

  changeMssgValue = e => this.setState({ messageValue: e.target.value })

  message = e => {
    e.preventDefault()
    let { messageValue } = this.state
    let {
      cd: { con_id, con_with },
      dispatch,
    } = this.props
    textMessage({
      message: messageValue,
      con_id,
      con_with,
      dispatch,
    })
    this.setState({ messageValue: '' })
  }

  render() {
    let { messageValue } = this.state

    return (
      <Fragment>
        <form className="add_mssg_form" onSubmit={this.message}>
          <TextArea
            placeholder="Send message.."
            className="send_mssg"
            required
            value={messageValue}
            valueChange={this.changeMssgValue}
          />
          <ConversationAddEmojis
            updateMssgValue={value => this.setState({ messageValue: value })}
          />
          <input type="submit" value="Send" className="pri_btn mssg_send" />
        </form>
      </Fragment>
    )
  }
}

const mapStateToProps = store => ({
  cd: store.Message.conDetails,
})

export default connect(mapStateToProps)(TextMessage)
export { TextMessage as PureTextMessage }

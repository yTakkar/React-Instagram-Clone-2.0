import React, { Component } from 'react'
import { FadeIn } from 'animate-components'
import { post } from 'axios'
import Notify from 'handy-notification'
import ModalHeader from '../../../others/modal/modal-header'
import ModalBack from '../../../others/modal/modal-back'
import AddEmojis from '../../../others/emojis/add-emojis'
import PrimaryButton from '../../../others/button/primary-btn'
import TextArea from '../../../others/input/textArea'
import Overlay from '../../../others/overlay'
import { string, number, func } from 'prop-types'

export default class EditMessage extends Component {
  state = {
    message: '',
    ogMessage: '',
  }

  componentDidMount = () => {
    let { message } = this.props
    this.setState({
      message,
      ogMessage: message,
    })
  }

  descChange = ({ target: { value } }) => {
    this.setState({ message: value })
    this.props.changeMessage(value)
  }

  returnOgMessage = () => {
    let { ogMessage } = this.state
    this.props.changeMessage(ogMessage)
  }

  back = () => {
    let { back } = this.props
    this.returnOgMessage()
    back()
  }

  updateMessage = async e => {
    e.preventDefault()
    let { message } = this.state
    let { message_id, back } = this.props
    let {
      data: { success, mssg },
    } = await post('/api/edit-message', { message, message_id })
    success ? back() : this.returnOgMessage()
    Notify({ value: mssg })
  }

  render() {
    let { message } = this.state

    return (
      <div>
        <Overlay />

        <div className="edit_post modal">
          <FadeIn duration="300ms">
            <ModalHeader title="Edit message" />

            <div className="e_p_middle modal_middle">
              <TextArea
                placeholder="Message.."
                className="e_p_textarea"
                autoFocus
                value={message}
                valueChange={this.descChange}
              />
            </div>

            <div className="e_p_bottom modal_bottom">
              <AddEmojis
                position={{ top: -30, left: -217 }}
                textArea=".e_p_textarea"
                updateTextArea={value => this.setState({ message: value })}
                recenterEmojis
              />

              <ModalBack
                back={this.back}
                btnType="secondary"
                disabled={!message}
              />

              <PrimaryButton
                label="Update message"
                onClick={this.updateMessage}
                disabled={!message}
              />
            </div>
          </FadeIn>
        </div>
      </div>
    )
  }
}

EditMessage.propTypes = {
  message: string.isRequired,
  message_id: number.isRequired,
  changeMessage: func.isRequired,
  back: func.isRequired,
}

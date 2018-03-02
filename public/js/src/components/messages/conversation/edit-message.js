import React from 'react'
import { FadeIn } from 'animate-components'
import $ from 'jquery'
import ToolTip from 'react-tooltip'
import Emojis from '../../others/emojis'
import { post } from 'axios'
import Notify from 'handy-notification'

export default class EditMessage extends React.Component {

  state = {
    message: '',
    emojis: false
  }

  toggleEmojis = () =>
    this.setState({ emojis: !this.state.emojis })

  componentDidMount = () => {
    $('.header').css({ zIndex: '0' })
    let { message } = this.props
    this.setState({ message })
  }

  componentWillUnmount = () =>
    $('.header').css({ zIndex: '2' })

  back = e => {
    e.preventDefault()
    this.props.back()
  }

  descChange = ({ target: { value } }) => {
    this.setState({ message: value })
    this.props.changeMessage(value)
  }

  updateMessage = async e => {
    e.preventDefault()
    let
      { message } = this.state,
      { message_id, back } = this.props
    await post('/api/edit-message', { message, message_id })
    Notify({ value: 'Message updated!!' })
    back()
  }

  render() {
    let { message, emojis } = this.state

    return (
      <div>

        <div className='edit_post modal'>
          <FadeIn duration='300ms'>
            <div className='e_p_header modal_header'>
              <span className='title'>Edit message</span>
            </div>

            <div className='e_p_middle modal_middle'>
              <textarea
                placeholder='Message..'
                spellCheck='false'
                autoComplete='false'
                className='e_p_textarea'
                autoFocus
                value={message}
                onChange={this.descChange}
              ></textarea>
            </div>

            <div className='e_p_bottom modal_bottom'>
              <span
                className='emoji_span'
                data-tip='Add emojis'
                onClick={this.toggleEmojis}
              >
                <i className='material-icons'>sentiment_very_satisfied</i>
              </span>
              <a href='#' className='e_p_cancel sec_btn' onClick={this.back} >Back</a>
              <a href='#' className='e_p_update pri_btn' onClick={this.updateMessage} >Update message</a>
            </div>
          </FadeIn>
        </div>

        <ToolTip/>

        {
          emojis ?
            <Emojis
              position={{ top: 160, left: 269 }}
              textArea={$('.e_p_textarea')}
              setState={value => {
                this.setState({ message: value })
              }}
            />
            : null
        }

      </div>
    )
  }
}

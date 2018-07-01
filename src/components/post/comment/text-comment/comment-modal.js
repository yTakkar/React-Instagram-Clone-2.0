import React, { Component } from 'react'
import { FadeIn } from 'animate-components'
import { connect } from 'react-redux'
import { textComment } from '../../../../utils/comment-utils'
import AddEmojis from '../../../others/emojis/add-emojis'
import PrimaryButton from '../../../others/button/primary-btn'
import ModalBack from '../../../others/modal/modal-back'
import TextArea from '../../../others/input/textArea'
import Overlay from '../../../others/overlay'
import { number, func, string } from 'prop-types'

@connect()
export default class TextCommentModal extends Component {
  state = {
    text: '',
  }

  descChange = e => this.setState({ text: e.target.value })

  comment = async e => {
    e.preventDefault()
    let { text } = this.state
    let { back, incrementComments, ...rest } = this.props
    textComment({
      text,
      ...rest,
      done: () => incrementComments(),
    })
    back()
  }

  render() {
    let { text } = this.state
    let { back } = this.props

    return (
      <div>
        <Overlay />

        <div className="edit_post modal">
          <FadeIn duration="300ms">
            <div className="e_p_header modal_header">
              <span className="title">Comment post</span>
            </div>

            <div className="e_p_middle modal_middle">
              <TextArea
                placeholder="Comment.."
                autoFocus
                value={text}
                valueChange={this.descChange}
                className="c_p_textarea"
              />
            </div>

            <div className="e_p_bottom modal_bottom">
              <AddEmojis
                position={{ top: -30, left: -217 }}
                textArea=".c_p_textarea"
                updateTextArea={value => this.setState({ text: value })}
                recenterEmojis
              />

              <ModalBack back={back} btnType="secondary" />

              <PrimaryButton
                label="Comment"
                onClick={this.comment}
                disabled={!text}
              />
            </div>
          </FadeIn>
        </div>
      </div>
    )
  }
}

TextCommentModal.propTypes = {
  post: number.isRequired,
  postOwner: number.isRequired,
  back: func.isRequired,
  incrementComments: func.isRequired,
  when: string.isRequired,
}

import React, { Component } from 'react'
import { FadeIn } from 'animate-components'
import { connect } from 'react-redux'
import { textComment } from '../../../../utils/comment-utils'
import AddEmojis from '../../../others/emojis/add-emojis'
import PrimaryButton from '../../../others/button/primary-btn'
import ModalBack from '../../../others/modal/modal-back'
import TextArea from '../../../others/input/textArea'

@connect()
export default class TextCommentModal extends Component {

  state = {
    text: '',
  }

  descChange = ({ target: { value } }) =>
    this.setState({ text: value })

  comment = async e => {
    e.preventDefault()
    let { text } = this.state
    let {
      post: post_id, back, incrementComments, dispatch, when, postOwner
    } = this.props
    textComment({
      post_id,
      text,
      when,
      dispatch,
      postOwner,
      done: () => incrementComments()
    })
    back()
  }

  render() {
    let { text } = this.state
    let { back } = this.props

    return (
      <div>

        <div className='edit_post modal'>
          <FadeIn duration='300ms'>
            <div className='e_p_header modal_header'>
              <span className='title'>Comment post</span>
            </div>

            <div className='e_p_middle modal_middle'>
              <TextArea
                placeholder='Comment..'
                autoFocus
                value={text}
                valueChange={this.descChange}
                className='c_p_textarea'
              />
            </div>

            <div className='e_p_bottom modal_bottom'>
              <AddEmojis
                position={{ top: -30, left: -217 }}
                textArea='.c_p_textarea'
                updateTextArea={value =>
                  this.setState({ text: value })
                }
                recenterEmojis
              />

              <ModalBack back={back} btnType='secondary' />

              <PrimaryButton
                label='Comment'
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

import React from 'react'
import { FadeIn } from 'animate-components'
import $ from 'jquery'
import { connect } from 'react-redux'
import ToolTip from 'react-tooltip'
import Emojis from '../../others/emojis'
import { editComment } from '../../../store/actions/post-a'
import { post } from 'axios'
import Notify from 'handy-notification'

@connect(store => {
  return {
    store
  }
})

export default class EditComment extends React.Component {

  state = {
    comment: '',
    emojis: false
  }

  toggleEmojis = () =>
    this.setState({ emojis: !this.state.emojis })

  componentDidMount = () =>
    this.setState({ comment: this.props.comment })

  back = e => {
    e.preventDefault()
    this.props.back()
  }

  descChange = ({ target: { value } }) => {
    this.setState({ comment: value })
    this.props.updateComment(value)
  }

  updateComment = async e => {
    e.preventDefault()
    $('.e_p_update').addClass('a_disabled')

    let
      { comment_id, dispatch, back } = this.props,
      { comment } = this.state

    await post('/api/edit-comment', { comment_id, comment })
    dispatch(editComment({ comment_id, comment }))
    Notify({ value: 'Comment updated!!' })
    back()
  }

  render() {
    let { comment, emojis } = this.state

    return (
      <div>

        <div className='edit_post modal'>
          <FadeIn duration='300ms'>
            <div className='e_p_header modal_header'>
              <span className='title'>Edit comment</span>
            </div>

            <div className='e_p_middle modal_middle'>
              <textarea
                placeholder='Comment..'
                spellCheck='false'
                autoComplete='false'
                className='e_c_textarea'
                autoFocus
                value={comment}
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
              <a href='#' className={`e_p_update pri_btn ${!comment ? 'a_disabled' : ''}`} onClick={this.updateComment} >Update</a>
            </div>

          </FadeIn>
        </div>

        <ToolTip/>

        {
          emojis ?
            <Emojis
              position={{ top: 160, left: 269 }}
              textArea={$('.e_c_textarea')}
              setState={value => {
                this.setState({ comment: value })
              }}
            />
            : null
        }

      </div>
    )
  }
}

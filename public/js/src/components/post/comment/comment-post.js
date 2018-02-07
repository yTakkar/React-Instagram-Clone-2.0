import React from 'react'
import { FadeIn } from 'animate-components'
import $ from 'jquery'
import { connect } from 'react-redux'
import ToolTip from 'react-tooltip'
import Emojis from '../../others/emojis'
import { post } from 'axios'
import Notify from 'handy-notification'
import { comment } from '../../../store/actions/post-a'
import { Me, insta_notify } from '../../../utils/utils'

@connect(store => {
  return {
    store
  }
})

export default class CommentPost extends React.Component {

  state = {
    text: '',
    emojis: false
  }

  toggleEmojis = () =>
    this.setState({ emojis: !this.state.emojis })

  back = e => {
    e.preventDefault()
    this.props.back()
  }

  descChange = ({ target: { value } }) =>
    this.setState({ text: value })

  comment = async e => {
    e.preventDefault()
    $('.e_p_update').addClass('a_disabled')

    let
      { text } = this.state,
      { post: post_id, back, incrementComments, dispatch, when, postOwner } = this.props,
      session = $('.data').data('session'),
      username = $('.data').data('username'),
      { data: { comment_id } } = await post('/api/comment-text', { post: post_id, text  })

    if (when == 'viewPost') {
      dispatch(comment({
        comment_id,
        comment_by: session,
        comment_by_username: username,
        type: 'text',
        text,
        post_id,
        comment_time: new Date().getTime()
      }))
    }

    if(!Me(postOwner)) {
      insta_notify({
        to: postOwner,
        type: 'comment',
        post_id
      })
    }

    incrementComments()
    Notify({ value: 'Commented!!' })
    back()
  }

  render() {
    let { text, emojis } = this.state

    return (
      <div>

        <div className='edit_post modal'>
          <FadeIn duration='300ms'>
            <div className='e_p_header modal_header'>
              <span className='title'>Comment post</span>
            </div>

            <div className='e_p_middle modal_middle'>
              <textarea
                placeholder='Comment..'
                spellCheck='false'
                autoComplete='false'
                className='c_p_textarea'
                autoFocus
                value={text}
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
              <a href='#' className={`e_p_update pri_btn ${!text ? 'a_disabled' : ''}`} onClick={this.comment} >Comment</a>
            </div>
          </FadeIn>
        </div>

        <ToolTip/>

        {
          emojis ?
            <Emojis
              position={{ top: 160, left: 269 }}
              textArea={$('.c_p_textarea')}
              setState={value => {
                this.setState({ text: value })
              }}
            />
            : null
        }

      </div>
    )
  }
}

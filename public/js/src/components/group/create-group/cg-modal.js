import React from 'react'
import { FadeIn } from 'animate-components'
import $ from 'jquery'
import { connect } from 'react-redux'
import ToolTip from 'react-tooltip'
import Emojis from '../../others/emojis'
import { post } from 'axios'
import Notify from 'handy-notification'
import { Redirect } from 'react-router-dom'

@connect(store => (
  { store }
))

export default class CreateGroupModal extends React.Component {

  state = {
    emojis: false,
    name: '',
    bio: '',
    created: false,
    groupId: null
  }

  toggleEmojis = () =>
    this.setState({ emojis: !this.state.emojis })

  valueChange = (what, { target: { value } }) =>
    this.setState({ [what]: value })

  create = async e => {
    e.preventDefault()
    let
      { name, bio } = this.state,
      btn = $('.c_g_update'),
      overlay2 = $('.overlay-2')

    btn
      .text('Please wait..')
      .addClass('a_disabled')
    overlay2.show()

    let { data: { mssg, success, groupId } } = await post('/api/create-group', { name, bio })

    if (success) {
      Notify({
        value: mssg,
        done: () =>  this.setState({ created: true, groupId })
      })

    } else {
      Notify({
        value: typeof(mssg) == 'object' ? mssg.length > 1 ? mssg[0] : mssg : mssg
      })
    }

    btn
      .text('Create group')
      .removeClass('a_disabled')
    overlay2.hide()

  }

  render() {
    let
      { emojis, bio, name, created, groupId } = this.state,
      { back } = this.props

    return (
      <div>

        <div className='create_group modal'>
          <FadeIn duration='300ms'>
            <div className='c_g_header modal_header'>
              <span className='title'>Create group</span>
            </div>

            <div className='c_g_middle modal_middle'>
              <div>
                <span>Name your group</span>
                <input
                  type='text'
                  placeholder='Name..'
                  spellCheck='false'
                  autoComplete='false'
                  className='c_g_text'
                  autoFocus
                  value={name}
                  onChange={e => this.valueChange('name', e)}
                />
              </div>

              <div>
                <span>Add bio to your group</span>
                <textarea
                  placeholder='Bio..'
                  spellCheck='false'
                  autoComplete='false'
                  className='c_g_textarea'
                  value={bio}
                  onChange={e => this.valueChange('bio', e)}
                ></textarea>
              </div>
            </div>

            <div className='e_p_bottom modal_bottom'>
              <span
                className='emoji_span'
                data-tip='Add emojis'
                onClick={this.toggleEmojis}
              >
                <i className='material-icons'>sentiment_very_satisfied</i>
              </span>
              <a href='#' className='e_p_cancel sec_btn' onClick={back} >Back</a>
              <a
                href='#'
                className={`c_g_update pri_btn ${!name ? 'a_disabled' : ''}`}
                onClick={this.create}
              >Create group</a>
            </div>
          </FadeIn>
        </div>

        <ToolTip/>

        { created ? <Redirect to={`/group/${groupId}`} /> : null }

        {
          emojis ?
            <Emojis
              position={{ top: 205, left: 269 }}
              textArea={$('.c_g_textarea')}
              setState={value => {
                this.setState({ bio: value })
              }}
            />
            : null
        }

      </div>
    )
  }
}

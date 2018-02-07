import React from 'react'
import Title from '../../others/title'
import { FadeIn } from 'animate-components'
import ToolTip from 'react-tooltip'
import { connect } from 'react-redux'
import { post } from 'axios'
import Notify from 'handy-notification'
import $ from 'jquery'
import { updateGroup } from '../../../store/actions/group-a'
import { Me } from '../../../utils/utils'
import Emojis from '../../others/emojis'

@connect(store => {
  return {
    gd: store.Group.group_details
  }
})

export default class EditGroup extends React.Component {

  state = {
    name: '',
    bio: '',
    isPrivate: false,
    emojis: false
  }

  componentDidMount = async () => {
    let { gd: { name, bio, group_type } } = this.props
    await this.setState({
      name,
      bio,
      isPrivate: group_type == 'private' ? true : false
    })
  }

  componentWillReceiveProps = ({ gd: { name, bio, group_type } }) => {
    this.setState({
      name,
      bio,
      isPrivate: group_type == 'private' ? true : false
    })
  }

  _toggle = what =>
    this.setState({
      [what]: !this.state[what]
    })

  changeValue = (what, { target }) => {
    const value = target.type == 'checkbox' ? target.checked : target.value
    this.setState({
      [what]: value
    })
  }

  update = async e => {
    e.preventDefault()
    let
      { name, bio, isPrivate } = this.state,
      group_type = isPrivate ? 'private': 'public',
      { gd: { group_id }, dispatch } = this.props,
      btn = $('.g_e_save_btn')

    btn
      .text('Updating..')
      .addClass('sec_btn_disabled')

    await post('/api/edit-group', { name, bio, group_type, group: group_id })
    dispatch(updateGroup({ name, bio, group_type }))

    Notify({ value: 'Updated!!' })
    btn
      .text('Update')
      .removeClass('sec_btn_disabled')
      .blur()

  }

  render() {
    let
      { name, bio, isPrivate, emojis } = this.state,
      { gd: { admin } } = this.props

    return (
      <div>

        <Title value='Edit group' />

        <FadeIn duration='300ms' >
          <div className='senapati pro_senapati'>

            <div className='srajkumar'>
            </div>

            <div className='prajkumar'>
              <div className='grp_edit'>

                <div className='g_e_name'>
                  <span className='g_e_span'>Group name</span>
                  <input
                    type='text'
                    placeholder='Group name..'
                    spellCheck='false'
                    autoFocus
                    className='gen_text'
                    disabled={!Me(admin)}
                    value={name}
                    onChange={e => this.changeValue('name', e)}
                  />
                </div>

                <div className='g_e_bio'>
                  <span className='g_e_span'>Group bio</span>
                  <textarea
                    placeholder='Group bio..'
                    spellCheck='false'
                    className='gen_bio'
                    disabled={!Me(admin)}
                    value={bio}
                    onChange={e => this.changeValue('bio', e)}
                  ></textarea>
                </div>

                <div className='g_e_pri'>
                  <input
                    type='checkbox'
                    className='inst_checkbox'
                    id='grp_private'
                    disabled={!Me(admin)}
                    checked={isPrivate}
                    onChange={e => this.changeValue('isPrivate', e)}
                  />
                  <label for='grp_private'>Private group</label>
                  <span className='g_e_p_info'>Private: Only members can interact with group</span>
                </div>

                <div className='g_e_save'>
                  <div>
                    {
                      Me(admin) ?
                        <div>
                          <span
                            className='emoji_span'
                            data-tip='Add emojis'
                            onClick={() => this._toggle('emojis')}
                          >
                            <i className='material-icons'>sentiment_very_satisfied</i>
                          </span>
                          <ToolTip/>
                        </div>
                        : null
                    }
                  </div>

                  <a
                    href='#'
                    className={`sec_btn g_e_save_btn ${!name || !bio || !Me(admin) ? 'sec_btn_disabled' : ''}`}
                    onClick={this.update}
                  >Update</a>
                </div>

              </div>
            </div>

          </div>
        </FadeIn>

        {
          emojis ?
            <Emojis
              position={{ top: 304, left: 368 }}
              textArea={$('.gen_bio')}
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

import React from 'react'
import Title from '../others/title'
import { FadeIn } from 'animate-components'
import $ from 'jquery'
import * as fn from '../../utils/utils'
import { connect } from 'react-redux'
import { getUserDetails, deleteTag } from '../../store/actions/user-a'
import { getUnreadNotifications } from '../../store/actions/notification-a'
import Loading from '../others/loading'
import Emojis from '../others/emojis'
import ToolTip from 'react-tooltip'
import { getUnreadMessages } from '../../store/actions/message-a'

@connect(store => {
  return {
    ud: store.User.user_details,
    tags: store.User.tags
  }
})

export default class EditProfile extends React.Component {

  state = {
    loading: true,
    username: '',
    firstname: '',
    surname: '',
    email: '',
    bio: '',
    instagram: '',
    twitter: '',
    facebook: '',
    github: '',
    website: '',
    phone: '',
    tags: [],
    addTag: '',
    showEmojis: false
  }

  componentDidMount = () => {
    fn.hide_h_options()
    let
      username = $('.data').data('username'),
      { dispatch } = this.props
    dispatch(getUserDetails(username))
    dispatch(getUnreadNotifications())
    dispatch(getUnreadMessages())
  }

  componentWillReceiveProps = ({ ud, tags }) => {
    let {
      username, firstname, surname, email, bio, instagram, twitter, facebook, github, website, phone
    } = ud
    this.setState({ loading: false })
    this.setState({ username, firstname, surname, email, bio, instagram, twitter, facebook, github, website, phone, tags })
  }

  change = (what, { target: { value } }) =>
    this.setState({ [what]: value })

  addTag = e => {
    e.preventDefault()
    $('.add_tag_text').focus()
    let
      { addTag: value } = this.state,
      { ud: { id: user }, dispatch } = this.props
    fn.addUserTags({ value, user, dispatch })
    this.setState({ addTag: '' })
  }

  deleteTag = tag =>
    this.props.dispatch(deleteTag(tag))

  editProfile = e => {
    e.preventDefault()
    let { ud: { username: susername, email: semail } } = this.props
    fn.editProfile({ susername, semail, values: this.state })
  }

  resend_vl = e => {
    e.preventDefault()
    fn.resend_vl()
  }

  toggleEmojis = () =>
    this.setState({ showEmojis: !this.state.showEmojis })

  render() {
    let
      {
        username, firstname, surname, email, bio, instagram, twitter, github, facebook, website, phone, tags, addTag, loading, showEmojis
      } = this.state,
      { ud: { id } } = this.props,
      map_tags = tags.map(t =>
        <span key={t.tag} onClick={() => this.deleteTag(t.tag)} className='tir_btn t_a_tag'>{t.tag}</span>
      )

    // filtering compulsory inputs
    fn.replacer([
      $('.edit_un_text'),
      $('.edit_fn_text'),
      $('.edit_sn_text')
    ], 'normal')

    // filtering bio
    fn.replacer([$('.edit_ta')], 'bio')

    return (
      <div>

        <Title value='Edit profile' />

        { loading ? <Loading/> : null }

        <FadeIn duration='300ms' className={loading ? 'cLoading' : ''} >

          <div className='edit_profile'>

            <div className='edit_info'>
              <img src={`/users/${id}/avatar.jpg`} alt='' />
              <span>@{username}</span>
            </div>

            <div className='edit_main'>
              <div className='edit_un_div'>
                <span className='edit_span'>Username</span>
                <input
                  type='text'
                  name='edit_un_text'
                  className='edit_un_text'
                  placeholder='Username'
                  spellCheck='false'
                  maxLength='32'
                  autoFocus
                  value={username}
                  onChange={e => this.change('username', e) }
                />
              </div>
              <div className='edit_fn_div edit_small'>
                <span className='edit_span'>Firstname</span>
                <input
                  type='text'
                  name='edit_fn_text'
                  className='edit_fn_text'
                  placeholder='Firstname'
                  maxLength='32'
                  spellCheck='false'
                  value={firstname}
                  onChange={e => this.change('firstname', e)}
                />
              </div>
              <div className='edit_sn_div edit_small'>
                <span className='edit_span'>Surname</span>
                <input
                  type='text'
                  name='edit_sn_text'
                  className='edit_sn_text'
                  placeholder='Surname'
                  maxLength='32'
                  spellCheck='false'
                  value={surname}
                  onChange={e => this.change('surname', e)}
                />
              </div>
              <div className='edit_email_div'>
                <span className='edit_span'>Email</span>
                <input
                  type='email'
                  name='edit_email_text'
                  className='edit_email_text'
                  placeholder='Email'
                  spellCheck='false'
                  maxLength='32'
                  autoFocus
                  value={email}
                  onChange={e => this.change('email', e)}
                />
              </div>
              <div className='edit_bio_div'>
                <span className='edit_span'>Bio</span>
                <textarea
                  name='edit_ta'
                  className='edit_ta'
                  placeholder='Bio'
                  spellCheck='false'
                  maxLength='1000'
                  value={bio}
                  onChange={e => this.change('bio', e)}
                ></textarea>
              </div>
              <div className='edit_update'>
                <span
                  onClick={this.toggleEmojis}
                  data-tip='Add emojis'
                ><i className='material-icons'>sentiment_very_satisfied</i></span>
                <a href='#' className='pri_btn edit_done' onClick={this.editProfile} >Update profile</a>
                {
                  !fn.e_v()
                    ? <a href='#' className='sec_btn resend_vl' onClick={this.resend_vl} >Resend verification link</a>
                    : null
                }
              </div>
            </div>

            <div className='edit_tags'>
              <div className='edit_sm_div'>
                <span className='edit_span'>Connections</span>
                <input
                  type='text'
                  className='edit_em_instagram sm'
                  placeholder='Instagram'
                  spellCheck='false'
                  maxLength='255'
                  value={instagram}
                  onChange={e => this.change('instagram', e)}
                />
                <input
                  type='text'
                  className='edit_em_github sm'
                  placeholder='GitHub'
                  spellCheck='false'
                  maxLength='255'
                  value={github}
                  onChange={e => this.change('github', e)}
                />
                <input
                  type='text'
                  className='edit_em_facebook sm'
                  placeholder='Facebook'
                  spellCheck='false'
                  maxLength='255'
                  value={facebook}
                  onChange={e => this.change('facebook', e)}
                />
                <input
                  type='text'
                  className='edit_em_twitter sm'
                  placeholder='Twitter'
                  spellCheck='false'
                  maxLength='255'
                  value={twitter}
                  onChange={e => this.change('twitter', e)}
                />
                <input
                  type='text'
                  className='edit_em_website sm'
                  placeholder='Website'
                  spellCheck='false'
                  maxLength='255'
                  value={website}
                  onChange={e => this.change('website', e)}
                />
                <input
                  type='text'
                  className='edit_em_mobile'
                  placeholder='Phone'
                  spellCheck='false'
                  maxLength='20'
                  value={phone}
                  onChange={e => this.change('phone', e)}
                />
              </div>
              <div className='edit_tags_info'>
                <span>Edit tags (click tags to remove)</span>
              </div>
              <div className='add_tag'>
                <input
                  type='text'
                  name='add_tag_text'
                  className='add_tag_text'
                  placeholder='Add a tag'
                  maxLength='250'
                  spellCheck='false'
                  value={addTag}
                  onChange={e => this.change('addTag', e)}
                />
                <a href='#' className='sec_btn add_tag_add' onClick={this.addTag} >Add</a>
              </div>
              <div className='tags_all'>
                {map_tags}
              </div>
            </div>

          </div>

        </FadeIn>

        {
          showEmojis
            ? <Emojis
              position={{ top: 260, left: 73 }}
              textArea={$('.edit_ta')}
              setState={value => {
                this.setState({ bio: value })
              }}
            />
            : null
        }

        <ToolTip/>

      </div>
    )
  }
}

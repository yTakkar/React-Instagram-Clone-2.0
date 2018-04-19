import React from 'react'
import Title from '../others/title'
import { FadeIn } from 'animate-components'
import $ from 'jquery'
import { replacer, hide_h_options, e_v } from '../../utils/utils'
import * as Edit from '../../utils/edit-profile-utils'
import { connect } from 'react-redux'
import { getUserDetails } from '../../store/actions/user-a'
import { getUnreadNotifications } from '../../store/actions/notification-a'
import Loading from '../others/loading'
import Emojis from '../others/emojis'
import ToolTip from 'react-tooltip'
import { getUnreadMessages } from '../../store/actions/message-a'
import SocialInputs from './social-inputs'
import EditTags from './edit-tags'

@connect(store => (
  {
    ud: store.User.user_details,
    tags: store.User.tags
  }
))

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
    hide_h_options()
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
    this.setState({
      username, firstname, surname, email, bio, instagram, twitter, facebook, github, website, phone, tags
    })
  }

  change = (what, { target: { value } }) =>
    this.setState({ [what]: value })

  editProfile = e => {
    e.preventDefault()
    let { ud: { username: susername, email: semail } } = this.props
    Edit.editProfile({ susername, semail, values: this.state })
  }

  resend_vl = e => {
    e.preventDefault()
    Edit.resend_vl()
  }

  toggleEmojis = () =>
    this.setState({ showEmojis: !this.state.showEmojis })

  render() {
    let
      {
        username, firstname, surname, email, bio, loading, showEmojis, instagram, github, twitter, website, facebook, phone, addTag, tags
      } = this.state,
      { ud: { id } } = this.props

    // filtering compulsory inputs
    replacer([
      $('.edit_un_text'),
      $('.edit_fn_text'),
      $('.edit_sn_text')
    ], 'normal')

    // filtering bio
    replacer([$('.edit_ta')], 'bio')

    return (
      <div>

        <Title
          value='Edit profile'
          desc='Edit your profile, add tags and links'
        />

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
                  !e_v()
                    ? <a
                      href='#'
                      className='sec_btn resend_vl'
                      onClick={this.resend_vl}
                    >Resend verification link</a>
                    : null
                }
              </div>
            </div>

            <div className='edit_tags'>
              <SocialInputs
                inputs={{
                  instagram, github, twitter, facebook, website, phone
                }}
                change={this.change}
              />
              <EditTags
                newTag={addTag}
                change={this.change}
                tags={tags}
                updateState={() => this.setState({ addTag: '' })}
              />
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

import React, { Component } from 'react'
import Title from '../others/title'
import { FadeIn } from 'animate-components'
import { editProfile } from '../../utils/edit-profile-utils'
import { connect } from 'react-redux'
import { getUserDetails } from '../../actions/user'
import { getUnreadNotifications } from '../../actions/notification'
import { getUnreadMessages } from '../../actions/message'
import SocialInputs from './social-inputs'
import EditTags from './edit-tags'
import ResendVL from './resend-vl'
import BioInput from './bio-input'
import RequiredInputs from './required-inputs'
import IsLoading from '../others/isLoading'
import { cLoading } from '../../utils/utils'
import AddEmojis from '../others/emojis/add-emojis'
import PrimaryButton from '../others/button/primary-btn'

class EditProfile extends Component {
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
  }

  componentDidMount = () => {
    let { dispatch, session } = this.props
    dispatch(getUserDetails(session.username))
    dispatch(getUnreadNotifications())
    dispatch(getUnreadMessages())
  }

  componentWillReceiveProps = ({ ud, tags }) => {
    for (let key in ud) {
      this.state[key] != undefined &&
        this.setState({
          loading: false,
          ...ud,
          tags,
        })
    }
  }

  change = (what, e) => this.setState({ [what]: e.target.value })

  update = e => {
    e.preventDefault()
    let {
      ud: { username: susername, email: semail },
    } = this.props
    editProfile({
      susername,
      semail,
      values: this.state,
    })
  }

  render() {
    let {
      username,
      firstname,
      surname,
      email,
      bio,
      instagram,
      github,
      twitter,
      website,
      facebook,
      phone,
      addTag,
      tags,
      loading,
    } = this.state
    let {
      ud: { id },
    } = this.props

    return (
      <div>
        <Title
          value="Edit profile"
          desc="Edit your profile, add tags and links"
        />

        <IsLoading loading={loading} when="page" />

        <FadeIn duration="300ms" className={cLoading(loading)}>
          <div className="edit_profile">
            <div className="edit_info">
              <img src={`/users/${id}/avatar.jpg`} alt="" />
              <span>@{username}</span>
            </div>

            <div className="edit_main">
              <RequiredInputs
                fields={{ username, firstname, surname, email }}
                change={this.change}
              />
              <BioInput value={bio} change={this.change} />

              <div className="edit_update">
                <AddEmojis
                  position={{ top: 260, left: 73 }}
                  textArea=".edit_ta"
                  updateTextArea={bio => this.setState({ bio })}
                />

                <PrimaryButton
                  label="Update profile"
                  onClick={this.update}
                  extraClass="edit_done"
                />

                <ResendVL />
              </div>
            </div>

            <div className="edit_tags">
              <SocialInputs
                inputs={{
                  instagram,
                  github,
                  twitter,
                  facebook,
                  website,
                  phone,
                }}
                change={this.change}
              />
              <EditTags
                newTag={addTag}
                change={this.change}
                tags={tags}
                emptyTagsInput={() => this.setState({ addTag: '' })}
              />
            </div>
          </div>
        </FadeIn>
      </div>
    )
  }
}

const mapStateToProps = store => ({
  ud: store.User.user_details,
  tags: store.User.tags,
  session: store.User.session,
})

export default connect(mapStateToProps)(EditProfile)
export { EditProfile as PureEditProfile }

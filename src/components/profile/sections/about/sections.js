import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import TimeAgo from 'handy-timeago'
import AboutSection from './section'

const AboutSections = ({ ud }) => {
  let {
    username, firstname, surname, email, bio,
    instagram, github, twitter, facebook, website, phone, joined
  } = ud

  return (
    <Fragment>
      <AboutSection label='Username' value={username} />
      <AboutSection label='Name' value={`${firstname} ${surname}`} />
      <AboutSection label='Email' value={email} />
      <AboutSection label='Bio' value={bio} />

      <AboutSection label='Instagram' value={instagram} isLink />
      <AboutSection label='Github' value={github} isLink />
      <AboutSection label='Twitter' value={twitter} isLink />
      <AboutSection label='Facebook' value={facebook} isLink />
      <AboutSection label='Website' value={website} isLink />
      <AboutSection label='Phone' value={phone} />
      <AboutSection label='Joined' value={`${TimeAgo(joined)}`} />
    </Fragment>
  )
}

const mapStateToProps = state => (
  { ud: state.User.user_details }
)

export default connect(mapStateToProps)(AboutSections)

import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import SocialIconLink from './social-icon-link'

const SocialIcons = ({ ud }) => {
  let { instagram, facebook, github, twitter, website } = ud

  return (
    <Fragment>
      {(instagram || facebook || github || twitter || website) && (
        <div className="social_div inst">
          <SocialIconLink value={instagram} label="instagram" />
          <SocialIconLink value={facebook} label="facebook" />
          <SocialIconLink value={github} label="github" />
          <SocialIconLink value={twitter} label="twitter" />
          <SocialIconLink value={website} label="globe" />
        </div>
      )}
    </Fragment>
  )
}

const mapStateToProps = state => ({
  ud: state.User.user_details,
})

export default connect(mapStateToProps)(SocialIcons)

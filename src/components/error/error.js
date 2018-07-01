import React from 'react'
import { FadeIn } from 'animate-components'
import Title from '../others/title'
import { c_first } from '../../utils/utils'
import { connect } from 'react-redux'
import AppLink from '../others/link/link'

const Error = ({ match, username }) => {
  let { params } = match
  let what = params.what ? params.what : 'page'

  let title = c_first(`${what}`)

  return (
    <div className="error">
      <Title value={`Oops!! ${title} not found`} />

      <FadeIn duration="300ms">
        <div className="error_div">
          <div className="error_info">
            <span>Oops, {what} you're looking for does not exist!!</span>
          </div>

          <img src="/images/error.svg" />

          <div className="error_bottom">
            <AppLink
              to={`/profile/${username}`}
              label="View profile"
              className="sec_btn error_home"
            />
            <AppLink
              to="/"
              label="Try going to homepage"
              className="pri_btn error_login"
            />
          </div>
        </div>
      </FadeIn>
    </div>
  )
}

const mapStateToProps = state => ({
  username: state.User.session.username,
})

export default connect(mapStateToProps)(Error)

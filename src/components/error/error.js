import React from 'react'
import { Link } from 'react-router-dom'
import { FadeIn } from 'animate-components'
import Title from '../others/title'
import { c_first } from '../../utils/utils'
import { connect } from 'react-redux'

const Error = ({ match, username }) => {
  let { params } = match
  let what = params.what ? params.what : 'page'
  let title = c_first(`${what}`)

  return (
    <div className='error' >
      <Title value={`Oops!! ${title} not found`} />
      <FadeIn duration='300ms' >
        <div className='error_div'>
          <div className='error_info'>
            <span>Oops, {what} you're looking for does not exist!!</span>
          </div>
          <img src='/images/error.svg' />
          <div className='error_bottom'>
            <Link
              to={`/profile/${username}`}
              className='sec_btn error_home'
            >View profile</Link>
            <Link
              to='/'
              className='pri_btn error_login'
            >Try going to homepage</Link>
          </div>
        </div>
      </FadeIn>
    </div>
  )
}

Error.defaultProps = {

}

const mapStateToProps = state => (
  { username: state.User.session.username }
)

export default connect(mapStateToProps)(Error)

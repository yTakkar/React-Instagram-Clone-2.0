import React from 'react'
import { connect } from 'react-redux'
import ToTags from '../../hashtag/toTags/toTags'
import AppLink from '../../others/link/link'

const BannerInfo = ({ ud }) => {
  let url = location.pathname
  let { username, firstname, surname, bio } = ud

  return (
    <div className="pro_info">
      <div className="pro_username">
        <AppLink url={url} className="username" label={username} />
      </div>
      <div className="pro_name">
        <span>
          {firstname} {surname}
        </span>
      </div>
      <div className="pro_bio">
        <span>
          <ToTags str={`${bio}`} />
        </span>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  ud: state.User.user_details,
})

export default connect(mapStateToProps)(BannerInfo)

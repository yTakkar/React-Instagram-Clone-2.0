import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ToTags from '../../hashtag/toTags/toTags'

const BannerInfo = ({ ud }) => {
  let url = location.pathname
  let { username, firstname, surname, bio } = ud

  return (
    <div className='pro_info'>
      <div className='pro_username'>
        <Link to={url} className='username'>{username}</Link>
      </div>
      <div className='pro_name'>
        <span>{firstname} {surname}</span>
      </div>
      <div className='pro_bio'>
        <span><ToTags str={`${bio}`} /></span>
      </div>
    </div>
  )
}

const mapStateToProps = state => (
  { ud: state.User.user_details }
)

export default connect(mapStateToProps)(BannerInfo)

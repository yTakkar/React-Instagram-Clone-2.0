import React from 'react'
import { connect } from 'react-redux'

const PostItHeader = ({ postIt, session }) => {
  let { id, username } = session
  let { location, fetchingLocation, fileChanged } = postIt
  let fetchingCondition = fetchingLocation && fileChanged

  return (
    <div className="i_p_top p_top">
      <div className="i_p_info p_info">
        <img src={`/users/${id}/avatar.jpg`} />
        <span>{username}</span>
      </div>
      <span className="loc_text" title={location}>
        {fetchingCondition
          ? 'Fetching location...'
          : location
            ? `${location.substr(0, 20)}..`
            : ''}
      </span>
    </div>
  )
}

const mapStateToProps = state => ({
  session: state.User.session,
  postIt: state.Post.postIt,
})

export default connect(mapStateToProps)(PostItHeader)
